function dataRow(d) {
  const [timestamp, row, ...data] = d
  return {
    timestamp: new Date(timestamp),
    row,
    data,
  }
}

function group(schema, entries) {
  const { index } = schema
  const indexKeys = index && index.split('+')
  const keyIds = schema.columns.reduce((ids, s, i) => {
    if (s.config.key) {
      ids[s.config.key] = i + 2
    }
    return ids
  }, {})

  return entries.reduce((g, d, i) => {
    const indexVal = index ? indexKeys.map(k => d[keyIds[k]]).join('--') : i
    g[indexVal] = g[indexVal] || []
    g[indexVal].push(dataRow(d))
    return g
  }, {})
}

function current(schema, entries, opts = {}) {
  const {
    history = false,
  } = opts

  if (!schema.index) {
    throw new Error('current endpoint not available without index')
  }

  const grouped = group(schema, entries)

  return Object.entries(grouped).reduce((c, [idx, hist]) => {
    const sortedHist = hist.sort((a, b) => a.timestamp - b.timestamp)
    const [lastEntry] = sortedHist.slice(-1)
    const collapsed = sortedHist.reduce((coll, d) => {
      const { row, data } = d
      const latest = coll.rows[row] || []
      const gs = coll.globals || {}
      const c = schema.columns.reduce((p, s, i) => {
        if (s.config.global) {
          gs[s.id] = data[i] || latest[i]
          return p
        }
        return { ...p, [s.id]: data[i] || latest[i] }
      }, {})
      coll.rows[row] = c
      return coll
    }, { globals: {}, rows: {} })
    c[idx] = {
      lastUpdated: lastEntry.timestamp,
      current: collapsed,
    }
    if (history) {
      c[idx].history = sortedHist
    }
    return c
  }, {})
}

function currentRows(schema, entries) {
  const grouped = group(schema, entries)

  const dataset = Object.entries(grouped).map(([idx, hist]) => {
    const [lastEntry] = hist.sort((a, b) => b.timestamp - a.timestamp)
    return lastEntry.data
  }, [])

  const headers = schema.columns.map(col => col.label)
  return [headers, ...dataset]
}

module.exports = {
  current,
  currentRows,
}

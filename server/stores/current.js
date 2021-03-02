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
    const sortedHist = hist.sort((a, b) => a.timestamp - a.timestamp)
    const [lastEntry] = sortedHist.slice(-1)
    c[idx] = {
      lastUpdated: lastEntry.timestamp,
      current: lastEntry,
    }
    if (history) {
      c[idx].history = sortedHist.slice(0, -1)
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

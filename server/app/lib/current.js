function current(schema, entries, opts = {}) {
  const {
    history = false,
  } = opts

  if (!schema.index) {
    throw new Error('data endpoint not available without index')
  }

  const indexKeys = schema.index.split('+')
  const keyIds = schema.columns.reduce((ids, s, i) => {
    if (s.config.key) {
      ids[s.config.key] = i + 2
    }
    return ids
  }, {})

  const grouped = entries.reduce((g, d) => {
    const indexVal = indexKeys.map(k => d[keyIds[k]]).join('--')
    g[indexVal] = g[indexVal] || []
    const [timestamp, row, ...data] = d
    g[indexVal].push({
      timestamp: new Date(timestamp),
      row,
      data,
    })
    return g
  }, {})

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

module.exports = current

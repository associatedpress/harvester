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
      ids[s.config.key] = i + 1
    }
    return ids
  }, {})

  const grouped = entries.reduce((g, d) => {
    const indexVal = indexKeys.map(k => d[keyIds[k]]).join('--')
    g[indexVal] = g[indexVal] || []
    const [timestamp, ...data] = d
    g[indexVal].push({
      timestamp: new Date(timestamp),
      data,
    })
    return g
  }, {})

  return Object.entries(grouped).reduce((c, [idx, hist]) => {
    const sortedHist = hist.sort((a, b) => a.timestamp - b.timestamp)
    const [lastEntry] = sortedHist.slice(-1)
    const collapsed = sortedHist.reduce((coll, d) => {
      const latest = []
      const n = Math.max(coll.length, d.data.length)
      let i = -1
      while (++i < n) {
        latest.push(d.data[i] || coll[i])
      }
      return latest
    }, [])
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

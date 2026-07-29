import Papa from 'papaparse'

const TAG_LABELS = {
  carto: 'cartography',
  dataviz: 'data visualization',
  breaking: 'breaking news',
}

const normalizeTag = (t) => TAG_LABELS[t.toLowerCase()] ?? t

const isSafeUrl = (url) => url.startsWith('https://') || url.startsWith('http://')

export async function fetchProjects(sheetUrl) {
  return new Promise((resolve, reject) => {
    Papa.parse(sheetUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        const all = data.map((row) => ({
          id: row.id?.trim() || '',
          title: row.title?.trim() || '',
          publication: row.publication?.trim() || '',
          link: isSafeUrl(row.link?.trim() || '') ? row.link.trim() : '',
          tags: row.tags
            ? row.tags.split(',').map((t) => normalizeTag(t.trim())).filter(Boolean)
            : [],
          fav: row.fav?.trim().toLowerCase() === 'yes',
        }))
        resolve([
          ...all.filter((p) => p.fav),
          ...all.filter((p) => !p.fav),
        ])
      },
      error: reject,
    })
  })
}

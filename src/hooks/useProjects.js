import { useState, useEffect } from 'react'
import { fetchProjects } from '../utils/parseSheet'
import { CONFIG } from '../config'

export function useProjects() {
  const [mainProjects, setMainProjects] = useState([])
  const [otherProjects, setOtherProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetches = []

    if (CONFIG.sheetUrl && CONFIG.sheetUrl !== 'PASTE_YOUR_PUBLISHED_CSV_URL_HERE') {
      fetches.push(fetchProjects(CONFIG.sheetUrl).then(setMainProjects))
    }
    if (CONFIG.otherSheetUrl && CONFIG.otherSheetUrl !== 'PASTE_YOUR_PUBLISHED_CSV_URL_HERE') {
      fetches.push(fetchProjects(CONFIG.otherSheetUrl).then(setOtherProjects))
    }

    if (fetches.length === 0) {
      setLoading(false)
      return
    }

    Promise.all(fetches)
      .then(() => setLoading(false))
      .catch((err) => { setError(err); setLoading(false) })
  }, [])

  return { mainProjects, otherProjects, loading, error }
}

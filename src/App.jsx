import Header from './components/Header'
import Grid from './components/Grid'
import { useProjects } from './hooks/useProjects'
import styles from './App.module.css'

export default function App() {
  const { mainProjects, otherProjects, loading, error } = useProjects()

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Header />
        {loading && <p className={styles.status}>Loading…</p>}
        {error && <p className={styles.status}>Could not load projects. Check your sheet URL.</p>}
        {!loading && (
          <Grid
            selected={mainProjects}
            other={otherProjects}
          />
        )}
      </div>
    </div>
  )
}

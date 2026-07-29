import { useState } from 'react'
import styles from './ProjectCard.module.css'

function ProjectImage({ id, title, className }) {
  const [src, setSrc] = useState(id ? `/images/${id}.gif` : null)
  const [failed, setFailed] = useState(false)

  const handleError = () => {
    if (src && src.endsWith('.gif')) {
      setSrc(`/images/${id}.png`)
    } else {
      setFailed(true)
    }
  }

  if (!id || failed) return null
  return <img src={src} alt={title} className={className} onError={handleError} />
}

export default function ProjectCard({ project, compact = false }) {
  const { id, title, publication, link, tags } = project

  const inner = compact ? (
    <div className={styles.imageWrapCompact}>
      {id
        ? <ProjectImage id={id} title={title} className={styles.image} />
        : <div className={styles.placeholder} />}
    </div>
  ) : (
    <>
      <div className={styles.imageWrap}>
        {id
          ? <ProjectImage id={id} title={title} className={styles.image} />
          : <div className={styles.placeholder} />}
      </div>
      <div className={styles.body}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.publication}>{publication}</p>
        {tags.length > 0 && (
          <ul className={styles.tags}>
            {tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  )

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className={compact ? styles.cardCompact : styles.card}>
      {inner}
    </a>
  ) : (
    <div className={compact ? styles.cardCompact : styles.card}>{inner}</div>
  )
}

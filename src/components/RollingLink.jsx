import { useState } from 'react'
import styles from './Header.module.css'

export default function RollingLink({ href }) {
  const [hovered, setHovered] = useState(false)

  return (
    <span className={styles.emailWrap}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.rollingLink}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        LinkedIn
      </a>
      <span className={`${styles.copyTooltip} ${hovered ? styles.copyTooltipVisible : ''}`}>
        my professional lore
      </span>
    </span>
  )
}

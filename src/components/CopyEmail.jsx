import { useState, useRef } from 'react'
import styles from './Header.module.css'

export default function CopyEmail({ email }) {
  const [visible, setVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const timerRef = useRef(null)

  const handleClick = () => {
    navigator.clipboard.writeText(email.replace('@', ' [at] ')).then(() => {
      setCopied(true)
      setVisible(true)
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        setVisible(false)
        setTimeout(() => setCopied(false), 400)
      }, 1000)
    }).catch(() => {})
  }

  return (
    <span className={styles.emailWrap}>
      <button
        onClick={handleClick}
        className={styles.copyEmail}
        onMouseEnter={() => { if (!copied) setVisible(true) }}
        onMouseLeave={() => { if (!copied) setVisible(false) }}
      >
        email
      </button>
      <span className={`${styles.copyTooltip} ${visible ? styles.copyTooltipVisible : ''}`}>
        {copied ? 'copied!' : 'click to copy'}
      </span>
    </span>
  )
}

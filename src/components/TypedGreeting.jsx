import { useState, useEffect } from 'react'
import styles from './TypedGreeting.module.css'

const TYPE_SPEED = 60   // ms per character typed
const DELETE_SPEED = 35 // ms per character deleted
const HOLD = 3000       // ms to hold before deleting
const PAUSE = 400       // ms pause after fully deleted before next word

export default function TypedGreeting({ greetings }) {
  const [displayed, setDisplayed] = useState('')
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState('typing') // 'typing' | 'deleting' | 'done'

  const isLast = index === greetings.length - 1

  useEffect(() => {
    if (phase === 'done') return

    const target = greetings[index]

    if (phase === 'typing') {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), TYPE_SPEED)
        return () => clearTimeout(t)
      } else {
        if (isLast) {
          // final phrase fully typed — terminate
          setPhase('done')
          return
        }
        const t = setTimeout(() => setPhase('deleting'), HOLD)
        return () => clearTimeout(t)
      }
    }

    if (phase === 'deleting') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), DELETE_SPEED)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => {
          setIndex((i) => i + 1)
          setPhase('typing')
        }, PAUSE)
        return () => clearTimeout(t)
      }
    }
  }, [displayed, phase, index, isLast, greetings])

  return (
    <p className={styles.greeting}>
      {displayed}
      <span className={`${styles.cursor} ${phase === 'done' ? styles.cursorFade : ''}`} />
    </p>
  )
}

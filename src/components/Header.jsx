import { CONFIG } from '../config'
import styles from './Header.module.css'
import TypedGreeting from './TypedGreeting'
import RollingLink from './RollingLink'
import CopyEmail from './CopyEmail'

function linkify(text) {
  const tokens = []

  // Split on __linkedin__, __email__, and bioLinks keys
  const bioLinkKeys = CONFIG.bioLinks ? Object.keys(CONFIG.bioLinks) : []
  const pattern = new RegExp(
    `(${['__linkedin__', '__email__', ...bioLinkKeys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))].join('|')})`,
    'g'
  )

  text.split(pattern).forEach((part, i) => {
    if (part === '__linkedin__' && CONFIG.linkedin) {
      tokens.push(<RollingLink key={i} href={CONFIG.linkedin.href} labels={CONFIG.linkedin.labels} />)
    } else if (part === '__email__' && CONFIG.email) {
      tokens.push(<CopyEmail key={i} email={CONFIG.email} />)
    } else if (CONFIG.bioLinks?.[part]) {
      tokens.push(<a key={i} href={CONFIG.bioLinks[part]} target="_blank" rel="noopener noreferrer">{part}</a>)
    } else {
      tokens.push(part)
    }
  })

  return tokens
}

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.name}>
        {(() => {
          const split = CONFIG.name.indexOf(' .')
          if (split === -1) return CONFIG.name
          return <>
            {CONFIG.name.slice(0, split)}
            <span className={styles.nameSuffix}>{CONFIG.name.slice(split)}</span>
          </>
        })()}
      </h1>
      <div className={styles.bio}>
        {CONFIG.greetings && <TypedGreeting greetings={CONFIG.greetings} />}
        {CONFIG.bio.map((para, i) => (
          <p key={i}>{linkify(para)}</p>
        ))}
      </div>

    </header>
  )
}

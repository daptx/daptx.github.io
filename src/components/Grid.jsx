import { useState } from 'react'
import ProjectCard from './ProjectCard'
import styles from './Grid.module.css'

function getTagOrder(projects) {
  const seen = new Set()
  const order = []
  for (const project of projects) {
    for (const tag of project.tags) {
      if (!seen.has(tag)) { seen.add(tag); order.push(tag) }
    }
  }
  return order
}

function groupByTag(projects) {
  const order = getTagOrder(projects)
  const map = {}
  for (const tag of order) map[tag] = []
  for (const project of projects) {
    for (const tag of project.tags) {
      if (map[tag]) map[tag].push(project)
    }
  }
  return order.map((tag) => ({ tag, projects: map[tag] }))
}

export default function Grid({ selected = [], other = [] }) {
  const [active, setActive] = useState('selected')
  const [activeTag, setActiveTag] = useState('data visualization')

  const tabs = [
    { key: 'selected', label: 'Selected work' },
    { key: 'other', label: 'Other work' },
  ]

  const tagGroups = groupByTag(other)
  const allTags = tagGroups.map((g) => g.tag)

  const visibleGroups = activeTag
    ? tagGroups.filter((g) => g.tag === activeTag)
    : tagGroups

  return (
    <div>
      <nav className={styles.nav}>
        {tabs.filter((tab) => tab.key !== 'other').map((tab) => (
          <button
            key={tab.key}
            className={`${styles.navItem} ${active === tab.key ? styles.navItemActive : ''}`}
            onClick={() => setActive(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {active === 'other' && allTags.length > 0 && (
        <div className={styles.tagFilter}>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`${styles.tagBtn} ${activeTag === tag ? styles.tagBtnActive : ''}`}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {active === 'other' ? (
        visibleGroups.map(({ tag, projects }) => (
          <div key={tag} className={styles.pubSection}>
            <div className={styles.gridCompact}>
              {projects.map((project) => (
                <ProjectCard key={project.id || project.title} project={project} compact />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className={styles.grid}>
          {selected.map((project) => (
            <ProjectCard key={project.id || project.title} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}

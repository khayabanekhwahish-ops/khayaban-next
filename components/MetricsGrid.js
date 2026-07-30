import Icon from './Icon'

const ICONS = ['users', 'heart', 'home', 'chart', 'target', 'shield']

export default function MetricsGrid({ metrics, compact = false }) {
  if (!metrics?.length) return null
  return (
    <div className="metrics-grid">
      {metrics.map((m, i) => (
        <div className={`metric-card${compact ? ' compact' : ''}`} key={m.label}>
          <span className="metric-icon"><Icon name={ICONS[i] || 'chart'} size={24} /></span>
          <strong>{m.value}</strong>
          <span>{m.label}</span>
        </div>
      ))}
    </div>
  )
}

import { Link } from 'react-router-dom'

export default function NotFound({ message = 'ページが見つかりません' }) {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <p style={{ color: '#e2e8f0', marginBottom: 16 }}>{message}</p>
      <Link
        to="/"
        style={{
          background: '#334155',
          color: '#94a3b8',
          border: '1px solid #475569',
          borderRadius: 8,
          padding: '6px 16px',
          fontSize: '0.85rem',
          textDecoration: 'none',
        }}
      >
        ← ホームへ
      </Link>
    </div>
  )
}

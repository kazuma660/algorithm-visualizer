import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { algorithms, setProgress } from '../engine/registry'
import FillInBlank from '../components/FillInBlank'
import NotFound from '../components/NotFound'
import styles from './PracticePage.module.css'

export default function PracticePage() {
  const { algorithmId } = useParams()
  const [completed, setCompleted] = useState(false)

  const algo = algorithms[algorithmId]

  if (!algo) return <NotFound message={`アルゴリズムが見つかりません: ${algorithmId}`} />

  const { info } = algo

  const handleComplete = () => {
    setProgress(algorithmId, 'practice')
    setCompleted(true)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link to="/" className={styles.backBtn}>← ホームへ</Link>
        <h1 className={styles.pageTitle}>{info.name} — 穴埋め練習</h1>
      </div>

      <div className={styles.content}>
        <FillInBlank
          fillInBlanks={info.fillInBlanks}
          onComplete={handleComplete}
        />
      </div>

      {completed && (
        <div className={styles.completedBanner}>
          <div className={styles.completedTitle}>🎉 練習完了！</div>
          <p style={{ color: '#94a3b8', marginBottom: 8 }}>
            次は挑戦モードに挑戦してみよう！
          </p>
          <Link to={`/challenge/${algorithmId}`} className={styles.challengeLink}>
            🏆 挑戦モードへ
          </Link>
        </div>
      )}
    </div>
  )
}

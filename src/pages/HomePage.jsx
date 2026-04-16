import { Link, useNavigate } from 'react-router-dom'
import { algorithms, learningPath, getProgress, isUnlocked } from '../engine/registry'
import styles from './HomePage.module.css'

const CATEGORY_LABEL = { sorting: 'ソート', searching: '探索' }

const STAGES = [
  { key: 'learn',     label: '📚 学習' },
  { key: 'practice',  label: '✏️ 練習' },
  { key: 'challenge', label: '🏆 挑戦' },
]

export default function HomePage() {
  const progress  = getProgress()
  const navigate  = useNavigate()

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>学習パス</h1>
        <p className={styles.headerSubtitle}>
          ビジュアルで理解するアルゴリズム入門 — 好きなところから始めよう
        </p>
      </div>

      <div className={styles.pathContainer}>
        {learningPath.map((algoId) => {
          const algo = algorithms[algoId]
          if (!algo) return null
          const { info }    = algo
          const unlocked    = isUnlocked(algoId)
          const algoProgress = progress[algoId] || {}

          return (
            <div
              key={algoId}
              className={`${styles.card} ${!unlocked ? styles.locked : ''}`}
              onClick={() => unlocked && navigate(`/learn/${algoId}`)}
            >
              {/* ヘッダー行 */}
              <div className={styles.cardHeader}>
                <span className={styles.cardName}>
                  {info.name}
                  {!unlocked && <span className={styles.lockIcon}>🔒</span>}
                </span>
                <span className={styles.categoryBadge}>
                  {CATEGORY_LABEL[info.category] ?? info.category}
                </span>
              </div>

              {/* 説明・計算量 */}
              <div className={styles.cardInfo}>
                <p className={styles.cardDescription}>{info.description}</p>
                <div className={styles.complexityRow}>
                  <span className={styles.complexityItem}>
                    最悪: <span className={styles.complexityValue}>{info.timeComplexity.worst}</span>
                  </span>
                  <span className={styles.complexityItem}>
                    平均: <span className={styles.complexityValue}>{info.timeComplexity.average}</span>
                  </span>
                  <span className={styles.complexityItem}>
                    空間: <span className={styles.complexityValue}>{info.spaceComplexity}</span>
                  </span>
                </div>
              </div>

              {/* 進捗 */}
              <div className={styles.progressDots}>
                {STAGES.map((s) => (
                  <span
                    key={s.key}
                    className={`${styles.progressPill} ${algoProgress[s.key] ? styles.done : ''}`}
                  >
                    {s.label}
                  </span>
                ))}
              </div>

              {/* ボタン */}
              <div className={styles.cardActions} onClick={e => e.stopPropagation()}>
                <Link to={`/learn/${algoId}`}      className={`${styles.actionBtn} ${styles.btnLearn}`}>
                  📚 学ぶ{algoProgress.learn     && ' ✓'}
                </Link>
                <Link to={`/practice/${algoId}`}   className={`${styles.actionBtn} ${styles.btnPractice}`}>
                  ✏️ 練習{algoProgress.practice  && ' ✓'}
                </Link>
                <Link to={`/challenge/${algoId}`}  className={`${styles.actionBtn} ${styles.btnChallenge}`}>
                  🏆 挑戦{algoProgress.challenge && ' ✓'}
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { algorithms, setProgress } from '../engine/registry'
import { quizzes } from '../data/quizzes'
import NotFound from '../components/NotFound'
import styles from './ChallengePage.module.css'

export default function ChallengePage() {
  const { algorithmId } = useParams()
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const algo = algorithms[algorithmId]
  const qs = quizzes[algorithmId] || []

  if (!algo) return <NotFound message={`アルゴリズムが見つかりません: ${algorithmId}`} />
  if (qs.length === 0) return <NotFound message="クイズが見つかりません" />

  const { info } = algo

  const question = qs[questionIndex]
  const answered = selectedIndex !== null
  const progressPercent = (questionIndex / qs.length) * 100

  const handleSelect = (idx) => {
    if (answered) return
    setSelectedIndex(idx)
    if (idx === question.correctIndex) {
      setScore((s) => s + 1)
    }
  }

  const handleNext = () => {
    if (questionIndex < qs.length - 1) {
      setQuestionIndex((i) => i + 1)
      setSelectedIndex(null)
    } else {
      setProgress(algorithmId, 'challenge')
      setFinished(true)
    }
  }

  const getScoreEmoji = () => {
    const pct = score / qs.length
    if (pct === 1) return '🏆'
    if (pct >= 0.75) return '🎉'
    if (pct >= 0.5) return '👍'
    return '📚'
  }

  if (finished) {
    return (
      <div className={styles.page}>
        <div className={styles.scoreScreen}>
          <div className={styles.scoreEmoji}>{getScoreEmoji()}</div>
          <div className={styles.scoreTitle}>チャレンジ完了！</div>
          <div className={styles.scoreValue}>
            {score} / {qs.length}
          </div>
          <div className={styles.scoreSub}>
            {score === qs.length
              ? '満点！完璧です！'
              : score >= qs.length * 0.75
              ? 'よくできました！'
              : score >= qs.length * 0.5
              ? 'もう少し復習しましょう'
              : '学習モードで復習してみよう'}
          </div>
          <Link to="/" className={styles.homeLink}>
            ← ホームへ戻る
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link to="/" className={styles.backBtn}>← ホームへ</Link>
        <h1 className={styles.pageTitle}>{info.name} — チャレンジ</h1>
      </div>

      <div className={styles.quizContainer}>
        <div className={styles.progressInfo}>
          {questionIndex + 1} / {qs.length}
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className={styles.questionText}>{question.question}</div>

        <div className={styles.options}>
          {question.options.map((opt, idx) => {
            let cls = styles.optionBtn
            let icon = null

            if (answered) {
              cls += ` ${styles.answered}`
              if (idx === question.correctIndex) {
                cls += ` ${styles.correct}`
                icon = '✓'
              } else if (idx === selectedIndex) {
                cls += ` ${styles.wrong}`
                icon = '✗'
              }
            }

            return (
              <button key={idx} className={cls} onClick={() => handleSelect(idx)}>
                {icon && <span className={styles.optionIcon}>{icon}</span>}
                {opt}
              </button>
            )
          })}
        </div>

        {answered && (
          <>
            <div className={styles.explanation}>{question.explanation}</div>
            <button className={styles.nextBtn} onClick={handleNext}>
              {questionIndex < qs.length - 1 ? '次の問題 →' : '結果を見る →'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

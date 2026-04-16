import { useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { algorithms, setProgress } from '../engine/registry'
import ArrayVisualizer from '../components/ArrayVisualizer'
import PlaybackControls from '../components/PlaybackControls'
import PythonPanel from '../components/PythonPanel'
import NotFound from '../components/NotFound'
import styles from './LearnPage.module.css'

const DEFAULT_SORT_INPUT = [5, 3, 8, 1, 9, 2, 7, 4]
const DEFAULT_BINARY_INPUT = [1, 2, 3, 4, 5, 6, 7, 8]
const DEFAULT_TARGET = 7

export default function LearnPage() {
  const { algorithmId } = useParams()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [completed, setCompleted] = useState(false)

  const algo = algorithms[algorithmId]
  const isSearching    = algo?.info.category === 'searching'
  const requiresSorted = algo?.info.requiresSorted ?? false

  const defaultInput = requiresSorted ? DEFAULT_BINARY_INPUT : DEFAULT_SORT_INPUT

  const [inputText, setInputText]     = useState(defaultInput.join(', '))
  const [targetText, setTargetText]   = useState(String(DEFAULT_TARGET))
  const [inputError, setInputError]   = useState('')
  const [appliedInput, setAppliedInput]   = useState(defaultInput)
  const [appliedTarget, setAppliedTarget] = useState(DEFAULT_TARGET)

  const handleApply = () => {
    const nums = inputText.split(',').map(s => parseInt(s.trim(), 10))
    if (nums.some(isNaN) || nums.length < 2) {
      setInputError('カンマ区切りで2つ以上の整数を入力してください')
      return
    }
    if (requiresSorted) {
      const sorted = [...nums].sort((a, b) => a - b)
      if (JSON.stringify(nums) !== JSON.stringify(sorted)) {
        setInputError('このアルゴリズムは昇順の配列が必要です')
        return
      }
    }
    const target = parseInt(targetText, 10)
    if (isSearching && isNaN(target)) {
      setInputError('探索値を入力してください')
      return
    }
    setInputError('')
    setAppliedInput(nums)
    setAppliedTarget(target)
    setCurrentStep(0)
  }

  const steps = useMemo(() => {
    if (!algo) return []
    if (isSearching) return algo.generateSteps(appliedInput, appliedTarget)
    return algo.generateSteps(appliedInput)
  }, [algo, isSearching, appliedInput, appliedTarget])

  if (!algo) return <NotFound message={`アルゴリズムが見つかりません: ${algorithmId}`} />

  const { info } = algo
  const currentAction = steps[currentStep]?.action
  const highlightLine = info.actionToLine[currentAction] ?? null

  const handleComplete = () => {
    setProgress(algorithmId, 'learn')
    setCompleted(true)
    setTimeout(() => navigate('/'), 1200)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link to="/" className={styles.backBtn}>← ホームへ</Link>
        <h1 className={styles.pageTitle}>{info.name} — 学習モード</h1>
      </div>

      <div className={styles.algoInfo}>
        <div className={styles.algoDescription}>{info.description}</div>
        <div className={styles.complexityRow}>
          <span className={styles.complexityBadge}>最良: {info.timeComplexity.best}</span>
          <span className={styles.complexityBadge}>平均: {info.timeComplexity.average}</span>
          <span className={styles.complexityBadge}>最悪: {info.timeComplexity.worst}</span>
          <span className={styles.complexityBadge}>空間: {info.spaceComplexity}</span>
        </div>
      </div>

      <div className={styles.inputSection}>
        <div className={styles.inputRow}>
          <label className={styles.inputLabel}>配列（カンマ区切り）</label>
          <input
            className={styles.inputField}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="例: 5, 3, 8, 1, 9"
          />
          {isSearching && (
            <>
              <label className={styles.inputLabel}>探索値</label>
              <input
                className={styles.inputField}
                style={{ width: 80 }}
                value={targetText}
                onChange={e => setTargetText(e.target.value)}
                placeholder="7"
              />
            </>
          )}
          <button className={styles.applyBtn} onClick={handleApply}>適用</button>
        </div>
        {inputError && <p className={styles.inputError}>{inputError}</p>}
        {requiresSorted && <p className={styles.inputHint}>※ このアルゴリズムは昇順の配列のみ使用できます</p>}
      </div>

      <div className={styles.layout}>
        <div className={styles.leftColumn}>
          <ArrayVisualizer steps={steps} currentStep={currentStep} />
          <PlaybackControls
            steps={steps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />
        </div>

        <div className={styles.rightColumn}>
          <PythonPanel
            pythonCode={info.pythonCode}
            highlightLine={highlightLine}
          />
        </div>
      </div>

      <div className={styles.completeSection}>
        {completed ? (
          <p className={styles.completeDone}>✓ 学習完了！ホームに戻ります...</p>
        ) : (
          <button className={styles.completeBtn} onClick={handleComplete}>
            学習完了 →
          </button>
        )}
      </div>
    </div>
  )
}

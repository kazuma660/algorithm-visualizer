import { useState, useEffect, useRef } from 'react'
import styles from './PlaybackControls.module.css'

export default function PlaybackControls({ steps, currentStep, onStepChange }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(500) // ms per step
  const intervalRef = useRef(null)
  const total = steps ? steps.length : 0

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        onStepChange((prev) => {
          if (prev >= total - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, speed)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isPlaying, speed, total, onStepChange])

  // Pause when we reach the end (guard total > 0 to avoid firing on empty steps)
  useEffect(() => {
    if (total > 0 && currentStep >= total - 1) {
      setIsPlaying(false)
    }
  }, [currentStep, total])

  const handlePlayPause = () => {
    if (currentStep >= total - 1) {
      onStepChange(0)
      setIsPlaying(true)
    } else {
      setIsPlaying((p) => !p)
    }
  }

  const handlePrev = () => {
    setIsPlaying(false)
    onStepChange((p) => Math.max(0, p - 1))
  }

  const handleNext = () => {
    setIsPlaying(false)
    onStepChange((p) => Math.min(total - 1, p + 1))
  }

  const handleStart = () => {
    setIsPlaying(false)
    onStepChange(0)
  }

  const handleEnd = () => {
    setIsPlaying(false)
    onStepChange(total - 1)
  }

  const progressPercent = total > 1 ? (currentStep / (total - 1)) * 100 : 0

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <button
          className={styles.btn}
          onClick={handleStart}
          disabled={currentStep === 0}
          title="最初へ"
        >
          ⏮
        </button>
        <button
          className={styles.btn}
          onClick={handlePrev}
          disabled={currentStep === 0}
          title="前へ"
        >
          ◀
        </button>
        <button
          className={`${styles.btn} ${styles.btnPlay}`}
          onClick={handlePlayPause}
          title={isPlaying ? '一時停止' : '再生'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button
          className={styles.btn}
          onClick={handleNext}
          disabled={currentStep >= total - 1}
          title="次へ"
        >
          ▶
        </button>
        <button
          className={styles.btn}
          onClick={handleEnd}
          disabled={currentStep >= total - 1}
          title="最後へ"
        >
          ⏭
        </button>
      </div>

      <div className={styles.progressSection}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className={styles.progressText}>
          ステップ {currentStep + 1} / {total}
        </div>
      </div>

      <div className={styles.speedSection}>
        <span className={styles.speedLabel}>速度:</span>
        <input
          className={styles.speedSlider}
          type="range"
          min={100}
          max={1500}
          step={100}
          value={1600 - speed}
          onChange={(e) => setSpeed(1600 - Number(e.target.value))}
        />
        <span className={styles.speedLabel}>
          {speed <= 200 ? '速い' : speed <= 700 ? '普通' : '遅い'}
        </span>
      </div>
    </div>
  )
}

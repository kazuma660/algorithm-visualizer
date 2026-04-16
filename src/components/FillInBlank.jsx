import { useRef, useState, useMemo } from 'react'
import styles from './FillInBlank.module.css'

const CIRCLE_NUMBERS = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨']

function parseTemplateLine(line) {
  const segments = []
  const regex = /__([①②③④⑤⑥⑦⑧⑨])__/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', value: line.slice(lastIndex, match.index) })
    }
    segments.push({ type: 'blank', marker: match[1] })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < line.length) {
    segments.push({ type: 'text', value: line.slice(lastIndex) })
  }

  return segments
}

export default function FillInBlank({ fillInBlanks, onComplete }) {
  const { template, blanks } = fillInBlanks
  const inputRefs = useRef({})
  const [checked, setChecked] = useState(false)
  const [results, setResults] = useState({})

  // テンプレートは静的なのでメモ化して毎レンダーの再パースを防ぐ
  const parsedLines = useMemo(() => template.map(parseTemplateLine), [template])

  // blanks検索をO(1)にする
  const blanksById = useMemo(
    () => Object.fromEntries(blanks.map((b) => [b.id, b])),
    [blanks]
  )

  // allCorrectは結果から派生させる（独立stateは不要）
  const correctCount = Object.values(results).filter(Boolean).length
  const allCorrect = checked && correctCount === blanks.length

  const handleCheck = () => {
    const newResults = {}
    blanks.forEach((blank) => {
      const inputEl = inputRefs.current[blank.id]
      const userVal = inputEl ? inputEl.value.trim() : ''
      newResults[blank.id] = userVal === blank.answer.trim()
    })
    setResults(newResults)
    setChecked(true)

    if (Object.values(newResults).every(Boolean)) {
      if (onComplete) onComplete()
    }
  }

  const wrongBlanks = blanks.filter((b) => results[b.id] === false)

  if (allCorrect) {
    return (
      <div className={styles.container}>
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>🎉</div>
          <div className={styles.successText}>全問正解！すばらしい！</div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>穴埋め練習</div>
      <div className={styles.subtitle}>空欄を埋めてコードを完成させましょう</div>

      <div className={styles.codeBlock}>
        {parsedLines.map((segments, lineIndex) => (
          <div key={lineIndex} className={styles.codeLine}>
            <span className={styles.lineNum}>{lineIndex + 1}</span>
            <span className={styles.lineText}>
              {segments.map((seg, segIndex) => {
                if (seg.type === 'text') {
                  return <span key={segIndex}>{seg.value}</span>
                }

                const blankId = CIRCLE_NUMBERS.indexOf(seg.marker) + 1
                const blank = blanksById[blankId]
                const answerLen = blank ? blank.answer.length : 6
                const inputClass =
                  checked && results[blankId] !== undefined
                    ? results[blankId] ? styles.correct : styles.wrong
                    : ''

                return (
                  <input
                    key={segIndex}
                    ref={(el) => { if (el) inputRefs.current[blankId] = el }}
                    className={`${styles.blankInput} ${inputClass}`}
                    style={{ width: `${Math.max(answerLen * 10 + 16, 80)}px` }}
                    placeholder={seg.marker}
                    spellCheck={false}
                    autoComplete="off"
                    onKeyDown={(e) => { if (e.key === 'Enter') handleCheck() }}
                  />
                )
              })}
            </span>
          </div>
        ))}
      </div>

      <button className={styles.checkButton} onClick={handleCheck}>
        答え合わせ
      </button>

      {checked && !allCorrect && (
        <div className={`${styles.result} ${correctCount === blanks.length ? styles.resultPass : styles.resultFail}`}>
          <strong>{correctCount} / {blanks.length} 正解</strong>
          {wrongBlanks.length > 0 && (
            <ul className={styles.hintList}>
              {wrongBlanks.map((blank) => (
                <li key={blank.id} className={styles.hintItem}>
                  <span className={styles.hintBadge}>{CIRCLE_NUMBERS[blank.id - 1]}</span>
                  <span className={styles.hintText}>{blank.hint}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

import styles from './PythonPanel.module.css'

export default function PythonPanel({ pythonCode, highlightLine }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Python コード</div>
      <div className={styles.codeBlock}>
        {pythonCode.map((line, i) => (
          <div
            key={i}
            className={`${styles.lineWrapper} ${i === highlightLine ? styles.highlighted : ''}`}
          >
            <span className={styles.lineNum}>{i + 1}</span>
            <span className={styles.lineContent}>{line}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

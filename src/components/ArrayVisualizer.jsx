import styles from './ArrayVisualizer.module.css'

const SVG_HEIGHT = 200
const BAR_GAP = 4
const LABEL_AREA_BOTTOM = 20
const TOP_PADDING = 24

function getBarClass(index, step) {
  if (!step) return styles.barDefault

  const { action, indices = [], sorted = [], checked = [], foundIndex } = step

  if (sorted.includes(index)) return styles.barSorted

  if (action === 'FOUND' && index === foundIndex) return styles.barFound
  if (action === 'DONE' && index === foundIndex) return styles.barFound

  if (action === 'COMPARE' || action === 'CHECK') {
    if (indices.includes(index)) return styles.barComparing
    if (checked && checked.includes(index)) return styles.barChecked
  }

  if (action === 'SWAP' && indices.includes(index)) return styles.barSwap

  if (action === 'SHIFT' && indices.includes(index)) return styles.barShift
  if (action === 'PICK' && indices.includes(index)) return styles.barKey
  if (action === 'INSERT' && indices.includes(index)) return styles.barKey

  if (action === 'SET_MIN' && indices.includes(index)) return styles.barComparing
  if (action === 'NEW_MIN' && indices.includes(index)) return styles.barComparing
  if (action === 'OUTER' && indices.includes(index)) return styles.barKey

  if (['MID', 'GO_RIGHT', 'GO_LEFT'].includes(action) && step.mid === index) return styles.barMid
  if (action === 'LOOP') {
    if (step.left === index || step.right === index) return styles.barLeft
  }

  if (checked && checked.includes(index)) return styles.barChecked

  return styles.barDefault
}

export default function ArrayVisualizer({ steps, currentStep }) {
  const step = steps && steps[currentStep]
  const array = step ? step.array : []
  const n = array.length

  if (n === 0) return null

  const maxVal = Math.max(...array, 1)
  const drawHeight = SVG_HEIGHT - LABEL_AREA_BOTTOM - TOP_PADDING

  return (
    <div className={styles.container}>
      <svg
        className={styles.svgWrapper}
        viewBox={`0 0 ${n * (40 + BAR_GAP) - BAR_GAP} ${SVG_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        aria-label="array visualization"
      >
        {array.map((val, i) => {
          const barWidth = 40
          const x = i * (barWidth + BAR_GAP)
          const barH = Math.max(4, (val / maxVal) * drawHeight)
          const y = TOP_PADDING + drawHeight - barH

          return (
            <g key={i}>
              <rect
                className={`${styles.bar} ${getBarClass(i, step)}`}
                x={x}
                y={y}
                width={barWidth}
                height={barH}
                rx={3}
              />
              <text
                className={styles.valueLabel}
                x={x + barWidth / 2}
                y={y - 4}
              >
                {val}
              </text>
              <text
                className={styles.indexLabel}
                x={x + barWidth / 2}
                y={SVG_HEIGHT - 4}
              >
                {i}
              </text>
            </g>
          )
        })}

        {/* Binary search range indicators */}
        {step && step.left !== undefined && step.right !== undefined && (
          <>
            <text
              className={styles.indexLabel}
              x={step.left * (40 + BAR_GAP) + 20}
              y={14}
              style={{ fill: '#38bdf8', fontSize: 11 }}
            >
              L
            </text>
            <text
              className={styles.indexLabel}
              x={step.right * (40 + BAR_GAP) + 20}
              y={14}
              style={{ fill: '#f472b6', fontSize: 11 }}
            >
              R
            </text>
            {step.mid !== null && step.mid !== undefined && (
              <text
                className={styles.indexLabel}
                x={step.mid * (40 + BAR_GAP) + 20}
                y={14}
                style={{ fill: '#facc15', fontSize: 11 }}
              >
                M
              </text>
            )}
          </>
        )}
      </svg>

      <div className={styles.message}>
        {step ? step.message : ''}
      </div>
    </div>
  )
}

import { bubbleSortInfo, generateBubbleSortSteps } from './sorting/bubbleSort'
import { selectionSortInfo, generateSelectionSortSteps } from './sorting/selectionSort'
import { insertionSortInfo, generateInsertionSortSteps } from './sorting/insertionSort'
import { linearSearchInfo, generateLinearSearchSteps } from './searching/linearSearch'
import { binarySearchInfo, generateBinarySearchSteps } from './searching/binarySearch'

export const algorithms = {
  bubbleSort: { info: bubbleSortInfo, generateSteps: generateBubbleSortSteps },
  selectionSort: { info: selectionSortInfo, generateSteps: generateSelectionSortSteps },
  insertionSort: { info: insertionSortInfo, generateSteps: generateInsertionSortSteps },
  linearSearch: { info: linearSearchInfo, generateSteps: generateLinearSearchSteps },
  binarySearch: { info: binarySearchInfo, generateSteps: generateBinarySearchSteps },
}

export const learningPath = [
  'linearSearch',
  'binarySearch',
  'bubbleSort',
  'selectionSort',
  'insertionSort',
]

export function getProgress() {
  const raw = localStorage.getItem('algoviz-progress')
  return raw ? JSON.parse(raw) : {}
}

export function setProgress(algorithmId, stage) {
  const progress = getProgress()
  if (!progress[algorithmId]) progress[algorithmId] = {}
  progress[algorithmId][stage] = true
  localStorage.setItem('algoviz-progress', JSON.stringify(progress))
}

export function isUnlocked(algorithmId) {
  return !!algorithms[algorithmId]
}

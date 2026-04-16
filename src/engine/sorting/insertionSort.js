export const insertionSortInfo = {
  id: 'insertionSort',
  name: '挿入ソート',
  category: 'sorting',
  description: '要素を一つずつ取り出し、正しい位置に挿入する。',
  timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
  spaceComplexity: 'O(1)',
  prerequisites: ['selectionSort'],
  pythonCode: [
    'def insertion_sort(arr):',
    '    for i in range(1, len(arr)):',
    '        key = arr[i]',
    '        j = i - 1',
    '        while j >= 0 and arr[j] > key:',
    '            arr[j + 1] = arr[j]',
    '            j -= 1',
    '        arr[j + 1] = key',
    '    return arr',
  ],
  actionToLine: {
    INIT: 0,
    PICK: 2,
    COMPARE: 4,
    SHIFT: 5,
    INSERT: 7,
    DONE: 8,
  },
  fillInBlanks: {
    template: [
      'def insertion_sort(arr):',
      '    for i in range(__①__, len(arr)):',
      '        key = arr[i]',
      '        j = __②__',
      '        while j >= 0 and arr[j] __③__ key:',
      '            arr[j + 1] = arr[j]',
      '            j __④__= 1',
      '        arr[j + 1] = key',
      '    return arr',
    ],
    blanks: [
      { id: 1, answer: '1', hint: '2番目の要素から始める' },
      { id: 2, answer: 'i - 1', hint: 'keyの一つ左から比較開始' },
      { id: 3, answer: '>', hint: '条件: 左の要素がkeyより大きければシフト' },
      { id: 4, answer: '-', hint: 'jを左に進める' },
    ],
  },
}

export function generateInsertionSortSteps(input) {
  const arr = [...input]
  const n = arr.length
  const steps = []

  steps.push({
    action: 'INIT',
    indices: [],
    array: [...arr],
    message: `配列を初期化しました。長さ: ${n}`,
  })

  for (let i = 1; i < n; i++) {
    const key = arr[i]
    steps.push({
      action: 'PICK',
      indices: [i],
      array: [...arr],
      message: `key = arr[${i}] = ${key} を取り出す`,
    })

    let j = i - 1
    while (j >= 0 && arr[j] > key) {
      steps.push({
        action: 'COMPARE',
        indices: [j, j + 1],
        array: [...arr],
        message: `arr[${j}]=${arr[j]} > key=${key}? はい、シフトします`,
      })

      arr[j + 1] = arr[j]
      steps.push({
        action: 'SHIFT',
        indices: [j, j + 1],
        array: [...arr],
        message: `arr[${j}]=${arr[j]} を右にシフト`,
      })

      j--
    }

    if (j >= 0) {
      steps.push({
        action: 'COMPARE',
        indices: [j, j + 1],
        array: [...arr],
        message: `arr[${j}]=${arr[j]} > key=${key}? いいえ、ここに挿入`,
      })
    }

    arr[j + 1] = key
    steps.push({
      action: 'INSERT',
      indices: [j + 1],
      array: [...arr],
      message: `arr[${j + 1}] = ${key} に挿入`,
    })
  }

  steps.push({
    action: 'DONE',
    indices: [],
    array: [...arr],
    sorted: Array.from({ length: n }, (_, k) => k),
    message: 'ソート完了！',
  })

  return steps
}

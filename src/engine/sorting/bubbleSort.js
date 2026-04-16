export const bubbleSortInfo = {
  id: 'bubbleSort',
  name: 'バブルソート',
  category: 'sorting',
  description: '隣り合う要素を比較して大きい方を右に移動させる。',
  timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
  spaceComplexity: 'O(1)',
  prerequisites: [],
  pythonCode: [
    'def bubble_sort(arr):',
    '    n = len(arr)',
    '    for i in range(n - 1):',
    '        for j in range(n - 1 - i):',
    '            if arr[j] > arr[j + 1]:',
    '                arr[j], arr[j + 1] = arr[j + 1], arr[j]',
    '    return arr',
  ],
  actionToLine: {
    INIT: 0,
    PASS_START: 2,
    COMPARE: 4,
    SWAP: 5,
    NO_SWAP: 4,
    DONE: 6,
  },
  fillInBlanks: {
    template: [
      'def bubble_sort(arr):',
      '    n = len(arr)',
      '    for i in range(__①__):',
      '        for j in range(__②__):',
      '            if arr[j] __③__ arr[j + 1]:',
      '                arr[j], arr[j+1] = __④__',
      '    return arr',
    ],
    blanks: [
      { id: 1, answer: 'n - 1', hint: '外側ループ: 何回繰り返す？配列長から1引いた値' },
      { id: 2, answer: 'n - 1 - i', hint: '内側ループ: パスが進むごとに末尾は確定済み' },
      { id: 3, answer: '>', hint: '条件: 左が右より大きければ交換する' },
      { id: 4, answer: 'arr[j + 1], arr[j]', hint: 'Pythonのタプルアンパックで同時交換' },
    ],
  },
}

export function generateBubbleSortSteps(input) {
  const arr = [...input]
  const n = arr.length
  const steps = []

  steps.push({
    action: 'INIT',
    indices: [],
    array: [...arr],
    message: `配列を初期化しました。長さ: ${n}`,
  })

  for (let i = 0; i < n - 1; i++) {
    steps.push({
      action: 'PASS_START',
      indices: [],
      array: [...arr],
      message: `パス ${i + 1} 開始。末尾 ${i} 個は確定済み。`,
    })

    for (let j = 0; j < n - 1 - i; j++) {
      steps.push({
        action: 'COMPARE',
        indices: [j, j + 1],
        array: [...arr],
        message: `arr[${j}]=${arr[j]} と arr[${j + 1}]=${arr[j + 1]} を比較`,
      })

      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        steps.push({
          action: 'SWAP',
          indices: [j, j + 1],
          array: [...arr],
          message: `arr[${j}] と arr[${j + 1}] を交換しました`,
        })
      } else {
        steps.push({
          action: 'NO_SWAP',
          indices: [j, j + 1],
          array: [...arr],
          message: `交換不要: arr[${j}]=${arr[j]} ≤ arr[${j + 1}]=${arr[j + 1]}`,
        })
      }
    }
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

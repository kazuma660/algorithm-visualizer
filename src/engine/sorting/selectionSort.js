export const selectionSortInfo = {
  id: 'selectionSort',
  name: '選択ソート',
  category: 'sorting',
  description: '未ソート部分から最小値を選んで先頭と交換する。',
  timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
  spaceComplexity: 'O(1)',
  prerequisites: ['bubbleSort'],
  pythonCode: [
    'def selection_sort(arr):',
    '    n = len(arr)',
    '    for i in range(n):',
    '        min_idx = i',
    '        for j in range(i + 1, n):',
    '            if arr[j] < arr[min_idx]:',
    '                min_idx = j',
    '        arr[i], arr[min_idx] = arr[min_idx], arr[i]',
    '    return arr',
  ],
  actionToLine: {
    INIT: 0,
    OUTER: 2,
    SET_MIN: 3,
    COMPARE: 5,
    NEW_MIN: 6,
    SWAP: 7,
    DONE: 8,
  },
  fillInBlanks: {
    template: [
      'def selection_sort(arr):',
      '    n = len(arr)',
      '    for i in range(n):',
      '        min_idx = __①__',
      '        for j in range(__②__, n):',
      '            if arr[j] __③__ arr[min_idx]:',
      '                min_idx = __④__',
      '        arr[i], arr[min_idx] = arr[min_idx], arr[i]',
      '    return arr',
    ],
    blanks: [
      { id: 1, answer: 'i', hint: '最初の最小インデックスは現在位置' },
      { id: 2, answer: 'i + 1', hint: '未ソート部分の次から探す' },
      { id: 3, answer: '<', hint: '条件: より小さい要素を見つけたら' },
      { id: 4, answer: 'j', hint: '新しい最小インデックスを更新' },
    ],
  },
}

export function generateSelectionSortSteps(input) {
  const arr = [...input]
  const n = arr.length
  const steps = []

  steps.push({
    action: 'INIT',
    indices: [],
    array: [...arr],
    message: `配列を初期化しました。長さ: ${n}`,
  })

  for (let i = 0; i < n; i++) {
    steps.push({
      action: 'OUTER',
      indices: [i],
      array: [...arr],
      message: `外側ループ i=${i}: 位置 ${i} に最小値を配置する`,
    })

    let minIdx = i
    steps.push({
      action: 'SET_MIN',
      indices: [i],
      array: [...arr],
      message: `最小インデックスを i=${i} に設定 (arr[${i}]=${arr[i]})`,
    })

    for (let j = i + 1; j < n; j++) {
      steps.push({
        action: 'COMPARE',
        indices: [j, minIdx],
        array: [...arr],
        message: `arr[${j}]=${arr[j]} と現在の最小 arr[${minIdx}]=${arr[minIdx]} を比較`,
      })

      if (arr[j] < arr[minIdx]) {
        minIdx = j
        steps.push({
          action: 'NEW_MIN',
          indices: [minIdx],
          array: [...arr],
          message: `新しい最小値発見: arr[${minIdx}]=${arr[minIdx]}`,
        })
      }
    }

    ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
    steps.push({
      action: 'SWAP',
      indices: [i, minIdx],
      array: [...arr],
      message: `arr[${i}] と arr[${minIdx}] を交換: 位置 ${i} に ${arr[i]} を配置`,
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

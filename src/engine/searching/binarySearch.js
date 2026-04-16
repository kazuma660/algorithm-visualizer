export const binarySearchInfo = {
  id: 'binarySearch',
  name: '二分探索',
  category: 'searching',
  description: 'ソート済み配列を半分ずつ絞り込んで高速に目標値を探す。',
  timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
  spaceComplexity: 'O(1)',
  prerequisites: ['linearSearch'],
  requiresSorted: true,
  pythonCode: [
    'def binary_search(arr, target):',
    '    left, right = 0, len(arr) - 1',
    '    while left <= right:',
    '        mid = (left + right) // 2',
    '        if arr[mid] == target:',
    '            return mid',
    '        elif arr[mid] < target:',
    '            left = mid + 1',
    '        else:',
    '            right = mid - 1',
    '    return -1',
  ],
  actionToLine: {
    INIT: 1,
    LOOP: 2,
    MID: 3,
    FOUND: 5,
    GO_RIGHT: 7,
    GO_LEFT: 9,
    DONE: 10,
  },
  fillInBlanks: {
    template: [
      'def binary_search(arr, target):',
      '    left, right = 0, __①__',
      '    while __②__:',
      '        mid = (left + right) __③__ 2',
      '        if arr[mid] == target:',
      '            return mid',
      '        elif arr[mid] < target:',
      '            left = __④__',
      '        else:',
      '            right = mid - 1',
      '    return -1',
    ],
    blanks: [
      { id: 1, answer: 'len(arr) - 1', hint: '右端のインデックスは配列長-1' },
      { id: 2, answer: 'left <= right', hint: '探索範囲が有効な間ループ' },
      { id: 3, answer: '//', hint: 'Pythonの整数除算' },
      { id: 4, answer: 'mid + 1', hint: '右半分に絞る: leftをmidの次に' },
    ],
  },
}

export function generateBinarySearchSteps(input, target = 7) {
  const arr = [...input]
  const n = arr.length
  const steps = []

  let left = 0
  let right = n - 1

  steps.push({
    action: 'INIT',
    indices: [],
    array: [...arr],
    left,
    right,
    mid: null,
    message: `初期化: left=${left}, right=${right}, target=${target}`,
  })

  while (left <= right) {
    steps.push({
      action: 'LOOP',
      indices: [],
      array: [...arr],
      left,
      right,
      mid: null,
      message: `ループ条件: left=${left} <= right=${right}`,
    })

    const mid = Math.floor((left + right) / 2)

    steps.push({
      action: 'MID',
      indices: [mid],
      array: [...arr],
      left,
      right,
      mid,
      message: `mid = (${left} + ${right}) // 2 = ${mid}, arr[${mid}]=${arr[mid]}`,
    })

    if (arr[mid] === target) {
      steps.push({
        action: 'FOUND',
        indices: [mid],
        array: [...arr],
        left,
        right,
        mid,
        foundIndex: mid,
        message: `見つかった！arr[${mid}]=${arr[mid]} = target=${target}`,
      })

      steps.push({
        action: 'DONE',
        indices: [mid],
        array: [...arr],
        left,
        right,
        mid,
        foundIndex: mid,
        message: `探索完了: インデックス ${mid} で発見`,
      })

      return steps
    } else if (arr[mid] < target) {
      steps.push({
        action: 'GO_RIGHT',
        indices: [mid],
        array: [...arr],
        left,
        right,
        mid,
        message: `arr[${mid}]=${arr[mid]} < target=${target}: 右半分へ。left = ${mid + 1}`,
      })
      left = mid + 1
    } else {
      steps.push({
        action: 'GO_LEFT',
        indices: [mid],
        array: [...arr],
        left,
        right,
        mid,
        message: `arr[${mid}]=${arr[mid]} > target=${target}: 左半分へ。right = ${mid - 1}`,
      })
      right = mid - 1
    }
  }

  steps.push({
    action: 'DONE',
    indices: [],
    array: [...arr],
    left,
    right,
    mid: null,
    foundIndex: -1,
    message: `探索完了: target=${target} は見つかりませんでした (-1)`,
  })

  return steps
}

export const linearSearchInfo = {
  id: 'linearSearch',
  name: '線形探索',
  category: 'searching',
  description: '配列を先頭から順番に調べて目標値を探す。',
  timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
  spaceComplexity: 'O(1)',
  prerequisites: [],
  pythonCode: [
    'def linear_search(arr, target):',
    '    for i in range(len(arr)):',
    '        if arr[i] == target:',
    '            return i',
    '    return -1',
  ],
  actionToLine: {
    INIT: 0,
    CHECK: 2,
    FOUND: 3,
    NOT_FOUND: 4,
    DONE: 4,
  },
  fillInBlanks: {
    template: [
      'def linear_search(arr, target):',
      '    for i in range(__①__):',
      '        if arr[i] __②__ target:',
      '            return __③__',
      '    return __④__',
    ],
    blanks: [
      { id: 1, answer: 'len(arr)', hint: '配列の全要素を調べる' },
      { id: 2, answer: '==', hint: '条件: 要素がtargetと等しい' },
      { id: 3, answer: 'i', hint: '見つかったインデックスを返す' },
      { id: 4, answer: '-1', hint: '見つからなかった場合の慣習的な返り値' },
    ],
  },
}

export function generateLinearSearchSteps(input, target = 7) {
  const arr = [...input]
  const n = arr.length
  const steps = []
  const checked = []

  steps.push({
    action: 'INIT',
    indices: [],
    array: [...arr],
    checked: [],
    message: `配列を初期化。target = ${target} を探します`,
  })

  for (let i = 0; i < n; i++) {
    steps.push({
      action: 'CHECK',
      indices: [i],
      array: [...arr],
      checked: [...checked],
      message: `arr[${i}]=${arr[i]} を確認。target=${target} と等しい？`,
    })

    if (arr[i] === target) {
      steps.push({
        action: 'FOUND',
        indices: [i],
        array: [...arr],
        checked: [...checked, i],
        foundIndex: i,
        message: `見つかった！arr[${i}]=${arr[i]} = target=${target}。インデックス ${i} を返す`,
      })

      steps.push({
        action: 'DONE',
        indices: [i],
        array: [...arr],
        checked: [...checked, i],
        foundIndex: i,
        message: `探索完了: インデックス ${i} で発見`,
      })

      return steps
    }

    checked.push(i)
  }

  steps.push({
    action: 'NOT_FOUND',
    indices: [],
    array: [...arr],
    checked: [...checked],
    message: `全要素を確認しましたが target=${target} は見つかりませんでした`,
  })

  steps.push({
    action: 'DONE',
    indices: [],
    array: [...arr],
    checked: [...checked],
    foundIndex: -1,
    message: `探索完了: -1 を返す（見つからず）`,
  })

  return steps
}

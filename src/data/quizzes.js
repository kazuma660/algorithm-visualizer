export const quizzes = {
  linearSearch: [
    {
      question: '線形探索の最悪時間計算量は？',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
      correctIndex: 2,
      explanation: '目標値が末尾にある場合や存在しない場合、全要素を走査するためO(n)になります。',
    },
    {
      question: '線形探索が最も効率的に動作するのはどんな場合？',
      options: [
        '配列がソートされている場合',
        '目標値が配列の先頭にある場合',
        '配列のサイズが大きい場合',
        '目標値が配列に存在しない場合',
      ],
      correctIndex: 1,
      explanation: '最初の要素がtargetと一致すれば1回の比較で終わり、O(1)の最良ケースになります。',
    },
    {
      question: '線形探索でtarget=5を配列[2, 7, 1, 5, 3]から探すとき、何回比較が行われる？',
      options: ['1回', '2回', '4回', '5回'],
      correctIndex: 2,
      explanation: 'インデックス0(2), 1(7), 2(1), 3(5)の順に確認し、4回目で見つかります。',
    },
    {
      question: '線形探索はどんな配列に対しても使えるか？',
      options: [
        'ソート済み配列のみ',
        '数値配列のみ',
        'ソートされていない配列でも使える',
        '重複なしの配列のみ',
      ],
      correctIndex: 2,
      explanation: '線形探索は配列の順序を前提としないため、ソートの有無に関わらず使用できます。',
    },
  ],

  binarySearch: [
    {
      question: '二分探索の前提条件は？',
      options: [
        '配列がソートされていること',
        '配列の要素数が偶数であること',
        '配列に重複がないこと',
        '配列が降順であること',
      ],
      correctIndex: 0,
      explanation: '二分探索は配列がソートされていることを前提として、中央値との比較で探索範囲を半分に絞ります。',
    },
    {
      question: '二分探索の最悪時間計算量は？',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correctIndex: 1,
      explanation: '毎回探索範囲を半分にするため、最大log₂(n)回の比較で終わります。',
    },
    {
      question: '配列[1,2,3,4,5,6,7,8]でtarget=3を二分探索すると、最初のmidの値は？',
      options: ['3', '4', '5', '2'],
      correctIndex: 1,
      explanation: 'left=0, right=7のとき、mid = (0+7)//2 = 3、arr[3]=4です。',
    },
    {
      question: '二分探索で目標値が見つからなかった場合、何を返すのが一般的？',
      options: ['0', 'null', '-1', 'undefined'],
      correctIndex: 2,
      explanation: '慣習的にインデックスが存在しないことを示す-1を返します。',
    },
  ],

  bubbleSort: [
    {
      question: 'バブルソートの最悪時間計算量は？',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)'],
      correctIndex: 2,
      explanation: '全ての比較が必要なためO(n²)になります。',
    },
    {
      question: '配列[3,1,2]をバブルソートした時、最初のパスで何回交換が起きる？',
      options: ['0回', '1回', '2回', '3回'],
      correctIndex: 2,
      explanation: '3と1を交換 → [1,3,2]、3と2を交換 → [1,2,3] で2回交換が起きます。',
    },
    {
      question: 'バブルソートの最良時間計算量は？（最適化版の場合）',
      options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)'],
      correctIndex: 1,
      explanation: '既にソート済みの配列の場合、交換が0回であることを検出して1パスで終了できるためO(n)です。',
    },
    {
      question: 'バブルソートはどのようなソートアルゴリズムに分類される？',
      options: [
        'インプレース・安定ソート',
        'インプレース・不安定ソート',
        '追加領域が必要・安定ソート',
        '追加領域が必要・不安定ソート',
      ],
      correctIndex: 0,
      explanation: '追加のメモリを必要とせず(O(1)空間)、等しい要素の相対順序を保持する安定ソートです。',
    },
  ],

  selectionSort: [
    {
      question: '選択ソートの時間計算量は最良・最悪ともに？',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
      correctIndex: 2,
      explanation: '常に未ソート部分全体を走査するため、最良・最悪ともにO(n²)です。',
    },
    {
      question: '選択ソートで配列[5,3,1,4,2]のとき、1回目のパスで何が起きる？',
      options: [
        '5と3を交換する',
        '最小値1を探して5と交換する',
        '1,2,3,4,5の順に並べる',
        '隣り合う要素を比較して交換する',
      ],
      correctIndex: 1,
      explanation: '未ソート部分[5,3,1,4,2]の最小値1(インデックス2)を見つけ、先頭の5と交換します。',
    },
    {
      question: '選択ソートの空間計算量は？',
      options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
      correctIndex: 3,
      explanation: '元の配列以外に追加の領域をほぼ使用しないため、O(1)です。',
    },
    {
      question: '選択ソートは安定ソートか？',
      options: [
        '常に安定ソート',
        '安定ソートではない',
        '入力によって変わる',
        '実装によって変わる',
      ],
      correctIndex: 1,
      explanation: '離れた位置の要素を交換するため等しい要素の相対順序が変わる可能性があり、不安定ソートです。',
    },
  ],

  insertionSort: [
    {
      question: '挿入ソートの最良時間計算量は？',
      options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)'],
      correctIndex: 1,
      explanation: '既にソート済みの場合、各要素で比較が1回だけで済むためO(n)です。',
    },
    {
      question: '挿入ソートが特に得意とするケースは？',
      options: [
        'ランダムに並んだ大きな配列',
        'ほぼソート済みの配列',
        '逆順にソートされた配列',
        '重複が多い配列',
      ],
      correctIndex: 1,
      explanation: 'ほぼソート済みの配列では少ない比較とシフトで済むため、非常に効率よく動作します。',
    },
    {
      question: '配列[4,2,3]に挿入ソートを適用すると、i=1のとき何が起きる？',
      options: [
        'key=2を取り出し、4を右にシフトして位置0に2を挿入',
        'key=4を取り出し、位置を確認する',
        '2と3を比較して交換する',
        'key=3を取り出し、位置を確認する',
      ],
      correctIndex: 0,
      explanation: 'i=1のときkey=arr[1]=2。arr[0]=4 > 2なので4を右にシフトし、位置0に2を挿入して[2,4,3]になります。',
    },
    {
      question: '挿入ソートの空間計算量は？',
      options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
      correctIndex: 2,
      explanation: 'インプレースで動作し、追加のメモリをほぼ使用しないためO(1)です。',
    },
  ],
}

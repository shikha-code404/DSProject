import { Zap } from 'lucide-react'
import PathPage from '../components/PathPage'
import { usePrereqProgress } from '../hooks/usePrereqProgress'
import { useToast } from '../components/ui/Toast'

const LESSONS = [
  // Chapter 1: Programming Fundamentals
  { id: 1,  chapter: 'Programming Fundamentals', title: 'What is Data Structure', description: 'Linear vs Non-linear data structures, standard algorithms', difficulty: 'beginner', duration: '30 min', completed: false },
  { id: 2,  chapter: 'Programming Fundamentals', title: 'Control Statements', description: 'Conditional flow: if, else, switch', difficulty: 'beginner', duration: '35 min', completed: false, link: '/beginner/control-statements' },
  { id: 3,  chapter: 'Programming Fundamentals', title: 'Loops', description: 'Repetitive flow control: for, while, do-while', difficulty: 'beginner', duration: '40 min', completed: false, link: '/beginner/loops' },
  { id: 4,  chapter: 'Programming Fundamentals', title: 'Arrays & Strings', description: 'Basics of contiguous memory and character sequences', difficulty: 'beginner', duration: '60 min', completed: false },
  { id: 5,  chapter: 'Programming Fundamentals', title: 'Structures', description: 'Custom data groups using structures in C/C++', difficulty: 'beginner', duration: '40 min', completed: false },
  { id: 6,  chapter: 'Programming Fundamentals', title: 'Pointers', description: 'Memory addressing, referencing, and dereferencing', difficulty: 'intermediate', duration: '55 min', completed: false },
  { id: 7,  chapter: 'Programming Fundamentals', title: 'Pass By Value vs Pass By Reference', description: 'Argument passing models and memory impacts', difficulty: 'intermediate', duration: '35 min', completed: false },
  { id: 8,  chapter: 'Programming Fundamentals', title: 'STL Introduction', description: 'Standard Template Library: vectors, stacks, queues', difficulty: 'intermediate', duration: '70 min', completed: false, link: '/beginner/stl-introduction' },
  { id: 9,  chapter: 'Programming Fundamentals', title: 'Time & Space Complexity', description: 'Analyzing algorithm execution costs using Big-O', difficulty: 'intermediate', duration: '45 min', completed: false },

  // Chapter 2: Arrays
  { id: 10, chapter: 'Arrays', title: 'Introduction to Arrays', description: 'Declaration, index mapping, and traversing elements', difficulty: 'beginner', duration: '30 min', completed: false },
  { id: 11, chapter: 'Arrays', title: 'Array Operations', description: 'Inserting, deleting, and updating array elements', difficulty: 'beginner', duration: '35 min', completed: false },
  { id: 12, chapter: 'Arrays', title: 'Two Pointer Technique', description: 'Solving array problems efficiently with two-pointer patterns', difficulty: 'beginner', duration: '45 min', completed: false },
  { id: 13, chapter: 'Arrays', title: 'Linear Search', description: 'Searching elements in unsorted list sequentially', difficulty: 'beginner', duration: '20 min', completed: false },
  { id: 14, chapter: 'Arrays', title: 'Binary Search', description: 'Highly efficient search in sorted lists', difficulty: 'beginner', duration: '40 min', completed: false },

  // Chapter 3: Strings
  { id: 15, chapter: 'Strings', title: 'String Manipulation', description: 'String methods, character array conversion and parsing', difficulty: 'beginner', duration: '40 min', completed: false },
  { id: 16, chapter: 'Strings', title: 'Reverse String', description: 'String reversing algorithms and pointer swaps', difficulty: 'beginner', duration: '25 min', completed: false },
  { id: 17, chapter: 'Strings', title: 'Pattern Matching Basics', description: 'Simple substring matching techniques', difficulty: 'beginner', duration: '35 min', completed: false },

  // Chapter 4: Sorting Techniques
  { id: 18, chapter: 'Sorting Techniques', title: 'Bubble Sort', description: 'Sinking sort by adjacent elements swap', difficulty: 'beginner', duration: '25 min', completed: false },
  { id: 19, chapter: 'Sorting Techniques', title: 'Selection Sort', description: 'Finding minimum and positioning iteratively', difficulty: 'beginner', duration: '25 min', completed: false },
  { id: 20, chapter: 'Sorting Techniques', title: 'Insertion Sort', description: 'Sorting like a hand of cards element-by-element', difficulty: 'beginner', duration: '30 min', completed: false },
  { id: 21, chapter: 'Sorting Techniques', title: 'Merge Sort', description: 'Divide and conquer stable sorting', difficulty: 'intermediate', duration: '50 min', completed: false },
  { id: 22, chapter: 'Sorting Techniques', title: 'Quick Sort', description: 'Partition-based pivot-driven high performance sorting', difficulty: 'intermediate', duration: '50 min', completed: false },
  { id: 23, chapter: 'Sorting Techniques', title: 'Radix Sort', description: 'Non-comparative digit-based bucket sorting', difficulty: 'advanced', duration: '45 min', completed: false },

  // Chapter 5: Recursion
  { id: 24, chapter: 'Recursion', title: 'Recursion Fundamentals', description: 'Recursive calls, base conditions, call stack memory', difficulty: 'beginner', duration: '50 min', completed: false },
  { id: 25, chapter: 'Recursion', title: 'Factorial & Fibonacci', description: 'Classic recurrences and execution paths', difficulty: 'beginner', duration: '30 min', completed: false },
  { id: 26, chapter: 'Recursion', title: 'Recursion Tree Analysis', description: 'Analyzing recursion costs and complexity trees', difficulty: 'intermediate', duration: '45 min', completed: false },

  // Chapter 6: Linked Lists
  { id: 27, chapter: 'Linked Lists', title: 'Linked List Introduction', description: 'Singly linked list: node linking and pointer traversal', difficulty: 'beginner', duration: '45 min', completed: false },
  { id: 28, chapter: 'Linked Lists', title: 'Linked List Operations', description: 'Insertion, deletion, reversing linked list', difficulty: 'beginner', duration: '55 min', completed: false },
  { id: 29, chapter: 'Linked Lists', title: 'Doubly Linked List', description: 'Two-way linked list with previous and next pointers', difficulty: 'intermediate', duration: '50 min', completed: false },
  { id: 30, chapter: 'Linked Lists', title: 'Circular Linked List', description: 'Ring-like node connections with tail pointing to head', difficulty: 'intermediate', duration: '45 min', completed: false },

  // Chapter 7: Stack
  { id: 31, chapter: 'Stack', title: 'Stack', description: 'LIFO structure: push, pop, peek, array/list backings', difficulty: 'beginner', duration: '40 min', completed: false },
  { id: 32, chapter: 'Stack', title: 'Valid Parentheses', description: 'Bracket matching using stack-based verification', difficulty: 'beginner', duration: '30 min', completed: false },

  // Chapter 8: Queue
  { id: 33, chapter: 'Queue', title: 'Queue', description: 'FIFO structure: enqueue, dequeue, array/list backings', difficulty: 'beginner', duration: '40 min', completed: false },
  { id: 34, chapter: 'Queue', title: 'Circular Queue', description: 'Ring buffer queue eliminating indexing space leaks', difficulty: 'intermediate', duration: '40 min', completed: false },
  { id: 35, chapter: 'Queue', title: 'Deque', description: 'Double-ended queue allowing operations on both terminals', difficulty: 'intermediate', duration: '45 min', completed: false },
  { id: 36, chapter: 'Queue', title: 'Priority Queue', description: 'Key-based elements dispatch using binary heap bounds', difficulty: 'intermediate', duration: '50 min', completed: false },

  // Chapter 9: Hashing
  { id: 37, chapter: 'Hashing', title: 'Hashing Basics', description: 'Hash tables, mapping keys to values using hash functions', difficulty: 'beginner', duration: '50 min', completed: false },
  { id: 38, chapter: 'Hashing', title: 'Frequency Counting', description: 'Tracking occurrences of list elements efficiently', difficulty: 'beginner', duration: '30 min', completed: false },
  { id: 39, chapter: 'Hashing', title: 'Hash Maps', description: 'Key-value storage, operations and complexity', difficulty: 'intermediate', duration: '45 min', completed: false },
  { id: 40, chapter: 'Hashing', title: 'Hash Sets', description: 'Collection of unique elements using hashing structure', difficulty: 'intermediate', duration: '40 min', completed: false },
  { id: 41, chapter: 'Hashing', title: 'Collision Handling', description: 'Resolving hash duplicates: chaining vs open addressing', difficulty: 'advanced', duration: '55 min', completed: false },

  // Chapter 10: Trees
  { id: 42, chapter: 'Trees', title: 'Tree Introduction', description: 'Hierarchical node model, terminologies and metrics', difficulty: 'beginner', duration: '45 min', completed: false },
  { id: 43, chapter: 'Trees', title: 'Binary Tree', description: 'Degree two trees, node children and height bounds', difficulty: 'intermediate', duration: '50 min', completed: false },
  { id: 44, chapter: 'Trees', title: 'Tree Traversals', description: 'DFS/BFS on trees: In-order, Pre-order, Post-order, Level-order', difficulty: 'intermediate', duration: '55 min', completed: false },
  { id: 45, chapter: 'Trees', title: 'Binary Search Tree', description: 'Sorted tree structure search, insertion and deletion', difficulty: 'intermediate', duration: '60 min', completed: false },
  { id: 46, chapter: 'Trees', title: 'AVL Tree', description: 'Self-balancing BST using single and double balance rotations', difficulty: 'advanced', duration: '75 min', completed: false },
  { id: 47, chapter: 'Trees', title: 'Heap', description: 'Array-represented complete binary tree min/max bounds', difficulty: 'intermediate', duration: '50 min', completed: false },

  // Chapter 11: Practice Zone
  { id: 48, chapter: 'Practice Zone', title: 'Practice Problems Set 1', description: 'Targeted algorithm puzzles to test beginner skills', difficulty: 'beginner', duration: '2 hrs', completed: false },
  { id: 49, chapter: 'Practice Zone', title: 'Practice Problems Set 2', description: 'Real-world coding platform easy challenges', difficulty: 'beginner', duration: '2 hrs', completed: false }
]

export default function BeginnerPath() {
  const { pct, quizPassed } = usePrereqProgress()
  const { addToast } = useToast()

  const isPrereqDone = pct === 100 && quizPassed

  const lessonsWithLock = LESSONS.map(l => ({
    ...l,
    locked: !isPrereqDone
  }))

  const handleLockedClick = () => {
    addToast({
      type: 'warning',
      title: 'Prerequisite Incomplete',
      message: 'Please complete the previous section properly first with 100% section completion and quiz passed successfully.'
    })
  }

  return (
    <PathPage
      title="Beginner Path"
      subtitle="Arrays, strings, searching, sorting, and recursion. Build the foundation of algorithmic thinking."
      icon={Zap}
      color="green"
      difficulty="beginner"
      lessons={lessonsWithLock}
      onLockedClick={handleLockedClick}
    />
  )
}

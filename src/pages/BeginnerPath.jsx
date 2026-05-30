import { Zap } from 'lucide-react'
import PathPage from '../components/PathPage'
import { usePrereqProgress } from '../hooks/usePrereqProgress'
import { useToast } from '../components/ui/Toast'

const LESSONS = [
  { id: 1,  order: 1,  title: 'What is Data Structure',       description: 'Linear vs Non-linear: Arrays, Trees, Stacks, Graphs',   difficulty: 'beginner',     duration: '30 min', completed: false },
  { id: 2,  order: 2,  title: 'Control Statements',           description: 'if, if-else, nested if, switch statement',               difficulty: 'beginner',     duration: '35 min', completed: false },
  { id: 3,  order: 3,  title: 'Loops',                        description: 'for, while, do-while, nested loops',                     difficulty: 'beginner',     duration: '40 min', completed: false },
  { id: 4,  order: 4,  title: 'Arrays & Strings',             description: '1D/2D arrays, traversal, string basics and operations',  difficulty: 'beginner',     duration: '60 min', completed: false },
  { id: 5,  order: 5,  title: 'Pointers',                     description: 'Pointer basics, address operator, dereferencing',        difficulty: 'intermediate', duration: '55 min', completed: false },
  { id: 6,  order: 6,  title: 'Pass By Value vs By Reference',description: 'Definitions, differences, examples, use cases',                  difficulty: 'intermediate', duration: '35 min', completed: false },
  { id: 7,  order: 7,  title: 'Structures',                   description: 'Structure syntax, declaring, accessing members',         difficulty: 'beginner',     duration: '40 min', completed: false },
  { id: 8,  order: 8,  title: 'STL Introduction',             description: 'vector, pair, stack, queue, map, set',                   difficulty: 'intermediate', duration: '70 min', completed: false },
  { id: 9,  order: 9,  title: 'Time & Space Complexity',      description: 'Big-O notation, O(1), O(log n), O(n), O(n²)',            difficulty: 'intermediate', duration: '45 min', completed: false },
  { id: 10, order: 10, title: 'Introduction to Arrays',         description: 'Declaration, initialization, traversal',                 difficulty: 'beginner',     duration: '30 min', completed: false },
  { id: 11, order: 11, title: 'Array Operations',               description: 'Insert, delete, search in arrays',                       difficulty: 'beginner',     duration: '35 min', completed: false },
  { id: 12, order: 12, title: 'Two Pointer Technique',          description: 'Sliding window and two-pointer patterns',                difficulty: 'beginner',     duration: '45 min', completed: false },
  { id: 13, order: 13, title: 'String Manipulation',            description: 'Reverse, palindrome, anagram problems',                  difficulty: 'beginner',     duration: '40 min', completed: false },
  { id: 14, order: 14, title: 'Linear Search',                  description: 'Sequential search implementation and analysis',          difficulty: 'beginner',     duration: '20 min', completed: false },
  { id: 15, order: 15, title: 'Binary Search',                  description: 'Divide and conquer search on sorted arrays',             difficulty: 'beginner',     duration: '40 min', completed: false },
  { id: 16, order: 16, title: 'Bubble Sort',                    description: 'Simple comparison-based sorting algorithm',              difficulty: 'beginner',     duration: '25 min', completed: false },
  { id: 17, order: 17, title: 'Selection Sort',                 description: 'In-place selection sorting technique',                   difficulty: 'beginner',     duration: '25 min', completed: false },
  { id: 18, order: 18, title: 'Insertion Sort',                 description: 'Building sorted array one element at a time',            difficulty: 'beginner',     duration: '30 min', completed: false },
  { id: 19, order: 19, title: 'Recursion Fundamentals',         description: 'Base case, recursive case, call stack',                  difficulty: 'beginner',     duration: '50 min', completed: false },
  { id: 20, order: 20, title: 'Factorial & Fibonacci',          description: 'Classic recursive problems',                             difficulty: 'beginner',     duration: '30 min', completed: false },
  { id: 21, order: 21, title: 'Linked List Introduction',       description: 'Singly linked list: node structure and traversal',       difficulty: 'beginner',     duration: '45 min', completed: false },
  { id: 22, order: 22, title: 'Linked List Operations',         description: 'Insert, delete, reverse a linked list',                  difficulty: 'beginner',     duration: '55 min', completed: false },
  { id: 23, order: 23, title: 'Stack',                          description: 'LIFO structure, push, pop, peek, applications',          difficulty: 'beginner',     duration: '40 min', completed: false },
  { id: 24, order: 24, title: 'Queue',                          description: 'FIFO structure, enqueue, dequeue, circular queue',       difficulty: 'beginner',     duration: '40 min', completed: false },
  { id: 25, order: 25, title: 'Hashing Basics',                 description: 'Hash maps, hash tables, collision handling',              difficulty: 'beginner',     duration: '50 min', completed: false },
  { id: 26, order: 26, title: 'Practice Problems Set 1',        description: '20 curated problems to reinforce concepts',              difficulty: 'beginner',     duration: '2 hrs',  completed: false },
  { id: 27, order: 27, title: 'Practice Problems Set 2',        description: 'LeetCode easy: arrays & strings',                        difficulty: 'beginner',     duration: '2 hrs',  completed: false },
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

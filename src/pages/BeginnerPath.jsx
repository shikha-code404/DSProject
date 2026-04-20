import { Zap } from 'lucide-react'
import PathPage from '../components/PathPage'

const LESSONS = [
  { id: 1,  title: 'Introduction to Arrays',         description: 'Declaration, initialization, traversal',                 difficulty: 'beginner',     duration: '30 min', completed: false },
  { id: 2,  title: 'Array Operations',               description: 'Insert, delete, search in arrays',                       difficulty: 'beginner',     duration: '35 min', completed: false },
  { id: 3,  title: 'Two Pointer Technique',          description: 'Sliding window and two-pointer patterns',                difficulty: 'beginner',     duration: '45 min', completed: false },
  { id: 4,  title: 'String Manipulation',            description: 'Reverse, palindrome, anagram problems',                  difficulty: 'beginner',     duration: '40 min', completed: false },
  { id: 5,  title: 'Linear Search',                  description: 'Sequential search implementation and analysis',          difficulty: 'beginner',     duration: '20 min', completed: false },
  { id: 6,  title: 'Binary Search',                  description: 'Divide and conquer search on sorted arrays',             difficulty: 'beginner',     duration: '40 min', completed: false },
  { id: 7,  title: 'Bubble Sort',                    description: 'Simple comparison-based sorting algorithm',              difficulty: 'beginner',     duration: '25 min', completed: false },
  { id: 8,  title: 'Selection Sort',                 description: 'In-place selection sorting technique',                   difficulty: 'beginner',     duration: '25 min', completed: false },
  { id: 9,  title: 'Insertion Sort',                 description: 'Building sorted array one element at a time',            difficulty: 'beginner',     duration: '30 min', completed: false },
  { id: 10, title: 'Recursion Fundamentals',         description: 'Base case, recursive case, call stack',                  difficulty: 'beginner',     duration: '50 min', completed: false },
  { id: 11, title: 'Factorial & Fibonacci',          description: 'Classic recursive problems',                             difficulty: 'beginner',     duration: '30 min', completed: false },
  { id: 12, title: 'Linked List Introduction',       description: 'Singly linked list: node structure and traversal',       difficulty: 'beginner',     duration: '45 min', completed: false },
  { id: 13, title: 'Linked List Operations',         description: 'Insert, delete, reverse a linked list',                  difficulty: 'beginner',     duration: '55 min', completed: false },
  { id: 14, title: 'Stack',                          description: 'LIFO structure, push, pop, peek, applications',          difficulty: 'beginner',     duration: '40 min', completed: false },
  { id: 15, title: 'Queue',                          description: 'FIFO structure, enqueue, dequeue, circular queue',       difficulty: 'beginner',     duration: '40 min', completed: false },
  { id: 16, title: 'Hashing Basics',                 description: 'Hash maps, hash tables, collision handling',              difficulty: 'beginner',     duration: '50 min', completed: false },
  { id: 17, title: 'Practice Problems Set 1',        description: '20 curated problems to reinforce concepts',              difficulty: 'beginner',     duration: '2 hrs',  completed: false },
  { id: 18, title: 'Practice Problems Set 2',        description: 'LeetCode easy: arrays & strings',                        difficulty: 'beginner',     duration: '2 hrs',  completed: false },
]

export default function BeginnerPath() {
  return (
    <PathPage
      title="Beginner Path"
      subtitle="Arrays, strings, searching, sorting, and recursion. Build the foundation of algorithmic thinking."
      icon={Zap}
      color="green"
      difficulty="beginner"
      lessons={LESSONS}
      prerequisiteText="Make sure you've completed the Prerequisite module (C++ setup) before starting."
    />
  )
}

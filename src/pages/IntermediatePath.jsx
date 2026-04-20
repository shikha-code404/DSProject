import { GitBranch } from 'lucide-react'
import PathPage from '../components/PathPage'

const LESSONS = [
  { id: 1,  title: 'Binary Trees',                    description: 'Tree structure, terminology, traversals (in/pre/post)',         difficulty: 'intermediate', duration: '60 min', completed: false },
  { id: 2,  title: 'Binary Search Tree (BST)',         description: 'BST insert, delete, search, min/max',                          difficulty: 'intermediate', duration: '55 min', completed: false },
  { id: 3,  title: 'Tree Height, Depth & Diameter',   description: 'Recursive computation of tree metrics',                         difficulty: 'intermediate', duration: '45 min', completed: false },
  { id: 4,  title: 'Level Order Traversal (BFS)',      description: 'Queue-based level-by-level traversal',                         difficulty: 'intermediate', duration: '40 min', completed: false },
  { id: 5,  title: 'Lowest Common Ancestor',          description: 'LCA in binary trees, BST optimization',                         difficulty: 'intermediate', duration: '50 min', completed: false },
  { id: 6,  title: 'Graph: Basics & Representation', description: 'Adjacency matrix, adjacency list, edge types',                   difficulty: 'intermediate', duration: '55 min', completed: false },
  { id: 7,  title: 'BFS on Graphs',                   description: 'Breadth-first traversal, shortest path in unweighted graph',   difficulty: 'intermediate', duration: '55 min', completed: false },
  { id: 8,  title: 'DFS on Graphs',                   description: 'Depth-first search, connected components, cycle detection',    difficulty: 'intermediate', duration: '60 min', completed: false },
  { id: 9,  title: 'Topological Sort',                description: 'Kahn\'s algorithm, DFS-based topological ordering',             difficulty: 'intermediate', duration: '50 min', completed: false },
  { id: 10, title: 'Shortest Path: Dijkstra',         description: 'Priority queue-based single source shortest path',              difficulty: 'intermediate', duration: '65 min', completed: false },
  { id: 11, title: 'Dynamic Programming: Intro',      description: 'Memoization vs tabulation, overlapping subproblems',            difficulty: 'intermediate', duration: '70 min', completed: false },
  { id: 12, title: 'Knapsack Problem',                description: '0/1 knapsack, unbounded knapsack',                              difficulty: 'intermediate', duration: '60 min', completed: false },
  { id: 13, title: 'Longest Common Subsequence',      description: 'LCS DP table construction and optimizations',                   difficulty: 'intermediate', duration: '55 min', completed: false },
  { id: 14, title: 'Coin Change Problem',             description: 'Min coins DP, count of ways',                                   difficulty: 'intermediate', duration: '45 min', completed: false },
  { id: 15, title: 'Greedy Algorithms',               description: 'Activity selection, Huffman coding, fractional knapsack',       difficulty: 'intermediate', duration: '60 min', completed: false },
  { id: 16, title: 'Merge Sort',                      description: 'Divide and conquer sorting, stability, count inversions',       difficulty: 'intermediate', duration: '50 min', completed: false },
  { id: 17, title: 'Quick Sort',                      description: 'Partition logic, randomized pivot, worst case analysis',        difficulty: 'intermediate', duration: '50 min', completed: false },
  { id: 18, title: 'Heap & Priority Queue',           description: 'Min/max-heap, heapify, heap sort, STL priority_queue',         difficulty: 'intermediate', duration: '55 min', completed: false },
]

export default function IntermediatePath() {
  return (
    <PathPage
      title="Intermediate Path"
      subtitle="Trees, graphs, dynamic programming, and greedy algorithms. Everything you need for coding interviews."
      icon={GitBranch}
      color="orange"
      difficulty="intermediate"
      lessons={LESSONS}
      prerequisiteText="Complete the Beginner Path before tackling intermediate topics."
    />
  )
}

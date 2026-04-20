import { Cpu } from 'lucide-react'
import PathPage from '../components/PathPage'

const LESSONS = [
  { id: 1,  title: 'Segment Trees',                    description: 'Build, query, update — range sum & range min',              difficulty: 'advanced', duration: '80 min', completed: false },
  { id: 2,  title: 'Lazy Propagation',                 description: 'Deferred updates on segment trees',                         difficulty: 'advanced', duration: '70 min', completed: false },
  { id: 3,  title: 'Fenwick Tree (BIT)',               description: 'Binary indexed tree for prefix sum queries',                 difficulty: 'advanced', duration: '65 min', completed: false },
  { id: 4,  title: 'Trie Data Structure',              description: 'Prefix tree, word search, autocomplete',                    difficulty: 'advanced', duration: '70 min', completed: false },
  { id: 5,  title: 'Disjoint Set Union (DSU)',         description: 'Union-find with path compression and union by rank',        difficulty: 'advanced', duration: '65 min', completed: false },
  { id: 6,  title: 'Minimum Spanning Tree',            description: 'Kruskal\'s and Prim\'s algorithms, DSU application',         difficulty: 'advanced', duration: '70 min', completed: false },
  { id: 7,  title: 'Bellman-Ford & Floyd-Warshall',   description: 'All-pairs shortest path, negative cycle detection',          difficulty: 'advanced', duration: '75 min', completed: false },
  { id: 8,  title: 'Advanced DP: Bitmask DP',         description: 'Traveling salesman problem, subset enumeration',             difficulty: 'advanced', duration: '90 min', completed: false },
  { id: 9,  title: 'Advanced DP: Interval DP',        description: 'Matrix chain multiplication, palindrome partitioning',       difficulty: 'advanced', duration: '80 min', completed: false },
  { id: 10, title: 'Advanced DP: DP on Trees',        description: 'Tree DP patterns, rerooting technique',                     difficulty: 'advanced', duration: '85 min', completed: false },
  { id: 11, title: 'String: KMP Algorithm',           description: 'Pattern matching with failure function, O(n+m) search',     difficulty: 'advanced', duration: '70 min', completed: false },
  { id: 12, title: 'String: Z-Algorithm',             description: 'Z-array construction, applications in pattern matching',    difficulty: 'advanced', duration: '65 min', completed: false },
  { id: 13, title: 'String: Suffix Array',            description: 'Building suffix arrays, LCP array, applications',           difficulty: 'advanced', duration: '90 min', completed: false },
  { id: 14, title: 'Network Flow: Ford-Fulkerson',    description: 'Max flow, augmenting paths, BFS-based Edmonds-Karp',        difficulty: 'advanced', duration: '80 min', completed: false },
  { id: 15, title: 'Heavy-Light Decomposition',       description: 'Path queries on trees in O(log²n)',                         difficulty: 'advanced', duration: '100 min', completed: false },
  { id: 16, title: 'Number Theory',                   description: 'GCD, modular arithmetic, Euler\'s totient, sieve',           difficulty: 'advanced', duration: '70 min', completed: false },
  { id: 17, title: 'Competitive Programming Tricks',  description: 'Bit manipulation, fast I/O, contest strategies',             difficulty: 'advanced', duration: '60 min', completed: false },
  { id: 18, title: 'Mock Contest',                    description: 'Full competitive programming mock with editorial review',    difficulty: 'advanced', duration: '3 hrs',  completed: false },
]

export default function AdvancedPath() {
  return (
    <PathPage
      title="Advanced Path"
      subtitle="Segment trees, tries, advanced DP, flow networks, and competitive programming mastery."
      icon={Cpu}
      color="purple"
      difficulty="advanced"
      lessons={LESSONS}
      prerequisiteText="Intermediate Path completion recommended before starting advanced topics."
    />
  )
}

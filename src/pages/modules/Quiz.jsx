import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, XCircle, ArrowRight, RefreshCcw } from 'lucide-react'
import Layout from '../../components/layout/Layout'
import { supabase } from '../../lib/supabase'
import { usePrereqProgress } from '../../hooks/usePrereqProgress'
import clsx from 'clsx'

export default function Quiz() {
  const navigate = useNavigate()
  const { markQuizPassed } = usePrereqProgress()

  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('module_id', 'prereq')

    if (!error && data) {
      // Randomly select 5 questions
      const shuffled = data.sort(() => 0.5 - Math.random())
      setQuestions(shuffled.slice(0, 5))
    }
    setLoading(false)
  }

  const handleSelect = (questionId, option) => {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [questionId]: option }))
  }

  const handleSubmit = () => {
    let currentScore = 0
    questions.forEach(q => {
      if (answers[q.id] === q.correct_option) {
        currentScore++
      }
    })
    setScore(currentScore)
    setSubmitted(true)

    if (currentScore >= 4) {
      markQuizPassed()
    }
  }

  const handleRetake = () => {
    setAnswers({})
    setSubmitted(false)
    setScore(0)
    fetchQuestions() // Shuffle new questions
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    )
  }

  const isPassed = score >= 4

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-8">
        <Link to="/prerequisite" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-500 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Prerequisite Hub
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-black font-head text-slate-900 dark:text-white mb-2">Section Quiz: Prerequisites</h1>
          <p className="text-slate-500 dark:text-slate-400">Answer 5 questions. You need at least 4 correct to unlock the Beginner Module.</p>
        </div>

        <div className="space-y-8">
          {questions.map((q, idx) => {
            const isCorrect = answers[q.id] === q.correct_option
            const isAnswered = !!answers[q.id]

            return (
              <motion.div 
                key={q.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card-glass rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  <span className="text-primary-500 mr-2">{idx + 1}.</span> 
                  {q.question}
                </h3>
                <div className="space-y-3">
                  {q.options.map((opt, i) => {
                    const isSelected = answers[q.id] === opt
                    const showCorrect = submitted && opt === q.correct_option
                    const showWrong = submitted && isSelected && opt !== q.correct_option

                    return (
                      <button
                        key={i}
                        onClick={() => handleSelect(q.id, opt)}
                        disabled={submitted}
                        className={clsx(
                          "w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all",
                          !submitted && isSelected && "border-primary-500 bg-primary-500/10 text-primary-700 dark:text-primary-300",
                          !submitted && !isSelected && "border-slate-200 dark:border-white/10 hover:border-primary-500/50 hover:bg-slate-50 dark:hover:bg-white/5",
                          showCorrect && "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
                          showWrong && "border-red-500 bg-red-500/10 text-red-700 dark:text-red-300",
                          submitted && !showCorrect && !showWrong && "border-slate-200 dark:border-white/5 opacity-50"
                        )}
                      >
                        <span className={clsx("font-medium", submitted && !showCorrect && !showWrong && "text-slate-500")}>
                          {opt}
                        </span>
                        {showCorrect && <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />}
                        {showWrong && <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>

        {!submitted ? (
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < questions.length}
              className="btn-primary py-3 px-8 text-lg w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Quiz
            </button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={clsx(
              "mt-10 p-8 rounded-2xl border text-center",
              isPassed ? "bg-emerald-500/10 border-emerald-500/30" : "bg-red-500/10 border-red-500/30"
            )}
          >
            <h2 className={clsx("text-3xl font-black mb-2", isPassed ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400")}>
              {score} / {questions.length}
            </h2>
            <p className="text-slate-700 dark:text-slate-300 font-medium mb-6">
              {isPassed ? "Awesome! You passed the prerequisite section!" : "You didn't quite make the cut. Review your mistakes and try again!"}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={handleRetake} className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium border border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                <RefreshCcw className="w-4 h-4" /> Retake Quiz
              </button>
              {isPassed && (
                <button onClick={() => navigate('/beginner')} className="flex items-center gap-2 btn-primary py-2.5 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 border-0 text-white shadow-emerald-500/25">
                  Continue to Beginner <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  )
}

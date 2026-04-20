import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter:   { opacity: 1, y: 0,  transition: { duration: 0.35, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2 } },
}

export default function Layout({ children, fullWidth = false }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-navy-900 transition-colors duration-300">
      <Navbar />
      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className={`flex-1 ${fullWidth ? '' : 'page-container py-8'}`}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  )
}

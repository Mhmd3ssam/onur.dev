import { motion } from 'framer-motion'

// --- Others
import { MAX_WIDTH } from 'lib/constants'

const easing = [0.175, 0.85, 0.42, 0.96]

const vars = {
  exit: { y: 10, opacity: 0, transition: { duration: 0.2, ease: easing } },
  enter: { y: 0, opacity: 1, transition: { duration: 0.2, ease: easing } }
}

const Layout = ({ children, ...others }) => (
  <main
    className="flex-1 my-12 md:my-24 overflow-hidden"
    style={{ paddingLeft: 'env(safe-area-inset-left)', paddingRight: 'env(safe-area-inset-right)' }}
    {...others}
  >
    <motion.div initial="exit" animate="enter" exit="exit" variants={vars}>
      <div className="px-4 sm:px-6 md:px-16 mx-auto" style={{ maxWidth: MAX_WIDTH }}>
        {children}
      </div>
    </motion.div>
  </main>
)

export default Layout

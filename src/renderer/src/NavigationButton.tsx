/* eslint-disable prettier/prettier */
import { Link, useLocation } from 'react-router-dom'

const NavigationButton = () => {
  const location = useLocation()

  if (location.pathname === '/todo') {
    return null
  }

  return (
    <footer className="fixed bottom-0 right-0 m-4">
      <Link
        to="/todo"
        className="text-white/70 text-lg font-light hover:text-white/90 transition-colors"
      >
        T
      </Link>
    </footer>
  )
}

export default NavigationButton

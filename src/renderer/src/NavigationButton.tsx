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
        className="bg-slate-500 text-white rounded-lg px-4 py-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Go to To-Do List
      </Link>
    </footer>
  )
}

export default NavigationButton

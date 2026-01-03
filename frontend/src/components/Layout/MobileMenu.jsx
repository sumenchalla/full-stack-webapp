import React from 'react'
import { NavLink } from 'react-router-dom'
import { HiXMark } from 'react-icons/hi2'

const navLinks = [
  { to: 'collections/all?gender=Men', label: 'Men' },
  { to: 'collections/all?gender=Women', label: 'Women' },
  { to: 'collections/all?category=Top Wear', label: 'Top Wear' },
  { to: 'collections/all?category=Bottom Wear', label: 'Bottom Wear' },
]

const MobileMenu = ({ open, onClose }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black opacity-40" onClick={onClose} />
      <aside className="relative ml-auto w-72 bg-white h-full shadow-xl p-6">
        <button className="absolute top-4 right-4" onClick={onClose} aria-label="Close menu">
          <HiXMark className='h-6 w-6 text-gray-700' />
        </button>
        <nav className="mt-8 space-y-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block text-sm font-medium uppercase ${isActive ? 'text-black' : 'text-gray-700 hover:text-black'}`
              }
              onClick={onClose}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </div>
  )
}

export default MobileMenu

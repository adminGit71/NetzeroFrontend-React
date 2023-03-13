import React, { useMemo, useState } from 'react'
import { Button, IconButton } from '@material-tailwind/react'
import { Icon } from '@iconify/react'
import { Link, useLocation } from 'react-router-dom';
import useMobileMenu from '../../hooks/useMobileMenu';

/* -------------------------------------------------------------------- */

interface INavLink {
  id: number;
  label: string;
  to: string;
}

/* -------------------------------------------------------------------- */

const NAV_LINKS: Array<INavLink> = [
  {
    id: 1,
    label: 'Token Issuance',
    to: '/token-issuance'
  },
  {
    id: 2,
    label: 'Offset Project',
    to: '/offset-project'
  }
]

/* -------------------------------------------------------------------- */

export default function Navbar() {
  const { pathname } = useLocation()
  const { openMenu, closeMenu, opened } = useMobileMenu()

  const [isShadow, setIsShadow] = useState<boolean>(false)

  const icon = useMemo<string>(() => {
    if (opened) {
      return 'akar-icons:cross'
    } else {
      return 'material-symbols:menu-rounded'
    }
  }, [opened])

  const navbarBgClassName = useMemo(() => {
    if (pathname === '/') {
      return 'bg-gradient-to-t from-[#11909d] to-blue-900'
    } else {
      return 'bg-gradient-to-t from-[#11909d] to-blue-900'
    }
  }, [pathname])

  const toggleMobileMenu = () => {
    if (opened) {
      return closeMenu()
    } else {
      return openMenu()
    }
  }

  const toggleShadow = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 100) {
      setIsShadow(true)
    } else if (scrolled <= 100) {
      setIsShadow(false)
    }
  }

  window.addEventListener('scroll', toggleShadow);

  return (
    <div className="sticky top-0 z-20">
      <div className={`relative ${isShadow ? 'shadow-2xl' : ''}`}>
        <div className={`relative px-6 py-4 z-20 ${navbarBgClassName}`}>
          <div className="container max-w-6xl mx-auto">
            <div className="flex justify-between items-center md:items-end">
              <Link to="/">
                <img src="vite.svg" alt="Logo" className="w-12" />
              </Link>

              {/* For Desktop */}
              <div className="hidden lg:flex gap-1">
                {NAV_LINKS.map(navLink => (
                  <Button key={navLink.id} variant="text" className="text-white text-base normal-case">
                    <Link to={navLink.to}>
                      {navLink.label}
                    </Link>
                  </Button>
                ))}
              </div>

              {/* For Mobile */}
              <IconButton
                variant="text"
                className="text-3xl flex lg:hidden text-white"
                onClick={toggleMobileMenu}
              >
                <Icon icon={icon} />
              </IconButton>

              <Button
                className="hidden lg:flex bg-secondary hover:bg-secondary text-black text-sm normal-case"
              >
                <Link to="/login">
                  Log in
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {opened && (
          <div className={`absolute w-full flex lg:hidden flex-col items-center backdrop-blur-2xl px-4 py-4 ${isShadow && 'shadow-2xl'} ${navbarBgClassName}`}>
            {NAV_LINKS.map(navLink => (
              <Button key={navLink.id} variant="text" className="text-white text-sm normal-case">
                <Link to={navLink.to}>{navLink.label}</Link>
              </Button>
            ))}
            <div className="h-0.5 bg-white bg-opacity-25 w-full my-4" />
            <Button
              className="bg-secondary hover:bg-secondary text-black text-sm normal-case"
            >
              <Link to="/login">
                Login
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
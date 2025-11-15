import { useState, useEffect } from 'react'

export default function MinimalThemeSwitcher() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'day'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'day') {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', theme)
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const cycleTheme = () => {
    const themes = ['day', 'evening', 'night']
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const icons = {
    day: 'sun.png',
    evening: 'evening.png',
    night: 'moon.png',
  }

  return (
    <button
      onClick={cycleTheme}
      className="bg-surface/40 hocus:scale-110 border-neutral/30 z-50 flex size-14 items-center justify-center rounded-full border text-3xl shadow-lg backdrop-blur-md transition-all duration-200 hover:shadow-xl"
      title="Сменить тему"
    >
      <img
        className="size-2/3"
        src={`assets/images/themeSwitch/${icons[theme]}`}
        alt=""
        aria-hidden
      />
    </button>
  )
}

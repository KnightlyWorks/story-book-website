import HideWhenActiveButton from './settingComponents/hideWhenActive.jsx'
import ThemeSwitcher from './settingComponents/themeSwitcher.jsx'
import clsx from 'clsx'

import { useState } from 'react'

export default function SettingsMenu() {
  const [isOpen, setOpen] = useState(false)
  if (!isOpen) {
    return (
      <article className="fixed top-4 right-4 z-100">
        <button
          aria-label="Settings"
          aria-controls="settings-menu"
          onClick={() => setOpen(value => !value)}
          style={{ animationDuration: '2.5s' }}
          className="hocus:scale-150 hocus:animate-spin size-10 transition-all duration-500"
        >
          <img src="assets/images/settingsMenu/settings.png" />
        </button>

        <div
          aria-expanded={isOpen}
          id="settings-menu"
          className="sr-only"
        ></div>
      </article>
    )
  } else {
    return (
      <article className="fixed top-4 right-4 z-100 flex flex-col gap-4">
        <button
          aria-label="Settings"
          aria-controls="settings-menu"
          onClick={() => setOpen(value => !value)}
          title="Настройки"
          className="size-16"
        >
          <img src="assets/images/settingsMenu/settings.png" />
        </button>

        <div
          aria-expanded={isOpen}
          id="settings-menu"
          className="flex flex-col gap-4"
        >
          <ThemeSwitcher />
          <HideWhenActiveButton />
        </div>
      </article>
    )
  }
}

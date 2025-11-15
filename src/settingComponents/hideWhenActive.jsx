import { useState, useEffect } from 'react'

export default function HideWhenActiveButton() {
  const [isHidden, setHidden] = useState(false)

  const iconTypes = active => {
    return active
      ? '/assets/images/hideWhenActive/book-magic-border-allowed.png'
      : 'assets/images/hideWhenActive/book-magic-border-blocked.png'
  }

  const handleChange = event => {
    setHidden(event.target.checked)
  }

  useEffect(() => {
    const root = document.documentElement
    if (!isHidden) {
      root.removeAttribute('data-isHidden')
    } else {
      root.setAttribute('data-isHidden', 'hide')
    }
    localStorage.setItem('isHidden', isHidden)
  }, [isHidden])
  return (
    <div className="group relative w-fit">
      <label htmlFor="hideButton" className="sr-only">
        Hide all elements that may interfere with reading.
      </label>
      <input
        checked={isHidden}
        onChange={handleChange}
        id="hideButton"
        type="checkbox"
        className="bg-surface/40 group-hocus:scale-105 group-hocus:shadow-2xl relative size-14 appearance-none rounded-full after:absolute after:top-full after:-left-1/2 after:mt-2 after:-translate-x-1/2 after:rounded-xl after:bg-white after:px-3 after:py-1 after:text-xs after:whitespace-nowrap after:opacity-0 after:transition-opacity after:duration-200 after:content-['Hide_all_elements_that_may_interfere_with_reading.'] hover:after:opacity-100"
      />
      <img
        className="group-hocus:scale-105 pointer-events-none absolute top-1/2 left-1/2 w-3/5 -translate-x-1/2 -translate-y-1/2 transition-normal duration-500"
        aria-hidden
        src={iconTypes(isHidden)}
      />
    </div>
  )
}

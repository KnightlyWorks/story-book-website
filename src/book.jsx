import './App.css'

import { useState } from 'react'
import clsx from 'clsx'
import Page from './Page'
import SettingsMenu from './settings-menu'

export default function Book({ pagesData = [] }) {
  const [currentPage, setCurrentPage] = useState(0)

  const [animationKey, setAnimationKey] = useState(0) // for re-rendering by react

  const nextPage = () => {
    const isMobile = window.innerWidth < 640
    const step = isMobile ? 1 : 2
    const maxPage = pagesData.length - 1

    setCurrentPage(prev => {
      const newPage = Math.min(maxPage, prev + step)
      if (newPage !== prev) setAnimationKey(k => k + 1)
      return newPage
    })
  }

  const prevPage = () => {
    const isMobile = window.innerWidth < 640
    const step = isMobile ? 1 : 2

    setCurrentPage(prev => {
      const newPage = Math.max(0, prev - step)
      if (newPage !== prev) setAnimationKey(k => k + 1)
      return newPage
    })
  }

  const isMobile = window.innerWidth < 640

  return (
    <article className="relative mx-auto h-fit w-full max-w-4xl">
      {/* bg-container */}
      <div className="relative block aspect-574/816 w-full bg-[url('/assets/images/book-magic-mobile.png')] bg-contain bg-center bg-no-repeat sm:aspect-1131/816 sm:bg-[url('/assets/images/book-magic.png')]">
        <div>
          <SettingsMenu />
        </div>
        {/* pages content */}
        <div className="absolute inset-0 grid h-full gap-[3%] pt-[18%] pr-[20%] pb-[16%] pl-5 sm:grid-cols-2 sm:px-[11%] sm:pt-[8%] sm:pb-[12%]">
          {isMobile ? (
            <>
              <Page pageData={pagesData[currentPage]} />
              <NumerComponent position="right" index={currentPage} />
            </>
          ) : (
            <>
              {/* Border of book */}
              <div
                className="hide-when-active absolute z-20 aspect-574/816 w-full bg-contain bg-center bg-no-repeat sm:aspect-1131/816 sm:bg-[url('/assets/images/book-magic-border.png')]"
                style={{ pointerEvents: 'none' }}
              />
              <div className="relative flex-1 pr-4">
                <Page
                  key={`left-${animationKey}`} // key for re-render
                  pageData={pagesData[currentPage]}
                  animationDirection="left"
                />
                <NumerComponent
                  position="left"
                  index={currentPage}
                  animationDirection="left"
                />
              </div>
              <div className="relative flex-1 pl-4">
                <Page
                  key={`right-${animationKey}`} // key for re-render
                  pageData={pagesData[currentPage + 1]}
                  animationDirection="right"
                />
                <NumerComponent position="right" index={currentPage + 1} />
              </div>
            </>
          )}
        </div>

        <Navigation nextPageFunction={nextPage} prevPageFunction={prevPage} />
      </div>
    </article>
  )
}

function NumerComponent({ position, index }) {
  const positions = {
    right: 'right-5 bottom-2',
    left: 'left-5 bottom-2',
  }

  return (
    <span className={clsx('font-lighr absolute', positions[position])}>
      {index}
    </span>
  )
}

function Navigation({ nextPageFunction, prevPageFunction = 1 }) {
  return (
    <nav className="absolute bottom-4 z-40 flex h-fit w-full items-center justify-between px-6 sm:bottom-8 sm:px-10">
      <button
        className="size-10"
        aria-label="previous page"
        onClick={() => prevPageFunction()}
      >
        <img src="/assets/images/arrow.svg" alt="" />
      </button>

      <button
        className="size-10 -scale-x-100"
        aria-label="next page"
        onClick={() => nextPageFunction()}
      >
        <img src="/assets/images/arrow.svg" alt="" />
      </button>
    </nav>
  )
}

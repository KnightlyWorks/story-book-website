import './App.css'

import { useState } from 'react'
import clsx from 'clsx'

export default function Book({ pagesData = [] }) {
  const [currentPage, setCurrentPage] = useState(0)
  console.log(currentPage)

  const nextPage = () => {
    const isMobile = window.innerWidth < 640
    setCurrentPage(prev => {
      if (isMobile) {
        return prev < pagesData.length - 1 ? prev + 1 : prev
      } else {
        // если осталась только последняя страница, прибавляем 1
        return prev + 2 < pagesData.length ? prev + 2 : pagesData.length - 1
      }
    })
  }

  const prevPage = () => {
    const isMobile = window.innerWidth < 640
    setCurrentPage(prev => {
      if (isMobile) {
        return prev > 0 ? prev - 1 : 0
      } else {
        return prev - 2 >= 0 ? prev - 2 : 0
      }
    })
  }

  const isMobile = window.innerWidth < 640

  return (
    <article className="relative mx-auto w-full max-w-4xl">
      {/* bg-container */}
      <div className="relative aspect-[479/743] w-full bg-[url('assets/images/book-mobile.png')] bg-contain bg-center bg-no-repeat sm:aspect-[1001/770] sm:bg-[url('assets/images/book.png')]">
        {/* pages content */}
        <div className="absolute inset-0 grid h-full gap-[2%] pt-[30%] pr-[20%] pb-[15%] pl-6 sm:grid-cols-2 sm:px-[13%] sm:pt-[15%] sm:pb-[9%]">
          {isMobile ? (
            <Page pageData={pagesData[currentPage]} />
          ) : (
            <>
              <div className="flex-1 pr-4">
                <Page pageData={pagesData[currentPage]} />
              </div>
              <div className="flex-1 pl-4">
                <Page pageData={pagesData[currentPage + 1]} />
              </div>
            </>
          )}
        </div>

        {/* Навигация */}
        <Navigation
          nextPageFunction={nextPage}
          prevPageFunction={prevPage}
          currentPage={currentPage}
        />
      </div>
    </article>
  )
}

function Navigation({ nextPageFunction, prevPageFunction, currentPage = 1 }) {
  return (
    <nav className="absolute bottom-4 z-20 flex h-fit w-full items-center justify-between px-6 sm:bottom-8 sm:px-10">
      <button
        className="size-10"
        aria-label="previous page"
        onClick={() => prevPageFunction()}
      >
        <img src="assets/images/arrow.svg" alt="" />
      </button>

      <button
        className="size-10 -scale-x-100"
        aria-label="next page"
        onClick={() => nextPageFunction()}
      >
        <img src="assets/images/arrow.svg" alt="" />
      </button>
    </nav>
  )
}

function Page({ pageData }) {
  if (!pageData) {
    return (
      <section className="dark-page-energy h-full overflow-hidden">
        <TextBlock
          text={
            'Конец? Какое наивное предположение. Книга лишь ждёт новых записей...Ты дошёл до края. Теперь книга начнёт читать тебя.'
          }
        />
      </section>
    )
  }

  const elements = pageData.elements.map((element, index) => {
    switch (element.layout) {
      case 'text-block':
        return (
          <TextBlock
            key={index}
            style={element.props.style}
            text={element.props.text}
          />
        )
      case 'image-text':
        return (
          <ImageTextLayout
            key={index}
            imagePosition={element.props.imagePosition}
            text={element.props.text}
            imageSrc={element.props.imageSrc}
          />
        )
      case 'quote':
        return (
          <Quote
            key={index}
            text={element.props.text}
            character={element.props.character}
          />
        )
      case 'icon-caption':
        return (
          <IconCaptionLayout
            key={index}
            iconSrc={element.props.iconSrc}
            title={element.props.title}
            description={element.props.description}
            iconType={element.props.iconType}
          />
        )
      case 'ddivider':
        return <Divider key={index} />
      default:
        return null
    }
  })

  return (
    <section className="dark-page-energy h-full overflow-hidden">
      {elements}
    </section>
  )
}

//Page components
function TextBlock({ style, text }) {
  //map of variants
  const variants = {
    normal: 'text-ink',
    observer: 'text-ink italic opacity-80',
    demonThoughts: 'text-dried-blood',
    quote: 'border-l-2 border-blood pl-4 italic',
    ominous: 'text-red-900 text-center font-bold tracking-wide',
  }

  return <p className={clsx('', variants[style])}>{text}</p>
}

function Quote({ text, character, accentColorType = 'normal' }) {
  const variants = {
    normal: 'border-ink',
  }
  return (
    <figure className={clsx('', variants[accentColorType])}>
      <blockquote>{text}</blockquote>
      <p>{character}</p>
    </figure>
  )
}

//can be left or right
function ImageTextLayout({ imagePosition = 'left', imageSrc, text }) {
  return (
    <section
      className={clsx('flex flex-col gap-4 sm:flex-row', {
        'sm:flex-row-reverse!': imagePosition === 'right',
      })}
    >
      <img alt="text" src={imageSrc} />
      <p>{text}</p>
    </section>
  )
}

//WIP
function IconCaptionLayout({ iconSrc, title, description, iconType }) {
  return <></>
}

function Divider() {
  //Random for now
  const variants = ['blood-diveder-128x128.png', 'ink-diveder-128x128.png']
  const random = variants[Math.floor(Math.random() * variants.length)]

  return (
    <img
      className="size-20 sm:size-40"
      src={`assets/images/dividers/${random}`}
    />
  )
}

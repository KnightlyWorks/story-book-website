import './App.css'

import { useState, useMemo } from 'react'
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
    <article className="relative mx-auto h-fit w-full max-w-4xl">
      {/* bg-container */}
      <div className="relative block aspect-574/816 w-full bg-[url('/assets/images/book-magic-mobile.png')] bg-contain bg-center bg-no-repeat sm:aspect-1131/816 sm:bg-[url('/assets/images/book-magic.png')]">
        {/* pages content */}
        <div className="absolute inset-0 grid h-full gap-[3%] pt-[18%] pr-[20%] pb-[16%] pl-5 sm:grid-cols-2 sm:px-[11%] sm:pt-[8%] sm:pb-[12%]">
          {isMobile ? (
            <Page pageData={pagesData[currentPage]} />
          ) : (
            <>
              {/* Border of book */}
              <div
                className="absolute z-30 aspect-574/816 w-full bg-contain bg-center bg-no-repeat sm:aspect-1131/816 sm:bg-[url('/assets/images/book-magic-border.png')]"
                style={{ pointerEvents: 'none' }}
              />
              <div className="relative flex-1 pr-4">
                <Page pageData={pagesData[currentPage]} />
                <NumerComponent position="left" index={currentPage} />
              </div>
              <div className="relative flex-1 pl-4">
                <Page pageData={pagesData[currentPage + 1]} />
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

function Page({ pageData }) {
  if (!pageData) {
    return (
      <section className="light-page-flow overflow-x-visible">
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
      case 'divider':
        return <Divider key={index} />
      case 'random-dividers':
        return <RandomDividerLine />
      default:
        return null
    }
  })

  return (
    <section className="light-page-flow flex h-full flex-col gap-5 md:gap-10">
      {elements}
    </section>
  )
}

function NumerComponent({ position, index }) {
  const positions = {
    right: 'right-5 bottom-2',
    left: 'left-5 bottom-2',
  }

  return (
    <span
      className={clsx(
        'font-lighr from-sky-blue to-mint-green absolute bg-linear-240 bg-clip-text',
        positions[position]
      )}
    >
      {index}
    </span>
  )
}

//pages styles
const TEXT_STYLES = {
  // Standard text style for general content
  normal: 'text-ink',

  // Style for diary entries (italic, blue text with a subtle shadow)
  diary: 'text-ocean-blue italic text-shadow-ink text-shadow-2xs',

  // Style for bold, attention-grabbing commentary (green with a bright shadow)
  sass: 'text-emerald-green text-shadow-2xs text-shadow-mint-green font-bold',

  // Style for observations (seafoam green, italic, slightly transparent, with a soft shadow)
  observation:
    'text-seafoam-green italic opacity-90 text-shadow-sm text-shadow-ink',

  // Style for important notes (sky blue text, emphasized with a bright left border and padding)
  important: 'text-sky-blue border-l-2 border-sky-blue pl-4',
}

const QUOTE_STYLES = {
  // Standard style for quotes (defines border color)
  normal: 'border-ink',
}

const ICON_STYLES = {
  // Style for items (medium size, rounded square, subtle seafoam green background)
  item: 'size-16 rounded-lg bg-seafoam-green/20 p-2',

  // Style for locations (larger size, rounded circle, subtle ocean blue background)
  location: 'size-20 rounded-full bg-ocean-blue/20 p-3',

  // Style for characters (large size, rounded rectangle, subtle emerald green background)
  character: 'size-24 rounded-xl bg-emerald-green/20 p-4',

  // Style for warnings (medium size, rounded square, sky blue background, with a pulse animation)
  warning: 'size-16 rounded-lg bg-sky-blue/30 p-2 animate-pulse',
}

// Page components
function TextBlock({ style, text }) {
  return (
    <p
      className={clsx(
        'hocus:-translate-y-2 hocus:shadow-xl px-1 indent-8 transition-normal duration-200',
        TEXT_STYLES[style]
      )}
    >
      {text}
    </p>
  )
}

function Quote({ text, character, accentColorType = 'normal' }) {
  return (
    <figure
      className={clsx(
        'm-1 rounded-sm rounded-tl-lg rounded-br-lg border px-2 py-1',
        QUOTE_STYLES[accentColorType]
      )}
    >
      <blockquote>{text}</blockquote>
      <p>{character}</p>
    </figure>
  )
}

function ImageTextLayout({ imagePosition, imageSrc, text }) {
  const positions = {
    right: 'flex-row',
    left: 'flex-row-reverse',
  }
  return (
    <section className={clsx('flex md:gap-4', positions.imagePosition)}>
      <img
        className="hocus:scale-110 hocus:animate-scale-pulse elative max-h-12 max-w-12 basis-1/4 transition-normal duration-200"
        alt=""
        src={imageSrc}
      />
      <p className="hocus:shadow-xl hocus:-translate-y-1 transition-normal duration-200">
        {text}
      </p>
    </section>
  )
}

function IconCaptionLayout({ iconSrc, title, description, iconType = 'item' }) {
  return (
    <div className="group my-4 flex items-start gap-4">
      <div className={clsx('shrink-0', ICON_STYLES[iconType])}>
        <img
          src={iconSrc}
          alt={title}
          className="group-hocus:animate-scale-pulse hocus:shadow-none h-full w-full object-contain"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-ocean-blue mb-1 text-lg font-bold transition-all duration-75 group-hover:text-shadow-xs">
          {title}
        </h3>
        <p className="text-ink text-sm opacity-80">{description}</p>
      </div>
    </div>
  )
}

function Divider() {
  const DIVIDER_VARIANTS = [
    'divider_bone.png',
    'divider_key.png',
    'divider_knife.png',
    'divider_nail.png',
    'divider_needle.png',
    'divider_quill.png',
    'divider_thorn.png',
  ]

  const randomDivider =
    DIVIDER_VARIANTS[Math.floor(Math.random() * DIVIDER_VARIANTS.length)]
  const randomSeconds = Math.random() + 0.5

  return (
    <img
      className="group-hocus:animate-wiggle size-5 sm:size-10"
      style={{ animationDuration: `${randomSeconds}s` }}
      src={`/assets/images/dividers/${randomDivider}`}
      alt="divider"
    />
  )
}

function RandomDividerLine() {
  const count = Math.floor(Math.random() * 4) + 2

  const dividers = Array.from({ length: count }, (_, i) => <Divider key={i} />)

  return (
    <div className="group flex items-center justify-center space-x-2 py-4 sm:space-x-4">
      {dividers}
    </div>
  )
}

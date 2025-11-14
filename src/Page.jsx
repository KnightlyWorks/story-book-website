import clsx from 'clsx'

export default function Page({ pageData, animationDirection }) {
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
        return <RandomDividerLine key={index} />
      default:
        return null
    }
  })

  const animateType = () => {
    const animationVariants = {
      none: 'animate-none',
      left: 'animate-fade-in-left',
      right: 'animate-fade-in-right',
    }

    if (!animationDirection) {
      return animationVariants.none
    }

    return animationVariants[animationDirection] || animationVariants.none
  }

  return (
    <section
      className={clsx(
        'light-page-flow flex h-full flex-col gap-5 md:gap-10',
        animateType()
      )}
    >
      {elements}
    </section>
  )
}

const TEXT_STYLES = {
  // Normal text
  normal: 'text-base',

  // Diary entries (italic, primary color)
  diary: 'text-primary italic text-shadow-base text-shadow-2xs',

  // Sassy comments (bold, secondary accent)
  sass: 'text-secondary text-shadow-2xs text-shadow-secondary-light font-bold',

  // Observations (accent color, italic)
  observation:
    'text-accent italic opacity-90 text-shadow-xs text-shadow-sm text-shadow-base',

  // Important notes (light primary color)
  important: 'text-primary-light border-l-2 border-primary-light pl-4',
}

const QUOTE_STYLES = {
  // Normal (or default)
  normal: 'border-base',
}

const ICON_STYLES = {
  item: 'size-16 rounded-lg bg-accent/20 p-2',
  location: 'size-20 rounded-full bg-primary/20 p-3',
  character: 'size-24 rounded-xl bg-secondary/20 p-4',
  warning: 'size-16 rounded-lg bg-primary-light/30 p-2 animate-pulse',
}

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
    <section className={clsx('flex md:gap-4', positions[imagePosition])}>
      <img
        className="hocus:scale-110 hocus:animate-scale-pulse relative max-h-12 max-w-12 basis-1/4 transition-normal duration-200"
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
        <h3 className="text-primary mb-1 text-lg font-bold transition-all duration-75 group-hover:text-shadow-xs">
          {title}
        </h3>
        <p className="text-base text-sm opacity-80">{description}</p>
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

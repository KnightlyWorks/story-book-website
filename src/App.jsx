import './App.css'
import Book from './book'
import clsx from 'clsx'

const mockData = {
  book_meta: {
    title: 'Демоническая Книга',
    subtitle: 'Том I: Начало Ужаса',
  },
  pages: [
    {
      id: 'page-002',
      date: '25.10.1487',
      elements: [
        {
          layout: 'text-block',
          props: {
            text: 'Тщеславие, вот их истинное проклятие. Они верят, что смогут обмануть тень. Глупцы. Вечность длится слишком долго, чтобы наблюдать за этой комедией.',
            style: 'observer-thoughts',
          },
        },
        {
          layout: 'image-text',
          props: {
            imageSrc: 'assets/art/dark_hall.png',
            text: 'После двух часов блуждания по темным катакомбам, они наконец нашли зал, где, по слухам, спрятан артефакт. Свет факелов не может прогнать это древнее зло.',
            imagePosition: 'right',
          },
        },
        {
          layout: 'quote',
          props: {
            text: '«Мне кажется, я слышу шепот. Это не крысы. Это что-то... другое.»',
            character: 'Рейнджер Элиас',
            style: 'character-quote',
            accentColor: '#4A6D3A',
          },
        },
        {
          layout: 'icon-caption',
          props: {
            iconSrc: 'assets/icon/altar.png',
            title: 'Алтарь Забвения',
            description:
              'Центральная точка зала. В камне высечены непонятные руны. Прикосновение обжигает.',
          },
        },
        {
          layout: 'divider',
        },
      ],
    },

    // === Новая страница ===
    {
      id: 'page-003',
      date: '26.10.1487',
      elements: [
        {
          layout: 'image-text',
          props: {
            imageSrc: 'assets/art/underground_gate.png',
            text: 'За алтарём обнаружился скрытый проход. Ведёт вниз, туда, где воздух тяжелеет, а стены словно дышат. Каждый шаг отзывался гулом, будто глубины знали, что к ним идут гости.',
            imagePosition: 'left',
          },
        },
        {
          layout: 'quote',
          props: {
            text: '«Если мы войдём туда — пути назад не будет. Но разве кто-то из нас пришёл за возвращением?»',
            character: 'Магистр Кернан',
            style: 'character-quote',
            accentColor: '#6D3A3A',
          },
        },
        {
          layout: 'text-block',
          props: {
            text: 'Где-то вдалеке слышался звон цепей. Возможно, это был ветер. Возможно — нет.',
            style: 'narration',
          },
        },
      ],
    },

    // === Ещё одна страница ===
    {
      id: 'page-004',
      date: '27.10.1487',
      elements: [
        {
          layout: 'text-block',
          props: {
            text: 'Путники достигли зала с мозаикой, изображающей падение города. На ней — лица тех, кто пытался остановить зло, и тех, кто его создал. Все одинаково безмолвны.',
            style: 'observer-thoughts',
          },
        },
        {
          layout: 'image-text',
          props: {
            imageSrc: 'assets/art/fallen_mosaic.png',
            text: 'Камни под ногами источали слабое тепло. Казалось, сама земля помнила шаги древних.',
            imagePosition: 'right',
          },
        },
        {
          layout: 'icon-caption',
          props: {
            iconSrc: 'assets/icon/mask.png',
            title: 'Маска Безымянного',
            description:
              'Говорят, тот, кто наденет её, услышит голоса всех, кого заточили в этом месте. Никто не осмелился проверить.',
          },
        },
        {
          layout: 'divider',
        },
      ],
    },
  ],
}

export default function App() {
  return (
    <div className="relative h-screen w-screen bg-black">
      {/*Bloody backblur */}
      <div className="from-ink/40 to-dried-blood/60 absolute inset-0 bg-linear-60 opacity-80 backdrop-blur-xl"></div>
      {/*Main table */}
      <div className="mx-auto flex h-screen max-h-[1000px] w-full max-w-[1400px] flex-col items-center justify-center bg-[url(assets/images/main-background.png)] bg-cover bg-no-repeat">
        <Book pagesData={mockData['pages']} />
      </div>
    </div>
  )
}

import './App.css'
import Book from './book'
import clsx from 'clsx'
import { useState, useEffect } from 'react'

export default function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  if (!data) return <div className="text-white">Загрузка...</div>

  return (
    <div className="relative h-screen w-screen bg-black">
      {/*Bloody backblur */}
      <div className="from-ink/40 to-dried-blood/60 absolute inset-0 bg-linear-60 opacity-80 backdrop-blur-xl"></div>
      {/*Main table */}
      <div className="mx-auto flex h-screen max-h-[1000px] w-full max-w-[1400px] flex-col items-center justify-center bg-[url(assets/images/main-background.png)] bg-cover bg-no-repeat">
        <Book pagesData={data.pages} />
      </div>
    </div>
  )
}

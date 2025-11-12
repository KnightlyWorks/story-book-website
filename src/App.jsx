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
    <div className="relative bg-black">
      {/*Main table */}
      <div className="relative mx-auto flex min-h-screen flex-col items-center justify-center bg-[url(assets/images/mainBackground.png)] bg-cover bg-bottom bg-no-repeat">
        {/*Backblur effect */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <Book pagesData={data.pages} />
      </div>
    </div>
  )
}

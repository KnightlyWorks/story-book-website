import './App.css'
import Book from './book'

import bookData from '/data.json'

export default function App() {
  return (
    <div className="relative bg-black">
      {/*Main table */}
      <div className="relative mx-auto flex min-h-screen flex-col items-center justify-center bg-[url(/assets/images/mainBackground.png)] bg-cover bg-bottom bg-no-repeat">
        {/*Backblur effect */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <Book pagesData={bookData.pages} />
      </div>
    </div>
  )
}

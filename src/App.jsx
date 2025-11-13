import './App.css'
import Book from './book'
import { useState, useEffect } from 'react'
import bookData from '/data.json'

function useAssetsLoader(imageUrls) {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const loadImages = async () => {
      await document.fonts.ready

      const promises = imageUrls.map(url => {
        return new Promise(resolve => {
          const img = new Image()
          img.onload = resolve
          img.onerror = resolve
          img.src = url
        })
      })

      let loaded = 0
      for (const promise of promises) {
        await promise
        loaded++
        const newProgress = Math.round((loaded / imageUrls.length) * 100)
        setProgress(newProgress)
      }

      setLoading(false)
    }

    if (imageUrls.length > 0) {
      loadImages()
    } else {
      setLoading(false)
    }
  }, [imageUrls])

  return { loading, progress }
}

export default function App() {
  const [gifReady, setGifReady] = useState(false)

  useEffect(() => {
    const gif = new Image()
    gif.onload = () => setGifReady(true)
    gif.onerror = () => setGifReady(true)
    gif.src = '/assets/images/loading.gif'
  }, [])

  const allImages = [
    '/assets/images/mainBackground.png',
    ...bookData.pages.flatMap(page =>
      page.elements
        .map(element => {
          if (element.layout === 'image-text') {
            return element.props.imageSrc
          }
          if (element.layout === 'icon-caption') {
            return element.props.iconSrc
          }
          return null
        })
        .filter(Boolean)
    ),
  ]

  const { loading, progress } = useAssetsLoader(allImages)

  const showLoader = !gifReady || loading

  return (
    <>
      {/* loader */}
      <div
        className={`fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black transition-opacity duration-500 ${
          showLoader ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="absolute inset-0 backdrop-blur-md"></div>

        {gifReady && (
          <div className="relative z-10 flex flex-col items-center gap-4">
            <img src="/assets/images/loading.gif" alt="Loading" />

            <div className="text-xl font-bold text-white">{progress}%</div>
          </div>
        )}
      </div>

      {/* content */}
      <div
        className={`relative bg-black transition-opacity duration-500 ${
          showLoader ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="relative mx-auto flex min-h-screen flex-col items-center justify-center bg-[url(/assets/images/mainBackground.png)] bg-cover bg-bottom bg-no-repeat">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <Book pagesData={bookData.pages} />
        </div>
      </div>
    </>
  )
}

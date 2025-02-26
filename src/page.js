"use client"

import "./globals.css"
import { useState, useEffect } from "react"
import Profile from "./components/Profile"
import Links from "./components/Links"
import Header from "./components/Header"
import Footer from "./components/Footer"

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false)

  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault()
      alert("Klik Kanan Detected!\nngapain bang? mau inspect?\n\nfaykal`—")
    }
    document.addEventListener("contextmenu", handleContextMenu)
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
    }
  }, [])

  return (
    <main>
      <div className="grid-bg flex flex-col items-center justify-center px-4 py-20">
        {
          !loadingComplete ? (
            <Loading onLoadComplete={() => setLoadingComplete(true)} />
          ) : (
            <>
              <Header/>
              <Profile/>
              <Links/>
              <Footer/>
            </>
          )
        }
      </div>
    </main>
  )
}
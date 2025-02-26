"use client"
import { useEffect, useState } from 'react'

const Loading = ({ onLoadComplete }) => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const loadData = async () => {
            let progress = 0

            const interval = setInterval(() => {
                if (progress < 90) {
                    progress += Math.random() * 10
                    setProgress(progress)
                }
            }, 200)

            await fetch("/")

            clearInterval(interval)
            setProgress(100)

            setTimeout(() => {
                onLoadComplete()
            }, 500)
        }

        loadData()
    }, [onLoadComplete])

    return (
        <div className="bg-gray-900 text-white">
            <div
                id="loading-bar"
                className="loading-bar"
                style={{ width: `${progress}%` }}>
              </div>
            <div id="spinner" className="spinner"></div>
        </div>
    )
}

export default Loading
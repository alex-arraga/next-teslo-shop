import { titleFont } from "@/config/fonts"
import Image from "next/image"

export function LoadingPage() {
  return (
    <section className="flex h-screen justify-center items-center gap-3">
      <div className="loader" />
      <p className={`${titleFont.className} text-lg xl:text-2xl 2xl:text-3xl font-medium text-white`}>
        Loading
        <span className="inline-block animate-bounce-dot1">.</span>
        <span className="inline-block animate-bounce-dot2">.</span>
        <span className="inline-block animate-bounce-dot3">.</span>
      </p>
    </section>
  )
}

export default LoadingPage
// Adapted from React Bits FadeContent (TS + Tailwind variant):
// https://github.com/DavidHDev/react-bits/tree/main/src/ts-tailwind/Animations/FadeContent
import { useEffect, useRef, type HTMLAttributes, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type FadeContentProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  blur?: boolean
  duration?: number
  delay?: number
  threshold?: number
}

export default function FadeContent({
  children,
  blur = false,
  duration = 900,
  delay = 0,
  threshold = 0.12,
  className = '',
  ...props
}: FadeContentProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(element, { autoAlpha: 1, filter: 'none' })
      return
    }

    gsap.set(element, { autoAlpha: 0, y: 20, filter: blur ? 'blur(10px)' : 'none' })
    const animation = gsap.to(element, {
      autoAlpha: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: duration / 1000,
      delay: delay / 1000,
      ease: 'power2.out',
      paused: true,
    })
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: `top ${(1 - threshold) * 100}%`,
      once: true,
      onEnter: () => animation.play(),
    })

    return () => {
      trigger.kill()
      animation.kill()
    }
  }, [blur, duration, delay, threshold])

  return <div ref={ref} className={className} {...props}>{children}</div>
}

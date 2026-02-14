import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Gallery() {
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const textRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Effect for Background Image
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        y: '20%',
        ease: 'none'
      })

      // Text Reveal
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div id="gallery" ref={containerRef} className="w-full h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background Image with Parallax */}
      <div 
        ref={imageRef}
        className="absolute inset-0 z-0 bg-cover bg-center scale-110"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1624213111452-35e8d3d5cc18?q=70&w=1600&auto=format&fit=crop")',
          filter: 'brightness(0.3) saturate(0)'
        }} 
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_50%,_black_100%)] z-10"></div>

      <div ref={textRef} className="relative z-20 text-center px-4">
        <h2 className="text-red-600 font-bold tracking-[0.5em] text-sm md:text-xl mb-4 uppercase">
          The Legacy
        </h2>
        <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-8 stroke-text-white">
          GALLERY
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
          Witness the evolution of Earth's Mightiest Heroes through the ages. From the first suit to the final sacrifice.
        </p>
        <button className="mt-8 px-12 py-4 border border-white/30 text-white font-bold tracking-widest hover:bg-white hover:text-black transition-all duration-300">
          VIEW ARCHIVE
        </button>
      </div>
    </div>
  )
}

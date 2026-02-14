import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const missions = [
  { id: 1, title: 'Operation: New York', status: 'COMPLETED', desc: 'Defended the city against Chitauri invasion.', danger: 'EXTREME' },
  { id: 2, title: 'Infiltration: Sokovia', status: 'COMPLETED', desc: 'Hydra base neutralized. Scepter recovered.', danger: 'HIGH' },
  { id: 3, title: 'Defense: Wakanda', status: 'COMPLETED', desc: 'Thanos forces repelled. Vision secured (failed).', danger: 'CRITICAL' },
  { id: 4, title: 'Time Heist', status: 'COMPLETED', desc: 'Infinity Stones retrieved from timeline.', danger: 'UNKNOWN' },
  { id: 5, title: 'Secret Invasion', status: 'ACTIVE', desc: 'Skrull operatives detected in high govt.', danger: 'HIGH' },
  { id: 6, title: 'Armor Wars', status: 'PENDING', desc: 'Stark tech falling into wrong hands.', danger: 'SEVERE' },
]

export function Missions() {
  const containerRef = useRef(null)
  const cardsRef = useRef([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div id="missions" ref={containerRef} className="w-full min-h-screen bg-black relative py-24 px-8 md:px-16 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-16 tracking-tighter uppercase">
          Active <span className="text-red-600">Missions</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {missions.map((mission, index) => (
            <div 
              key={mission.id} 
              ref={el => cardsRef.current[index] = el}
              className="group relative bg-white/5 border border-white/10 p-8 rounded-sm hover:bg-white/10 transition-colors duration-300"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-red-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
              
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[10px] font-bold px-2 py-1 rounded bg-white/10 ${mission.status === 'ACTIVE' ? 'text-red-500 animate-pulse' : 'text-gray-400'}`}>
                  {mission.status}
                </span>
                <span className="text-xs text-gray-500 font-mono">ID: {mission.id.toString().padStart(3, '0')}</span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">{mission.title}</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">{mission.desc}</p>
              
              <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-xs text-gray-500 uppercase tracking-widest">Danger Level</span>
                <span className="text-xs font-bold text-white">{mission.danger}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

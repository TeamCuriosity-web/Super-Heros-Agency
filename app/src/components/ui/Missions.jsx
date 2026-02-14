import React, { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const missions = [
  { id: 1, title: 'The Chitauri Invasion', status: 'COMPLETED', desc: 'Secure New York city against the extra-terrestrial threat led by Loki.', danger: 'CRITICAL', color: '#ef4444' },
  { id: 2, title: 'Hydra Research Lab', status: 'ACTIVE', desc: 'Infiltrate the base in Sokovia to recover the Mind Stone Scepter.', danger: 'HIGH', color: '#f59e0b' },
  { id: 3, title: 'Wakanda Defense', status: 'AVAILABLE', desc: 'Defend the golden city from the Outrider swarm during the Infinity War.', danger: 'SEVERE', color: '#10b981' },
  { id: 4, title: 'Quantum Time Heist', status: 'LOCKED', desc: 'Journey through the Quantum Realm to secure the Infinity Stones.', danger: 'UNKNOWN', color: '#6366f1' },
  { id: 5, title: 'Multiverse Breach', status: 'AVAILABLE', desc: 'Close the portals leaking villains from alternate timelines into our own.', danger: 'EXTREME', color: '#ec4899' },
  { id: 6, title: 'Spider-Verse Protocol', status: 'ACTIVE', desc: 'Coordinate with alternate wall-crawlers to stop a universal collapse.', danger: 'CRITICAL', color: '#ef4444' },
]

export function Missions() {
  const containerRef = useRef(null)
  const [selectedMission, setSelectedMission] = useState(null)
  const cardsRef = useRef([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out'
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="missions" ref={containerRef} className="w-full min-h-screen bg-black relative py-24 px-8 md:px-16 overflow-hidden">
      {/* Background Grid/Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <span className="text-red-600 font-mono text-sm tracking-widest uppercase mb-2 block">Tactical Status</span>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
              Heroic <span className="text-transparent border-t-2 border-b-2 border-red-600 px-2" style={{ WebkitTextStroke: '1px white' }}>Missions</span>
            </h2>
          </div>
          <div className="text-right">
            <span className="text-gray-500 font-mono text-sm">UPTIME: 99.9%</span>
            <div className="h-1 w-32 bg-red-600 mt-2 ml-auto"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map((mission, index) => (
            <div 
              key={mission.id} 
              ref={el => cardsRef.current[index] = el}
              onClick={() => setSelectedMission(mission)}
              className={`group relative bg-white/5 border border-white/10 p-8 rounded-sm cursor-pointer transition-all duration-500 overflow-hidden ${selectedMission?.id === mission.id ? 'bg-white/15 border-white/30 scale-[1.02]' : 'hover:bg-white/10'}`}
            >
              {/* Scanline Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent h-[2px] w-full animate-scanline opacity-20"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${mission.status === 'ACTIVE' ? 'bg-green-500 animate-pulse' : mission.status === 'COMPLETED' ? 'bg-blue-500' : 'bg-gray-500'}`}></div>
                  <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">{mission.status}</span>
                </div>
                <span className="text-xs text-gray-600 font-mono">#{mission.id.toString().padStart(3, '0')}</span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors">{mission.title}</h3>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed h-12 overflow-hidden">{mission.desc}</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <div className="flex flex-col">
                  <span className="text-[9px] text-gray-500 uppercase">Danger</span>
                  <span className="text-xs font-bold text-white tracking-wider" style={{ color: mission.color }}>{mission.danger}</span>
                </div>
                <button className="text-[10px] font-black text-white border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-all uppercase tracking-tighter">
                  View Intel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Detail Overlay */}
      {selectedMission && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/90 backdrop-blur-xl">
          <div className="max-w-2xl w-full bg-zinc-900 border border-red-600/30 p-12 relative">
            <button 
              onClick={() => setSelectedMission(null)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >
              [ CLOSE ]
            </button>
            <span className="text-red-600 font-mono text-sm tracking-widest uppercase mb-4 block">Classified Intel</span>
            <h3 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter">{selectedMission.title}</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">{selectedMission.desc}</p>
            
            <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/10 mb-8">
              <div>
                <span className="text-gray-500 text-xs uppercase block mb-1">Status</span>
                <span className="text-white font-bold">{selectedMission.status}</span>
              </div>
              <div>
                <span className="text-gray-500 text-xs uppercase block mb-1">Danger Level</span>
                <span className="font-bold" style={{ color: selectedMission.color }}>{selectedMission.danger}</span>
              </div>
            </div>
            
            <button className="w-full bg-red-600 text-white font-black py-4 hover:bg-red-700 transition-colors uppercase tracking-widest">
              Commence Mission
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

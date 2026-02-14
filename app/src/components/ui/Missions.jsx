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
    <section id="missions" ref={containerRef} className="w-full min-h-screen bg-white relative py-24 px-8 md:px-16 overflow-hidden">
      {/* Background Grid/Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(#000000 0.5px, transparent 0.5px)',
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="max-w-7xl auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <span className="text-red-600 font-mono text-sm tracking-widest uppercase mb-2 block">Tactical Status</span>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              Heroic <span className="text-transparent border-t-2 border-b-2 border-red-600 px-2" style={{ WebkitTextStroke: '1px #0f172a' }}>Missions</span>
            </h2>
          </div>
          <div className="text-right">
            <span className="text-slate-400 font-mono text-sm">UPTIME: 99.9%</span>
            <div className="h-1 w-32 bg-red-600 mt-2 ml-auto"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map((mission, index) => (
            <div 
              key={mission.id} 
              ref={el => cardsRef.current[index] = el}
              onClick={() => setSelectedMission(mission)}
              className={`group relative bg-white border border-slate-100 p-8 rounded-sm cursor-pointer transition-all duration-500 overflow-hidden shadow-sm ${selectedMission?.id === mission.id ? 'bg-white border-red-500/30 scale-[1.02] shadow-2xl' : 'hover:shadow-lg hover:border-slate-200'}`}
            >
              {/* Scanline Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-transparent h-[2px] w-full animate-scanline opacity-10"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${mission.status === 'ACTIVE' ? 'bg-green-500 animate-pulse' : mission.status === 'COMPLETED' ? 'bg-blue-500' : 'bg-slate-200'}`}></div>
                  <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">{mission.status}</span>
                </div>
                <span className="text-xs text-slate-200 font-mono">#{mission.id.toString().padStart(3, '0')}</span>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-red-500 transition-colors uppercase tracking-tight">{mission.title}</h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed h-12 overflow-hidden">{mission.desc}</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-400 uppercase">Danger</span>
                  <span className="text-xs font-bold tracking-wider" style={{ color: mission.color }}>{mission.danger}</span>
                </div>
                <button className="text-[10px] font-black text-slate-900 border border-slate-100 px-4 py-2 hover:bg-slate-900 hover:text-white transition-all uppercase tracking-tighter">
                  View Intel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Detail Overlay */}
      {selectedMission && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-white/60 backdrop-blur-xl">
          <div className="max-w-2xl w-full bg-white border border-slate-100 shadow-2xl p-12 relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedMission(null)}
              className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors font-black text-xs"
            >
              [ CLOSE ]
            </button>
            <span className="text-red-600 font-mono text-sm tracking-widest uppercase mb-4 block">Classified Intel</span>
            <h3 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter">{selectedMission.title}</h3>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">{selectedMission.desc}</p>
            
            <div className="grid grid-cols-2 gap-8 py-8 border-y border-slate-50 mb-8">
              <div>
                <span className="text-slate-400 text-xs uppercase block mb-1">Status</span>
                <span className="text-slate-900 font-bold uppercase">{selectedMission.status}</span>
              </div>
              <div>
                <span className="text-slate-400 text-xs uppercase block mb-1">Danger Level</span>
                <span className="font-bold uppercase" style={{ color: selectedMission.color }}>{selectedMission.danger}</span>
              </div>
            </div>
            
            <button className="w-full bg-red-600 text-white font-black py-4 hover:bg-slate-900 transition-all uppercase tracking-widest">
              Commence Mission
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

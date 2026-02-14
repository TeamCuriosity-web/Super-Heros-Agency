import React, { useState } from 'react'
import { ModelViewer } from '../3d/ModelViewer'
import { motion, AnimatePresence } from 'framer-motion'
import { HulkModel } from '../3d/HulkModel'
import { BatmanModel } from '../3d/BatmanModel'
import { IronManModel } from '../3d/IronManModel'
import { SpiderManModel } from '../3d/SpiderManModel'
import { CaptainAmericaModel } from '../3d/CaptainAmericaModel'
import { ThorModel } from '../3d/ThorModel'

const heroes = [
  {
    id: 'hulk',
    name: 'LEGO',
    name2: 'HULK',
    subtitle: 'The Smallest Giant',
    description: 'Dr. Bruce Banner lives a life caught between the soft-spoken scientist he’s always been and the uncontrollable green brick-monster powered by his rage.',
    stats: { strength: '100/100', speed: 'Mach 4', tech: 'Gamma' },
    theme: 'from-green-600/50 via-black to-black',
    strokeColor: '#16a34a',
    buttonColor: 'bg-green-600 hover:bg-green-700',
    shadowColor: 'shadow-[0_10px_30px_-10px_rgba(22,163,74,0.6)]',
    textColor: 'text-green-500',
    ModelComponent: HulkModel,
    cameraTarget: [0, 0, 0],
    watermark: 'HULK'
  },
  {
    id: 'ironman',
    name: 'LEGO',
    name2: 'STARK',
    subtitle: 'High Tech Bricks',
    description: 'Billionaire. Philanthropist. Master Builder. Tony Stark engineered the ultimate plastic-alloy armor to protect the Multiverse.',
    stats: { strength: '85/100', speed: 'Mach 10', tech: 'Nano-Blocks' },
    theme: 'from-red-600/50 via-black to-black',
    strokeColor: '#dc2626',
    buttonColor: 'bg-red-600 hover:bg-red-700',
    shadowColor: 'shadow-[0_10px_30px_-10px_rgba(220,38,38,0.6)]',
    textColor: 'text-red-500',
    ModelComponent: IronManModel,
    cameraTarget: [0, 0.5, 0],
    watermark: 'STARK'
  },
  {
    id: 'spiderman',
    name: 'LEGO',
    name2: 'SPIDEY',
    subtitle: 'Friendly Neighborhood Brick',
    description: 'Peter Parker was bitten by a radioactive plastic-spider. Now he swings through Gotham City... wait, wrong city. He swings through the brick-jungle!',
    stats: { strength: '75/100', speed: 'Mach 2', tech: 'Web-Grid' },
    theme: 'from-blue-600/50 via-black to-black',
    strokeColor: '#2563eb',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
    shadowColor: 'shadow-[0_10px_30px_-10px_rgba(37,99,235,0.6)]',
    textColor: 'text-blue-500',
    ModelComponent: SpiderManModel,
    cameraTarget: [0, 0.5, 0],
    watermark: 'SPIDEY'
  },
  {
    id: 'cap',
    name: 'LEGO',
    name2: 'CAP',
    subtitle: 'The First Avenger',
    description: 'Enhanced by the Super-Soldier-Stud, Steve Rogers leads the team with a shield that defies the laws of plastic-physics.',
    stats: { strength: '80/100', speed: 'Athlete', tech: 'Vibranium-Stud' },
    theme: 'from-indigo-600/50 via-black to-black',
    strokeColor: '#4f46e5',
    buttonColor: 'bg-indigo-600 hover:bg-indigo-700',
    shadowColor: 'shadow-[0_10px_30px_-10px_rgba(79,70,229,0.6)]',
    textColor: 'text-indigo-500',
    ModelComponent: CaptainAmericaModel,
    cameraTarget: [0, 0.5, 0],
    watermark: 'CAP'
  },
  {
    id: 'thor',
    name: 'LEGO',
    name2: 'THOR',
    subtitle: 'God of Thunder-Bricks',
    description: 'Whosoever holds this hammer, if they be worthy, shall possess the power of the mighty Brick-Odinson.',
    stats: { strength: '95/100', speed: 'Lightning', tech: 'Mjolnir' },
    theme: 'from-amber-600/50 via-black to-black',
    strokeColor: '#d97706',
    buttonColor: 'bg-amber-600 hover:bg-amber-700',
    shadowColor: 'shadow-[0_10px_30px_-10px_rgba(217,119,6,0.6)]',
    textColor: 'text-amber-500',
    ModelComponent: ThorModel,
    cameraTarget: [0, 0.5, 0],
    watermark: 'THOR'
  },
  {
    id: 'batman',
    name: 'LEGO',
    name2: 'BATMAN',
    subtitle: 'The Dark Brick',
    description: 'He is the night. He is vengeance. He is accidentally stepping on a brick in the middle of the night. He is BATMAN.',
    stats: { strength: '50/100', speed: 'Batmobile', tech: 'Bat-Gadgets' },
    theme: 'from-gray-700/50 via-black to-black',
    strokeColor: '#4b5563',
    buttonColor: 'bg-gray-700 hover:bg-gray-800',
    shadowColor: 'shadow-[0_10px_30px_-10px_rgba(75,85,99,0.6)]',
    textColor: 'text-gray-400',
    ModelComponent: BatmanModel,
    cameraTarget: [0, 0.5, 0],
    watermark: 'BATMAN'
  }
]

export function HeroSection() {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0)
  const hero = heroes[activeHeroIndex]

  const nextHero = () => {
    setActiveHeroIndex((prev) => (prev + 1) % heroes.length)
  }

  const prevHero = () => {
    setActiveHeroIndex((prev) => (prev - 1 + heroes.length) % heroes.length)
  }

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] ${hero.theme} text-white transition-colors duration-700`}>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <h1 className="text-[25vw] font-black tracking-tighter text-transparent stroke-text uppercase select-none transition-colors duration-700"
            style={{ WebkitTextStroke: `2px ${hero.strokeColor}` }}>
          {hero.watermark}
        </h1>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col md:flex-row">

        <div className="w-full md:w-1/2 h-[50vh] md:h-full relative order-1 md:order-1">
          <ModelViewer ModelComponent={hero.ModelComponent} cameraTarget={hero.cameraTarget} />
          
          {/* Navigation Arrows */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-8 z-50">
            <button onClick={prevHero} className="text-white/50 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button onClick={nextHero} className="text-white/50 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>


        <div className="w-full md:w-1/2 h-[50vh] md:h-full flex flex-col justify-center px-8 md:px-16 space-y-4 order-2 md:order-2 z-20">
          <AnimatePresence mode='wait'>
            <motion.div
              key={hero.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className={`${hero.textColor} font-bold tracking-[0.2em] text-xs md:text-sm mb-2 uppercase transition-colors duration-500`}>
                {hero.subtitle}
              </h2>
              <h1 className="text-5xl md:text-7xl font-black mb-4 leading-[0.9]">
                {hero.name} <br />
                <span className={hero.textColor}>{hero.name2}</span>
              </h1>
              <p className="text-gray-400 text-xs md:text-base max-w-lg mb-8 leading-relaxed">
                {hero.description}
              </p>
              
              <div className="flex space-x-4 items-center">
                <button className={`px-8 py-3 ${hero.buttonColor} text-white font-bold text-sm rounded-none transition-all duration-300 transform hover:-translate-y-1 ${hero.shadowColor} tracking-wider`}>
                  BOOK NOW
                </button>
                <button className={`px-8 py-3 border border-white/20 hover:border-${hero.strokeColor} text-white font-bold text-sm rounded-none transition-all duration-300 hover:bg-white/10 tracking-wider`}
                        style={{ '--hover-color': hero.strokeColor } }>
                  CONTACT AGENT
                </button>
              </div>
              
              <div className="mt-8 grid grid-cols-3 gap-6 border-t border-white/10 pt-4">
                 <div>
                   <h4 className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Strength</h4>
                   <p className="text-lg font-bold text-white">{hero.stats.strength}</p>
                 </div>
                 <div>
                   <h4 className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Speed</h4>
                   <p className="text-lg font-bold text-white">{hero.stats.speed}</p>
                 </div>
                 <div>
                   <h4 className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Tech</h4>
                   <p className="text-lg font-bold text-white">{hero.stats.tech}</p>
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { ModelViewer } from '../3d/ModelViewer'
import { motion, AnimatePresence } from 'framer-motion'
import { HulkModel } from '../3d/HulkModel'
import { BatmanModel } from '../3d/BatmanModel'
import { IronManModel } from '../3d/IronManModel'
import { SpiderManModel } from '../3d/SpiderManModel'
import { CaptainAmericaModel } from '../3d/CaptainAmericaModel'
import { ThorModel } from '../3d/ThorModel'
import { SupermanModel } from '../3d/SupermanModel'

const heroes = [
  {
    id: 'hulk',
    name: 'BRUCE',
    name2: 'BANNER',
    subtitle: 'The Gamma Giant',
    description: 'Dr. Bruce Banner lives a life caught between the soft-spoken scientist he’s always been and the uncontrollable green behemoth powered by his rage.',
    stats: { strength: '100/100', speed: 'Mach 4', tech: 'Gamma' },
    theme: 'from-green-600/30 via-white to-white',
    strokeColor: '#16a34a',
    buttonColor: 'bg-green-600 hover:bg-green-700',
    shadowColor: 'shadow-[0_10px_30px_-10px_rgba(22,163,74,0.4)]',
    textColor: 'text-green-600',
    ModelComponent: HulkModel,
    cameraTarget: [0, 0, 0],
    watermark: 'HULK'
  },
  {
    id: 'ironman',
    name: 'TONY',
    name2: 'STARK',
    subtitle: 'The Armored Avenger',
    description: 'Billionaire. Philanthropist. Genius. Tony Stark engineered the ultimate high-tech armor to protect the Multiverse from imminent threats.',
    stats: { strength: '85/100', speed: 'Mach 10', tech: 'Nano-Tech' },
    theme: 'from-red-600/30 via-white to-white',
    strokeColor: '#dc2626',
    buttonColor: 'bg-red-600 hover:bg-red-700',
    shadowColor: 'shadow-[0_10px_30px_-10px_rgba(220,38,38,0.4)]',
    textColor: 'text-red-600',
    ModelComponent: IronManModel,
    cameraTarget: [0, 0.5, 0],
    watermark: 'STARK'
  },
  {
    id: 'spiderman',
    name: 'PETER',
    name2: 'PARKER',
    subtitle: 'Your Friendly Neighborhood Hero',
    description: 'Peter Parker was bitten by a radioactive spider. Now he swings through the city, balancing life as a student and the world’s most famous wall-crawler.',
    stats: { strength: '75/100', speed: 'Mach 2', tech: 'Web-Shooters' },
    theme: 'from-blue-600/30 via-white to-white',
    strokeColor: '#2563eb',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
    shadowColor: 'shadow-[0_10px_30px_-10px_rgba(37,99,235,0.4)]',
    textColor: 'text-blue-600',
    ModelComponent: SpiderManModel,
    cameraTarget: [0, 0.5, 0],
    watermark: 'SPIDEY'
  },
  {
    id: 'cap',
    name: 'STEVE',
    name2: 'ROGERS',
    subtitle: 'The First Avenger',
    description: 'Enhanced by the Super-Soldier Serum, Steve Rogers leads the team with a shield and a moral compass that defines the true meaning of a hero.',
    stats: { strength: '80/100', speed: 'Athlete', tech: 'Vibranium Shield' },
    theme: 'from-indigo-600/30 via-white to-white',
    strokeColor: '#4f46e5',
    buttonColor: 'bg-indigo-600 hover:bg-indigo-700',
    shadowColor: 'shadow-[0_10px_30_30px_-10px_rgba(79,70,229,0.4)]',
    textColor: 'text-indigo-600',
    ModelComponent: CaptainAmericaModel,
    cameraTarget: [0, 0.5, 0],
    watermark: 'CAP'
  },
  {
    id: 'thor',
    name: 'THOR',
    name2: 'ODINSON',
    subtitle: 'God of Thunder',
    description: 'Whosoever holds this hammer, if they be worthy, shall possess the power of the mighty God of Thunder himself.',
    stats: { strength: '95/100', speed: 'Lightning', tech: 'Mjolnir' },
    theme: 'from-amber-600/30 via-white to-white',
    strokeColor: '#d97706',
    buttonColor: 'bg-amber-600 hover:bg-amber-700',
    shadowColor: 'shadow-[0_10px_30px_-10px_rgba(217,119,6,0.4)]',
    textColor: 'text-amber-600',
    ModelComponent: ThorModel,
    cameraTarget: [0, 0.5, 0],
    watermark: 'THOR'
  },
  {
    id: 'batman',
    name: 'BRUCE',
    name2: 'WAYNE',
    subtitle: 'The Dark Knight',
    description: 'He is the night. He is vengeance. He is the World’s Greatest Detective. He is BATMAN.',
    stats: { strength: '50/100', speed: 'Batmobile', tech: 'Bat-Gadgets' },
    theme: 'from-gray-700/30 via-white to-white',
    strokeColor: '#4b5563',
    buttonColor: 'bg-slate-800 hover:bg-slate-900',
    shadowColor: 'shadow-[0_10px_30px_-10px_rgba(75,85,99,0.4)]',
    textColor: 'text-slate-700',
    ModelComponent: BatmanModel,
    cameraTarget: [0, 0.5, 0],
    watermark: 'BATMAN'
  },
  {
    id: 'superman',
    name: 'CLARK',
    name2: 'KENT',
    subtitle: 'The Man of Steel',
    description: 'Faster than a speeding bullet. More powerful than a locomotive. Clark Kent came from the planet Krypton to become Earth’s greatest champion.',
    stats: { strength: '100/100', speed: 'Sonic', tech: 'Kryptonian' },
    theme: 'from-blue-700/30 via-white to-white',
    strokeColor: '#1d4ed8',
    buttonColor: 'bg-blue-700 hover:bg-blue-800',
    shadowColor: 'shadow-[0_10px_30px_-10px_rgba(29,78,216,0.4)]',
    textColor: 'text-blue-700',
    ModelComponent: SupermanModel,
    cameraTarget: [0, 0.5, 0],
    watermark: 'SUPERMAN'
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
    <div className="relative w-full h-screen overflow-hidden bg-white text-slate-900 transition-colors duration-700">
      {/* Background Gradient Layer */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] ${hero.theme} opacity-30`}
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
        <h1 className="text-[25vw] font-black tracking-tighter text-transparent stroke-text uppercase select-none transition-colors duration-700"
            style={{ WebkitTextStroke: `4px ${hero.strokeColor}` }}>
          {hero.watermark}
        </h1>
      </div>

      <div className="relative z-20 w-full h-full flex flex-col md:flex-row">

        <div className="w-full md:w-[55%] h-[50vh] md:h-full relative order-1 md:order-1">
          <ModelViewer ModelComponent={hero.ModelComponent} cameraTarget={hero.cameraTarget} />
          
          {/* Navigation Arrows */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-8 z-50">
            <button onClick={prevHero} className="text-slate-400 hover:text-black transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button onClick={nextHero} className="text-slate-400 hover:text-black transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>


        <div className="w-full md:w-[45%] h-[50vh] md:h-full flex flex-col justify-center px-8 md:px-16 space-y-4 order-2 md:order-2 z-30">
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
              <h1 className="text-5xl md:text-7xl font-black mb-4 leading-[0.9] text-slate-900">
                {hero.name} <br />
                <span className={hero.textColor}>{hero.name2}</span>
              </h1>
              <p className="text-slate-600 text-xs md:text-base max-w-lg mb-8 leading-relaxed font-medium">
                {hero.description}
              </p>
              
              <div className="flex space-x-4 items-center">
                <button className={`px-8 py-3 ${hero.buttonColor} text-white font-bold text-sm rounded-none transition-all duration-300 transform hover:-translate-y-1 ${hero.shadowColor} tracking-wider`}>
                  BOOK NOW
                </button>
                <button 
                  className="px-8 py-3 border border-slate-200 text-slate-900 font-bold text-sm rounded-none transition-all duration-300 hover:bg-slate-50 tracking-wider"
                  style={{ borderColor: `${hero.strokeColor}44` }}
                >
                  CONTACT AGENT
                </button>
              </div>
              
              <div className="mt-8 grid grid-cols-3 gap-6 border-t border-slate-100 pt-4">
                 <div>
                   <h4 className="text-slate-400 text-[10px] uppercase tracking-wider mb-1">Strength</h4>
                   <p className="text-lg font-bold text-slate-900">{hero.stats.strength}</p>
                 </div>
                 <div>
                   <h4 className="text-slate-400 text-[10px] uppercase tracking-wider mb-1">Speed</h4>
                   <p className="text-lg font-bold text-slate-900">{hero.stats.speed}</p>
                 </div>
                 <div>
                   <h4 className="text-slate-400 text-[10px] uppercase tracking-wider mb-1">Tech</h4>
                   <p className="text-lg font-bold text-slate-900">{hero.stats.tech}</p>
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

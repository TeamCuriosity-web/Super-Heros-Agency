import React from 'react'
import { ModelViewer } from '../3d/ModelViewer'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-rose-600/50 via-black to-black text-white">

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <h1 className="text-[25vw] font-black tracking-tighter text-transparent stroke-text uppercase select-none"
            style={{ WebkitTextStroke: '2px #dc2626' }}>
          STARK
        </h1>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col md:flex-row">

        <div className="w-full md:w-1/2 h-[50vh] md:h-full relative order-1 md:order-1">
          <ModelViewer />
        </div>


        <div className="w-full md:w-1/2 h-[50vh] md:h-full flex flex-col justify-center px-8 md:px-16 space-y-4 order-2 md:order-2 z-20">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2 className="text-red-500 font-bold tracking-[0.2em] text-xs md:text-sm mb-2 uppercase">
              The Golden Avenger
            </h2>
            <h1 className="text-5xl md:text-7xl font-black mb-4 leading-[0.9]">
              IRON <br />
              <span className="text-red-600">MAN</span>
            </h1>
            <p className="text-gray-400 text-xs md:text-base max-w-lg mb-8 leading-relaxed">
              Anthony Edward "Tony" Stark is a billionaire industrialist, a founding member of the Avengers, and the former CEO of Stark Industries. A brash but brilliant inventor, he designed the Iron Man suit.
            </p>
            
            <div className="flex space-x-4 items-center">
              <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-none transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_30px_-10px_rgba(220,38,38,0.6)] tracking-wider">
                BOOK NOW
              </button>
              <button className="px-8 py-3 border border-white/20 hover:border-red-500 text-white font-bold text-sm rounded-none transition-all duration-300 hover:bg-red-600/10 tracking-wider">
                CONTACT AGENT
              </button>
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-6 border-t border-white/10 pt-4">
               <div>
                 <h4 className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Strength</h4>
                 <p className="text-lg font-bold">85/100</p>
               </div>
               <div>
                 <h4 className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Speed</h4>
                 <p className="text-lg font-bold">Mach 10</p>
               </div>
               <div>
                 <h4 className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Tech</h4>
                 <p className="text-lg font-bold">Nanotech</p>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

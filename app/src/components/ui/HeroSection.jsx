import React from 'react'
import { ModelViewer } from '../3d/ModelViewer'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">

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


        <div className="w-full md:w-1/2 h-[50vh] md:h-full flex flex-col justify-center px-8 md:px-16 space-y-6 order-2 md:order-2 z-20">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2 className="text-red-500 font-bold tracking-[0.2em] text-sm md:text-base mb-2 uppercase">
              The Golden Avenger
            </h2>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.9]">
              IRON <br />
              <span className="text-red-600">MAN</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-lg max-w-lg mb-10 leading-relaxed">
              Anthony Edward "Tony" Stark is a billionaire industrialist, a founding member of the Avengers, and the former CEO of Stark Industries. A brash but brilliant inventor, he designed the Iron Man suit.
            </p>
            
            <div className="flex space-x-6 items-center">
              <button className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-none transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_30px_-10px_rgba(220,38,38,0.6)] tracking-wider">
                BOOK NOW
              </button>
              <button className="px-10 py-4 border border-white/20 hover:border-red-500 text-white font-bold rounded-none transition-all duration-300 hover:bg-red-600/10 tracking-wider">
                CONTACT AGENT
              </button>
            </div>
            

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-6">
               <div>
                 <h4 className="text-gray-500 text-xs uppercase tracking-wider mb-1">Strength</h4>
                 <p className="text-xl font-bold">85/100</p>
               </div>
               <div>
                 <h4 className="text-gray-500 text-xs uppercase tracking-wider mb-1">Speed</h4>
                 <p className="text-xl font-bold">Mach 10</p>
               </div>
               <div>
                 <h4 className="text-gray-500 text-xs uppercase tracking-wider mb-1">Tech</h4>
                 <p className="text-xl font-bold">Nanotech</p>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

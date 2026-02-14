import React from 'react'
import { motion } from 'framer-motion'

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-8 md:px-16 py-6 bg-white/80 backdrop-blur-md border-b border-black/5"
    >
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center">
            <span className="text-white font-black text-lg">A</span>
        </div>
        <span className="text-black font-black text-xl tracking-tighter uppercase">Heroes <span className="text-red-600">Agency</span></span>
      </div>

      <div className="hidden md:flex items-center space-x-12">
        {['HEROES', 'MISSIONS', 'GALLERY'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-bold text-slate-400 hover:text-black transition-colors tracking-[0.2em] relative group uppercase">
            {item}
            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-red-600 transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>

      <button className="hidden md:block bg-black text-white px-6 py-2 text-[10px] font-black tracking-widest hover:bg-red-600 transition-all uppercase">
        JOIN NOW
      </button>

      <div className="md:hidden">
        <div className="space-y-2 cursor-pointer">
           <div className="w-8 h-0.5 bg-black"></div>
           <div className="w-8 h-0.5 bg-black"></div>
           <div className="w-8 h-0.5 bg-black"></div>
        </div>
      </div>
    </motion.nav>
  )
}

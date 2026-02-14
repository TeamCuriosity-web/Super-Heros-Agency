import React from 'react'
import { motion } from 'framer-motion'

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 md:px-16 py-6"
    >
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
        </div>
        <span className="text-white font-bold text-xl tracking-wider">AVENGERS OFFICIAL</span>
      </div>

      <div className="hidden md:flex items-center space-x-12">
        {['HEROES', 'MISSIONS', 'GALLERY', 'NEWS'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-300 hover:text-white transition-colors tracking-widest relative group">
            {item}
            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-red-600 transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>

      <button className="hidden md:block border border-white/20 px-6 py-2 text-sm font-bold tracking-wider hover:bg-white hover:text-black transition-all">
        JOIN NOW
      </button>

      <div className="md:hidden">
        <div className="space-y-2 cursor-pointer">
           <div className="w-8 h-0.5 bg-white"></div>
           <div className="w-8 h-0.5 bg-white"></div>
           <div className="w-8 h-0.5 bg-white"></div>
        </div>
      </div>
    </motion.nav>
  )
}

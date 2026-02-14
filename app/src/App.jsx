import { HeroSection } from './components/ui/HeroSection'
import { Navbar } from './components/ui/Navbar'

import { Missions } from './components/ui/Missions'
import { Gallery } from './components/ui/Gallery'

function App() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <HeroSection />
      <Missions />
      <Gallery />
    </div>
  )
}

export default App

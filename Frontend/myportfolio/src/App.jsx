import NavBar from './components/NavBar'
import Home from './sections/Home'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import ParticlesBackground from './components/ParticlesBackground'
import CoustomCursor from './components/CoustomCursor'


const App = () => {
  return (
    <div className="relative ">
      <CoustomCursor/>
      <ParticlesBackground/>
      
      <NavBar/>
      <Home/>
      <About/>
      <Skills/>
      <Projects/>
      <Experience/>
      <Testimonials/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default App
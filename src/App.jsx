import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import TechList from "./components/TechList";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import IntroExp from "./components/IntroExp";

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Skills />
      <TechList />
      <IntroExp />
      <Experience />
      <Story />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;

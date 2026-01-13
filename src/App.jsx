import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Layout/Header';
import HeroSlider from './components/Home/HeroSlider';
import InfoSection from './components/Home/InfoSection';
import ProductCards from './components/Home/ProductCards';
import CasesCarousel from './components/Home/CasesCarousel';
import BoardInquiry from './components/Home/BoardInquiry';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      
      {/* Main Content Area */}
      <main style={{ minHeight: '80vh' }}>
        <HeroSlider />
        <InfoSection />
        <ProductCards />
        <CasesCarousel />
        <BoardInquiry />
      </main>

      <Footer />
    </div>
  );
}

export default App;

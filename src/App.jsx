import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './components/Home/Home';
import About from './components/about/About';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const mainStyle = {
    minHeight: '80vh',
    paddingTop: isHomePage ? '0' : '120px',
  };

  return (
    <div className="App">
      <Header />
      
      {/* Main Content Area */}
      <main style={mainStyle}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;

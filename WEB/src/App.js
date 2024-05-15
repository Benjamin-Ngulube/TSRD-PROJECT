import { BrowserRouter, Route, Routes } from 'react-router-dom';
import image from './img/home__wallpaper.jpg'
import { Home } from './pages/Home';
import { Navbar } from './Comp/Navbar';
import { Footer } from './Comp/Footer';
import { Maps } from './pages/Map';
import { Reports } from './pages/Reports';

function App() {
  return (
    <BrowserRouter>
      <div className='d-flex justify-content-between flex-column'>
        
        <div style={{zIndex:'1'}}>
        <Navbar  />
        </div>
        <div style={{minHeight:"80vh", zIndex:'0'}}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Map' element={<Maps />} />
            <Route path='/Reports' element={<Reports />} />
          </Routes>
        </div>
        <div style={{zIndex:'1'}}>
        <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

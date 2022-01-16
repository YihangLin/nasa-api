import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';


import './App.css';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Liked from './pages/Liked/Liked';

// import Loading from './components/Loading';


function App() {
  const [sidebar, setSidebar] = useState(false);


  return (
    <div className={`App ${sidebar ? 'disable-scroll' : ''}`}>
      <BrowserRouter>
      <Navbar setSidebar={setSidebar}/>
      <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/liked' element={ <Liked /> } />
        </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

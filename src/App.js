import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDataContext } from './hooks/useDataContext';

import './App.css';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Liked from './pages/Liked/Liked';
import Picker from './components/Picker';

function App() {
  const { showSidebar } = useDataContext()

  return (
    //mobile size: disable scroll if sidebar is open
    <div className={`App ${showSidebar ? 'disable-scroll' : ''}`}>
      <BrowserRouter>
      <Navbar />
      <Picker />
      <Sidebar />
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

import Menu from '../assets/menu.svg';
import Logo from '../assets/logo.svg';
import ArrowDown from '../assets/arrow_down.svg';
import './Navbar.css';

import { useDataContext } from '../hooks/useDataContext';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { dispatch, showSidebar } = useDataContext();

  return (
    <div className='navbar-container'>
      <nav className='mobile-navbar'>
        <div className='mobile-menu-btn' onClick={()=> dispatch({ type: 'UPDATE_SHOW_SIDEBAR', payload: !showSidebar })}>
          <img src={Menu} alt="menu button" />
        </div>
        <Link to='/' onClick={()=> dispatch({ type: 'UPDATE_SHOW_SIDEBAR', payload: false })}><img src={Logo} alt="logo"  className='mobile-logo'/></Link>
      </nav>

      <nav className='desktop-navbar'>
        <Link to='/' onClick={() => dispatch({ type: 'UPDATE_SHOW_PICKER', payload: false })}><img src={Logo} alt="logo" className='desktop-logo' /></Link>

        <ul>
          <li>
            <div onClick={()=> {dispatch({ type: 'UPDATE_SHOW_PICKER', payload: true }); dispatch({ type: 'UPDATE_PICKER', payload: 'date' }) }}>
              <span>Select a Date</span>
              <img src={ArrowDown} alt="expand arrow" />
            </div>
          </li>

          <li>
            <div onClick={()=> {dispatch({ type: 'UPDATE_SHOW_PICKER', payload: true }); dispatch({ type: 'UPDATE_PICKER', payload: 'range' }) }}>
              <span>Select a Date Range</span>
              <img src={ArrowDown} alt="expand arrow" />
            </div>
            
          </li>
          <li>
            <div onClick={()=> {dispatch({ type: 'UPDATE_SHOW_PICKER', payload: true }); dispatch({ type: 'UPDATE_PICKER', payload: 'count' }) }}>
              <span>Number of Images</span>
              <img src={ArrowDown} alt="expand arrow" />
            </div>
          </li>
          <li><Link to='/liked' onClick={() => {dispatch({ type: 'UPDATE_SHOW_PICKER', payload: false });dispatch({ type: 'UPDATE_SHOW_SIDEBAR', payload: false });}}>Liked Images</Link></li>
        </ul>
      </nav>
    </div>
  )
}

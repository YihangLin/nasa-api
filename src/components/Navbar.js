import Menu from '../assets/menu.svg';
import Logo from '../assets/logo.svg';
import ArrowDown from '../assets/arrow_down.svg';
import Close from '../assets/close.svg';
import './Navbar.css';

// import SpecificDate from './SpecificDate';
// import DateRange from './DateRange';
// import Count from './Count';
import Picker from './Picker';
// import { useDataContext } from '../hooks/useDataContext';

import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ setSidebar }) {
  const [picker, setPicker] = useState('date');
  // const { dispatch, showPicker } = useDataContext();
  // const [rangerPicker, setRangerPicker] = useState(false);
  // const [countPicker, setCountPicker] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className='navbar-container'>
      <nav className='mobile-navbar'>
        <div className='mobile-menu-btn' onClick={()=> setSidebar(preValue => !preValue)}>
          <img src={Menu} alt="menu button" />
        </div>
        <Link to='/'><img src={Logo} alt="logo"  className='mobile-logo'/></Link>
      </nav>

      <nav className='desktop-navbar'>
        {/* <div className='desktop-logo'> */}
        <Link to='/'><img src={Logo} alt="logo" className='desktop-logo' /></Link>
        {/* </div> */}

        <ul>
          <li>
            <div onClick={()=> {setPicker('date'); setShowPicker(true);}}>
              <span>Select a Date</span>
              <img src={ArrowDown} alt="expand arrow" />
            </div>
            {/* <div className='desktop-input'>
              <SpecificDate />
              <img src={Close} onClick={()=> setShowDatePicker(null)} alt="close date picker" className='desktop-close' />
            </div> */}
          </li>

          <li>
            <div onClick={()=> {setPicker('range'); setShowPicker(true);}}>
              <span>Select a Date Range</span>
              <img src={ArrowDown} alt="expand arrow" />
            </div>
            
          </li>
          <li>
            <div onClick={()=> {setPicker('count'); setShowPicker(true);}}>
              <span>Number of Images</span>
              <img src={ArrowDown} alt="expand arrow" />
            </div>
          </li>
          <li><Link to='/liked'>Liked Images</Link></li>
        </ul>
      </nav>

      {showPicker && 
        <div className='desktop-datepicker'>
          <Picker picker={picker} />
          <img src={Close} onClick={() => setShowPicker(false)} alt="close date picker" className='desktop-close' />
        </div>

      }
      {/* {showDatePicker && <div className='desktop-datepicker'>
        <SpecificDate />
      </div>} */}
    </div>
  )
}

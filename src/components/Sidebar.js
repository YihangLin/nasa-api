import './Sidebar.css';
import ArrowDown from '../assets/arrow_down.svg';

import SpecificDate from './SpecificDate';
import DateRange from './DateRange';
import Count from './Count';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDataContext } from '../hooks/useDataContext';

export default function Sidebar() {
  const [date, setDate] = useState(false);
  const [range, setRange] = useState(false);
  const [count, setCount] = useState(false);
  const { dispatch, showSidebar } = useDataContext();

  return (
    <div className={`mobile-sidebar-container ${showSidebar ? '' : 'mobile-sidebar-disable'}`}>
      <div className='mobile-sidebar'>
        <ul>
          <li>
            <div onClick={()=> setDate(preValue => !preValue)}>
              <span>Select a Date</span>
              <img src={ArrowDown} alt="expand arrow" />
            </div>
            {date && <SpecificDate />}
          </li>
          <li>
            <div onClick={()=> setRange(preValue => !preValue)}>
              <span>Select a Date Range</span>
              <img src={ArrowDown} alt="expand arrow" />
            </div>
            {range && <DateRange />}
          </li>
          <li>
            <div onClick={()=> setCount(preValue => !preValue)}>
              <span>Number of Images</span>
              <img src={ArrowDown} alt="expand arrow" />
            </div>
            {count && <Count />}
          </li>
          <li><Link to='/liked' onClick={()=> dispatch({ type: 'UPDATE_SHOW_SIDEBAR', payload: false })}>Liked Images</Link></li>
        </ul>
      </div>
      
      <div className='mobile-close-sidebar' onClick={()=> dispatch({ type: 'UPDATE_SHOW_SIDEBAR', payload: false })}></div>
    </div>
  )
}

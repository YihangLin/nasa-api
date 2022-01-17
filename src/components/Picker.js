import './Picker.css';
import Close from '../assets/close.svg';

import { useDataContext } from "../hooks/useDataContext";
import SpecificDate from "./SpecificDate"
import DateRange from "./DateRange";
import Count from "./Count";

export default function Picker() {

  const { picker, showPicker, dispatch } = useDataContext();

  const getPicker = ( p ) => {
    switch(p) {
      case 'date':
        return <SpecificDate />;
      case 'range':
        return <DateRange />;
      case 'count':
        return <Count />;
      default:
        <> </>;
    }
  }

  // dynamically render the form in date picker area
  return (
    <div className={`desktop-datepicker  ${showPicker ? '' : 'hide-desktop-datepicker'}`}>
      {getPicker(picker)}
      <img src={Close} onClick={() => dispatch({ type: 'UPDATE_SHOW_PICKER', payload: false })} alt="close date picker" className='desktop-close' />
    </div>
  )
  

}

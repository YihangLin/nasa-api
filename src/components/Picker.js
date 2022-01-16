import SpecificDate from "./SpecificDate"
import DateRange from "./DateRange";
import Count from "./Count";

export default function Picker({ picker }) {

  switch(picker) {
    case 'date':
      return <SpecificDate />;
    case 'range':
      return <DateRange />;
    case 'count':
      return <Count />;
    default:
      return <> </>;
  }

}

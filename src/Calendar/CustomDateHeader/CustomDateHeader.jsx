import './CustomDateHeader.scss';
import DayOfMonth from './DayOfMonth';

const CustomDateHeader = ({ label, date, drilldownView, onDrillDown }) => {
  return (
    <span >
      <DayOfMonth className='num-of-day' date={date} />
    </span>
  );
};

export default CustomDateHeader;
import moment from 'moment';

const DayOfMonth = ({ date }) => {
  const dayOfMonth = moment(date).format('D');
  return (
    <span className='day'>
      {dayOfMonth}
    </span>
  );
};

export default DayOfMonth;
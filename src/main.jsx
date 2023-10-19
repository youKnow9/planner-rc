import React from 'react'
import ReactDOM from 'react-dom/client'
import Calendar from './Calendar/Calendar.jsx'
import '../src/Calendar/Calendar.scss'
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import './main.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Calendar />
  </React.StrictMode>,
)

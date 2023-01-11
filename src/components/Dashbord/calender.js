import React, { useState } from 'react';

function CalendarAi() {
  const [date, setDate] = useState(new Date());

  const renderCalendarCells = () => {
    const cells = [];
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const startDay = monthStart.getDay();
    const endDate = monthEnd.getDate();

    for (let i = 0; i < startDay; i++) {
      cells.push('');
    }
    for (let i = 1; i <= endDate; i++) {
      cells.push(i);
    }
    return cells;
  };

  return (
    <div className="calendar glass">
      <div className="calendar-header">
        <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1))}>
          Prev
        </button>
        <div>{`${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`}</div>
        <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1))}>
          Next
        </button>
      </div>
      <div className="calendar-body">
        <div className="week-days">
          <div className='text-danger'>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div className='text-danger'>Sat</div>
        </div>
        <div className="calendar-cells">
          {renderCalendarCells().map((cell, index) => (
            <div className={`${index%7 == 0 || index%7 == 6 ? 'text-danger':''} glass ${cell==new Date()}`} key={index}>{cell}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CalendarAi;

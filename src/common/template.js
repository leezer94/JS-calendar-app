export const calendarNavTemplate = (month, year) => {
  return `
        <div class="calendar-nav">
          <i class="fas fa-angle-left prev"></i>
          <div class="date">
            <h1 id="nav-month">${month}</h1>
            <p id="nav-year">${year}</p>
          </div>
          <i class="fas fa-angle-right next"></i>
        </div>
        
   `;
};

export const calendarDatesTemplate = (dayOfTheWeek) => {
  return `
   <div class="calendar-dates calendar-dates-grid">
   ${dayOfTheWeek.map((day) => `<div>${day}</div>`).join('')}
   </div>
   `;
};

export const calendarDaysTemplate = () => {
  return `
   <div class="calendar-days calendar-days-grid"></div>
   `;
};

export const prevDateTemplate = (prevDate) => {
  return `
  <div class="prev-date">${prevDate}</div>
  `;
};

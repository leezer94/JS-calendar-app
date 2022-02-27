export const calendarTemplate = (month, year) => {
  return `
      <div class="calendar hidden">
        <div class="calendar-nav">
          <i class="fas fa-angle-left prev "></i>
          <div class="date">
            <h1 id="nav-month">${month}</h1>
            <p id="nav-year">${year}</p>
          </div>
          <i class="fas fa-angle-right next"></i>
        </div>
      </div>
   `;
};

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

export const datePickerInputTemplate = () => {
  return `
    <div class="date-picker">
      <h1>Date Picker</h1>
      <input class="" id="date-select" placeholder="Select date" readonly />
    </div>
  `;
};

export const calendarDatesTemplate = (dayOfTheWeek) => {
  return `
   <div class="calendar-dates calendar-dates-grid">
   ${dayOfTheWeek.map((day) => `<div class="">${day}</div>`).join('')}
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

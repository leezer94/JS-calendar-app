import { NUMBER } from '../common/constants.js';

export class Model {
  constructor() {
    this.state = {
      months: [
        'January',
        'Febuary',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    };
  }

  updateCurrentMonth(curerntMonth) {
    return this.state.months[curerntMonth];
  }

  getLastDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  getLastDayIndex(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  }

  getPrevLastday(date) {
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  }

  getDateDetails(target, date) {
    const year = date.getFullYear();
    const day = target.textContent;
    let month = date.getMonth() + NUMBER.ONE;

    if (target.classList.contains('prev-date')) {
      month = month - NUMBER.ONE;
    } else if (target.classList.contains('next-date')) {
      month = month + NUMBER.ONE;
    } else {
      month = month;
    }
    return [year, month, day];
  }

  logDates(target, date) {
    let [year, month, day] = this.getDateDetails(target, date);

    if (month > NUMBER.DEC) {
      month = NUMBER.JAN;
    } else if (month === NUMBER.ZERO) {
      month = NUMBER.DEC;
    }

    if (day.length > NUMBER.ONE) {
      console.log(`${year}-${month}-${day}`);
      return `${year}-${month}-${day}`;
    } else {
      console.log(`${year}-${month}-0${day}`);
      return `${year}-${month}-0${day}`;
    }
  }

  paintClickedNumber(target) {
    const daysContainer = target.closest('.calendar-days').children;

    [...daysContainer].map((day) => {
      const selected = day.classList.contains('selected');
      if (!selected) {
        target.classList.add('selected');
      } else {
        day.classList.remove('selected');
      }
    });
  }
}

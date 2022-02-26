import { $ } from '../common/DOM.js';

export class View {
  constructor() {
    this.$ = {
      navYear: $('#nav-year'),
      navMonth: $('#nav-month'),
    };
  }

  render(target, position, template) {
    target.insertAdjacentHTML(position, template);
  }

  renderPrevDays(firstDayIndex, prevLastDay) {
    this.days = '';
    for (let i = firstDayIndex; i > 0; i--) {
      this.days += `<div class="prev-date day">${prevLastDay - i + 1}</div>`;
    }

    return this.days;
  }

  renderDays(date, lastDay) {
    this.days = '';

    for (let i = 1; i <= lastDay; i++) {
      if (
        i === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear()
      ) {
        this.days += `<div class="today day">${i}</div>`;
      } else {
        this.days += `<div class="day">${i}</div>`;
      }
    }

    return this.days;
  }

  renderNextDays(nextDays) {
    this.days = '';

    for (let j = 1; j <= nextDays; j++) {
      this.days += `<div class="next-date day">${j}</div>`;
    }

    return this.days;
  }
}

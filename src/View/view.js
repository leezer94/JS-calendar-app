import { $ } from '../common/DOM.js';

export class View {
  constructor() {
    this.$ = {
      navYear: $('#nav-year'),
      navMonth: $('#nav-month'),
    };
  }

  renderAll(target, position, template) {
    [...target].map((container) => {
      container.insertAdjacentHTML(position, template);
    });
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
        this.days += `<div class="day today">${i}</div>`;
      } else {
        this.days += `<div class="day">${i}</div>`;
      }
    }

    return this.days;
  }

  renderNextDays(nextDays) {
    this.days = '';

    for (let j = 1; j <= nextDays; j++) {
      this.days += `<div class="day next-date">${j}</div>`;
    }

    return this.days;
  }

  updateInputValue(target, value) {
    const datePickerInput =
      target.closest('.calendar').previousElementSibling.children[1];

    datePickerInput.value = value;
  }

  updateNavDetails(navContainer, monthValue, yearValue) {
    const month = navContainer.children[0];
    const year = navContainer.children[1];

    month.innerHTML = monthValue;

    year.innerHTML = yearValue;
  }

  updateDaysContainer(target, prev, current, next) {
    target.innerHTML = prev + current + next;
  }
}

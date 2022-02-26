import { POSITION, STAGE, NUMBER } from '../common/constants.js';
import { $ } from '../common/DOM.js';
import {
  calendarNavTemplate,
  calendarDatesTemplate,
  calendarDaysTemplate,
} from '../common/template.js';

export class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.date = new Date();

    this.$ = {
      app: $('.app'),
      calenderContainer: $('.calendar'),
    };

    this.bindEventListeners();
  }

  bindDays() {
    const daysContainer = $('.calendar-days');
    const nextDays =
      NUMBER.WEEKDAYS - this.model.getLastDayIndex(this.date) - NUMBER.ONE;

    this.view.render(
      daysContainer,
      POSITION.AFTERBEGIN,
      this.view.renderPrevDays(
        this.date.getDay(),
        this.model.getPrevLastday(this.date)
      )
    );

    this.view.render(
      daysContainer,
      POSITION.BEFOREEND,
      this.view.renderDays(this.date, this.model.getLastDayOfMonth(this.date))
    );

    this.view.render(
      daysContainer,
      POSITION.BEFOREEND,
      this.view.renderNextDays(nextDays)
    );
  }

  initCalender() {
    this.date.setDate(NUMBER.ONE);

    this.view.render(
      this.$.calenderContainer,
      POSITION.AFTERBEGIN,
      calendarNavTemplate(
        this.model.updateCurrentMonth(this.date.getMonth()),
        this.date.getFullYear()
      )
    );

    this.view.render(
      this.$.calenderContainer,
      POSITION.BEFOREEND,
      calendarDatesTemplate(this.model.state.days)
    );

    this.view.render(
      this.$.calenderContainer,
      POSITION.BEFOREEND,
      calendarDaysTemplate()
    );

    this.bindDays();
  }

  switch(target) {
    this.$.calenderContainer.innerHTML = '';
    if (target.classList.contains(STAGE.PREV)) {
      this.date.setMonth(this.date.getMonth() - NUMBER.ONE);
    }
    if (target.classList.contains(STAGE.NEXT)) {
      this.date.setMonth(this.date.getMonth() + NUMBER.ONE);
    }

    this.initCalender();
  }

  logdate(year, month, day) {
    if (month > NUMBER.DEC) {
      month = NUMBER.JAN;
    } else if (month === NUMBER.ZERO) {
      month = NUMBER.DEC;
    }

    if (day.length > NUMBER.ONE) {
      console.log(`${year}-${month}-${day}`);
    } else {
      console.log(`${year}-${month}-0${day}`);
    }
  }

  bindEventListeners() {
    this.$.app.addEventListener('click', ({ target }) => {
      this.switch(target);

      if (target.classList.contains('day')) {
        const year = this.date.getFullYear();
        const day = target.textContent;
        let month = this.date.getMonth() + NUMBER.ONE;

        if (target.classList.contains('prev-date')) {
          month = month - NUMBER.ONE;
        } else if (target.classList.contains('next-date')) {
          month = month + NUMBER.ONE;
        } else {
          month = month;
        }

        this.logdate(year, month, day);
      }
    });
  }
}

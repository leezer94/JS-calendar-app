import { POSITION, STAGE, NUMBER } from '../common/constants.js';
import { $, $$ } from '../common/DOM.js';
import {
  calendarTemplate,
  calendarNavTemplate,
  calendarDatesTemplate,
  calendarDaysTemplate,
  datePickerInputTemplate,
} from '../common/template.js';

export class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.date = new Date();

    this.$ = {
      app: $('.app'),
      container: $('.calendar'),
      datePickerInput: $('.date-picker'),
    };

    this.$$ = {
      containers: $$('.container'),
    };

    this.bindEventListeners();
  }

  initApp() {
    this.initBaseDisplay();
    this.initCalendar();
  }

  initBaseDisplay() {
    this.view.renderAll(
      this.$$.containers,
      'afterbegin',
      datePickerInputTemplate()
    );

    this.view.renderAll(
      this.$$.containers,
      'beforeend',
      calendarTemplate(
        this.model.updateCurrentMonth(this.date.getMonth()),
        this.date.getFullYear()
      )
    );
  }

  initCalendar() {
    this.date.setDate(NUMBER.ONE);

    const $calendar = $$('.calendar');

    this.view.renderAll(
      $calendar,
      POSITION.BEFOREEND,
      calendarDatesTemplate(this.model.state.days)
    );

    this.view.renderAll($calendar, POSITION.BEFOREEND, calendarDaysTemplate());

    this.bindDefaultDays();
  }

  bindDefaultDays() {
    let daysContainer = $$('.calendar-days');

    const nextDays =
      NUMBER.WEEKDAYS - this.model.getLastDayIndex(this.date) - NUMBER.ONE;

    this.view.renderAll(
      daysContainer,
      POSITION.AFTERBEGIN,
      this.view.renderPrevDays(
        this.date.getDay(),
        this.model.getPrevLastday(this.date)
      )
    );

    this.view.renderAll(
      daysContainer,
      POSITION.BEFOREEND,
      this.view.renderDays(this.date, this.model.getLastDayOfMonth(this.date))
    );

    this.view.renderAll(
      daysContainer,
      POSITION.BEFOREEND,
      this.view.renderNextDays(nextDays)
    );
  }

  onClickArrowIcon(target) {
    const navContainer = target.parentElement.children[1];
    const year = this.date.getFullYear();
    const month = this.model.updateCurrentMonth(this.date.getMonth());

    let daysContainer = target.parentElement.parentElement.children[2];
    const nextDays =
      NUMBER.WEEKDAYS - this.model.getLastDayIndex(this.date) - NUMBER.ONE;
    const prev = this.view.renderPrevDays(
      this.date.getDay(),
      this.model.getPrevLastday(this.date)
    );
    const current = this.view.renderDays(
      this.date,
      this.model.getLastDayOfMonth(this.date)
    );
    this.view.renderNextDays(nextDays);
    const next = this.view.renderNextDays(nextDays);

    this.view.updateNavDetails(navContainer, month, year);

    this.view.updateDaysContainer(daysContainer, prev, current, next);
  }

  switch(target) {
    if (!target.classList.contains('fas')) {
      return;
    }

    if (target.classList.contains(STAGE.PREV)) {
      this.date.setMonth(this.date.getMonth() - NUMBER.ONE);
    }
    if (target.classList.contains(STAGE.NEXT)) {
      this.date.setMonth(this.date.getMonth() + NUMBER.ONE);
    }

    this.onClickArrowIcon(target);
  }

  updateDatePickerValue(target, date) {
    const datePickerInput = $('#date-select');

    datePickerInput.value = this.model.logDates(target, date);
  }

  bindEventListeners() {
    this.$.app.addEventListener('click', ({ target }) => {
      this.switch(target);

      if (target.classList.contains('day')) {
        this.view.updateInputValue(
          target,
          this.model.logDates(target, this.date)
        );

        target.closest('.calendar').classList.add('hidden');

        this.model.paintClickedNumber(target);
      }

      if (target.id === 'date-select') {
        target.closest('.container').children[1].classList.toggle('hidden');
      }

      if (
        target.classList.contains('container') ||
        target.classList.contains('app')
      ) {
        [...$$('.calendar')].map((container) => {
          container.classList.add('hidden');
        });
      }
    });
  }
}

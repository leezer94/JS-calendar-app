import { $ } from './common/DOM.js';

const date = new Date();

const renderCalender = () => {
  date.setDate(1);

  const monthDays = $('.days');

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevlastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
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
  ];

  const heading = $('.date h1');

  // this displays the current month
  heading.textContent = months[date.getMonth()] + ', ' + date.getFullYear();

  // this displays full current date
  $('.date p').innerHTML = new Date().toDateString();

  let days = '';

  //
  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevlastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
  }

  monthDays.innerHTML = days;
};

$('.prev').addEventListener('click', () => {
  date.setMonth(date.getMonth() - 1);

  renderCalender();
});

$('.next').addEventListener('click', () => {
  date.setMonth(date.getMonth() + 1);

  renderCalender();
});

renderCalender();

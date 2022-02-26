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
}

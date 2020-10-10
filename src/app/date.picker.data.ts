export const coulunmDay = () => {
  var result = [];
  let buff = [];
  for (let i = 1; i < 31; i++) {
    buff.push({ value: i, text: i });
  }
  result.push({ name: 'Day', options: buff });
  result.push({
    name: 'Month',
    options: [
      { value: 1, text: 'January' },
      { value: 2, text: 'February' },
      { value: 3, text: 'March' },
      { value: 4, text: 'April' },
      { value: 5, text: 'May' },
      { value: 6, text: 'June' },
      { value: 7, text: 'July' },
      { value: 8, text: 'August' },
      { value: 9, text: 'September' },
      { value: 10, text: 'October' },
      { value: 11, text: 'November' },
      { value: 12, text: 'December' },
    ],
  });
  buff = [];
  for (let i = 2020; i < 2050; i++) {
    buff.push({ value: i, text: i });
  }
  result.push({ name: 'Year', options: buff });
  return result;
};

export const coulunmTime = () => {
  var result = [];
  let buff = [];
  for (let i = 0; i <= 24; i++) {
    buff.push({ value: i, text: i + 'h' });
  }
  result.push({ name: 'Hours', options: buff });
  buff = [];
  for (let i = 0; i <= 60; i++) {
    buff.push({ value: i, text: i + 'p' });
  }
  result.push({ name: 'Minutes', options: buff });
  return result;
};

export class nowRow {
  private now: Date;
  constructor(private date: Date) {
    this.now = date;
  }
  Day() {
    return this.now.getDate() - 1;
  }
  Month() {
    return this.now.getMonth();
  }
  Year() {
    return this.now.getFullYear() - 2020;
  }
  Minutes() {
    return this.now.getMinutes();
  }
  Hours() {
    return this.now.getHours();
  }
}

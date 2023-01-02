const MONTHS = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const $titleSection = document.createElement('div');
const $calendarSection = document.createElement('main');

const $tableWrap = document.createElement('div');
const $tableSection = document.createElement('div');
const $tableWeek = document.createElement('div');
const $tableDate = document.createElement('div');
const $prevBtn = document.createElement('div');
const $nextBtn = document.createElement('div');

const $thead = document.createElement('thead');
const $trDays = document.createElement('tr');

const $tbody = document.createElement('tbody');
const $trDate = document.createElement('tr');

document.body.appendChild($titleSection).classList.add('title-section');
document.body.appendChild($calendarSection).classList.add('calendar-section');

$calendarSection.appendChild($tableWrap).classList.add('table-wrap');
$tableWrap.appendChild($prevBtn).classList.add('prev-btn');
$tableWrap.appendChild($tableSection).classList.add('table-section');
$tableSection.appendChild($tableWeek).classList.add('table-week');
$tableSection.appendChild($tableDate).classList.add('table-date');
$tableWrap.appendChild($nextBtn).classList.add('next-btn');

$tableWeek.appendChild($thead);
$thead.appendChild($trDays).classList.add('tr-days');

$tableDate.appendChild($tbody);
$tbody.appendChild($trDate).classList.add('tr-date');

$prevBtn.addEventListener('click', prevMonth);
$nextBtn.addEventListener('click', nextMonth);

const date = new Date();

const currentDay = date.getDay(); // 요일 인덱스 0-6
const currentDate = date.getDate(); // 일 인덱스 1-31
// const currentMonth = date.getMonth(); // 월 인덱스 0-11
// const currentMonth = MONTHS[currentMonth];
let currentYear = date.getFullYear(); // 올해

// console.log('test2', new Date(1995, 11, 17));
// 해당 날짜의 '요일 월 날짜 연도' 순으로 표기됨: Sun Dec 17 1995 00:00:00 GMT+0900 (한국 표준시)

// let firstDay = new Date(currentYear, currentMonth, 1).getDay();
// let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

/**
 * let firstDay = new Date(currentYear, currentMonth, 1).getDay();:
 * 해당 달의 첫 번째 날의 요일
 * currentMonth에 +1하지 않은 이유는 getDay()도 인덱스 0부터 시작해서 ???
 */

console.log(DAYS[currentDay]);

console.log(currentDay, 'currentDay요일'); // 요일 인덱스
console.log(currentDate, 'currentDate날짜'); // 날짜 인덱스
// console.log(currentMonth, 'currentMonth');
console.log(currentYear, 'currentYear');

// let lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
/**
 * let lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();:
 * 해당 달의 마지막 날의 날짜
 * new Date(currentYear, currentMonth + 1, 0)에 해당되는 날(=달의 마지막 날)의 날짜 반환
 * currentMonth가 인덱스 0부터 시작하기 때문에
 */

function calendarTitle() {
  $titleSection.innerHTML = `${date.getFullYear()} ${MONTHS[date.getMonth()]}`;
}
calendarTitle();

function calendarDay() {
  $trDays.innerHTML = DAYS.map(
    (day, idx) => `<th class='th-day'>${day}</th>`
  ).join('');
}
calendarDay();

function calendarDate() {
  date.setDate(1);
  // date.setMonth(date.getMonth(1));

  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  let lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  console.log(firstDay, '첫 번째 날 요일');
  console.log(lastDate, '마지막 날짜');

  let emptyDates = '';
  for (let j = 0; j < firstDay; j++) {
    emptyDates += `<td></td>`;
  }

  /**
   * IMPORTANT:
   * 추후 리팩토링 할 것 (중복되는 코드 줄이기)
   */
  let fullDates = '';
  let fullDates2 = '';
  let fullDates3 = '';
  let fullDates4 = '';
  let fullDates5 = '';
  let fullDates6 = '';

  for (let i = 1; i <= lastDate; i++) {
    if (i === date.getFullYear()) {
      if (firstDay + i <= 7) {
        fullDates += `<td class='td-today td-date'>${i}</td>`;
      } else if (firstDay + i <= 14) {
        fullDates2 += `<td class='td-today td-date'>${i}</td>`;
      } else if (firstDay + i <= 21) {
        fullDates3 += `<td class='td-today td-date'>${i}</td>`;
      } else if (firstDay + i <= 28) {
        fullDates4 += `<td class='td-today td-date'>${i}</td>`;
      } else if (firstDay + i <= 35) {
        fullDates5 += `<td class='td-today td-date'>${i}</td>`;
      }
    } else {
      if (firstDay + i <= 7) {
        fullDates += `<td class='td-date'>${i}</td>`;
      } else if (firstDay + i <= 14) {
        fullDates2 += `<td class='td-date'>${i}</td>`;
      } else if (firstDay + i <= 21) {
        fullDates3 += `<td class='td-date'>${i}</td>`;
      } else if (firstDay + i <= 28) {
        fullDates4 += `<td class='td-date'>${i}</td>`;
      } else if (firstDay + i <= 35) {
        fullDates5 += `<td class='td-date'>${i}</td>`;
      } else if (firstDay + i <= 42) {
        fullDates6 += `<td class='td-date'>${i}</td>`;
      }
    }
  }

  let total = `<tr>${emptyDates}` + `${fullDates}</tr>`;

  $tbody.innerHTML =
    total +
    `<tr>${fullDates2}</tr>` +
    `<tr>${fullDates3}</tr>` +
    `<tr>${fullDates4}</tr>` +
    `<tr>${fullDates5}</tr>` +
    `<tr>${fullDates6}</tr>`;
}
calendarDate();

function prevMonth() {
  date.setMonth(date.getMonth() - 1);
  /**
   * date.setMonth(date.getMonth() - 1);:
   * 해당 코드를 통해 달을 변경(현재달에 -1개월)하면서 firstDay, lastDate 변경
   */
  // firstDay = new Date(currentYear, date.getMonth() - 1, 1).getDay(); // 해당 달의 첫 번째 날의 요일
  // lastDate = new Date(currentYear, date.getMonth(), 0).getDate();

  calendarTitle();
  calendarDate();
}

function nextMonth() {
  date.setMonth(date.getMonth() + 1);
  //firstDay = new Date(currentYear, date.getMonth() + 1, 1).getDay(); // 해당 달의 첫 번째 날의 요일
  //lastDate = new Date(currentYear, date.getMonth() + 1, 0).getDate();

  calendarTitle();
  calendarDate();
}

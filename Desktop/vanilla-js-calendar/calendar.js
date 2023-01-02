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

// ------------------------------------------
const date = new Date();

const currentDay = date.getDay(); // 요일 인덱스 0-6
const currentDate = date.getDate(); // 일 인덱스 1-31
// 	date.setMonth(date.getMonth() - 1);
// const currentMonth = date.getMonth(); // 월 인덱스 0-11
// const currentMonth = MONTHS[currentMonth];
let currentYear = date.getFullYear(); // 올해

let countMonth = MONTHS[date.getMonth() - 1];
console.log(countMonth, '현재 달 뭐게');

// console.log('test2', new Date(1995, 11, 17));
// 해당 날짜의 '요일 월 날짜 연도' 순으로 표기됨: Sun Dec 17 1995 00:00:00 GMT+0900 (한국 표준시)

// let firstDay = new Date(currentYear, currentMonth, 1).getDay();
let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

/**
 * let firstDay = new Date(currentYear, currentMonth, 1).getDay();:
 * 해당 달의 첫 번째 날의 요일
 * currentMonth에 +1하지 않은 이유는 getDay()도 인덱스 0부터 시작해서 ???
 */
console.log(firstDay, '먼데또');
console.log(DAYS[currentDay]);
// console.log(MONTHS[currentMonth]);

console.log(currentDay, 'currentDay요일'); // 요일 인덱스
console.log(currentDate, 'currentDate날짜'); // 날짜 인덱스
// console.log(currentMonth, 'currentMonth');
console.log(currentYear, 'currentYear');

let lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
/**
 * let lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();:
 * 해당 달의 마지막 날의 날짜
 * new Date(currentYear, currentMonth + 1, 0)에 해당되는 날(=달의 마지막 날)의 날짜 반환
 * currentMonth가 인덱스 0부터 시작하기 때문에
 */
console.log(lastDate, 'lastDate');
console.log(MONTHS[date.getMonth()], 'MONTHS[date.getMonth()]');

// ------------------------------------------

function calendarTitle() {
  // $titleSection.innerHTML = MONTHS[date.getMonth()];
}
calendarTitle();

function calendarDay() {
  $trDays.innerHTML = DAYS.map(
    (day, idx) => `<th class='th-day'>${day}</th>`
  ).join('');
}

calendarDay();

date.getMonth(1);
function calendarDate() {
  // date.setDate(1);
  date.setMonth(date.getMonth(1));
  firstDay = new Date(date.getFullYear(), date.getMonth(), 0).getDay();
  lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

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
    if (i === calendarDate && date.getMonth() === new Date().getMonth()) {
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

  // console.log('test', new Date('December 17, 1995'));
  // console.log('test2', new Date(1995, 11, 17)); // 해당 날짜의 '요일 월 날짜 연도' 순으로 표기됨: Sun Dec 17 1995 00:00:00 GMT+0900 (한국 표준시)
}
calendarDate();

function prevMonth() {
  countMonth = MONTHS[date.getMonth() - 1];
  console.log(countMonth, '달-1');
  // calendarTitle();

  date.setMonth(date.getMonth() - 1);
  // firstDay = new Date(currentYear, date.getMonth() - 1, 1).getDay(); // 해당 달의 첫 번째 날의 요일
  /**
   * firstDay 변경:
   * 이전 달 혹은 다음 달로 이동하는 방법으로, 달의 시작일을 기준으로 잡음
   * (달의 시작일 변경)
   */
  // lastDate = new Date(currentYear, date.getMonth(), 0).getDate();

  calendarDate();
}

function nextMonth() {
  firstDay = new Date(currentYear, date.getMonth() + 1, 1).getDay(); // 해당 달의 첫 번째 날의 요일
  lastDate = new Date(currentYear, date.getMonth() + 1, 0).getDate();
  calendarDate();
}

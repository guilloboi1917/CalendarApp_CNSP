export const WEEKDATE = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
export const MONTH = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function getMonth(month){
  return MONTH[month];
}
export function getWeekdate(weekdate){
  return WEEKDATE[weekdate];
}
export function isToday(dateObj1, dateObj2){
  return (dateObj1.day === dateObj2.day && dateObj1.month === dateObj2.month && dateObj1.year === dateObj2.year)
}
export function getDayTask(today, tasks){
  let todayTask = []
  for (let i = 0; i < tasks.length; i++){
    if (isToday(today, tasks[i].date)){
      todayTask.push(tasks[i]);
    }
  }
  return todayTask;
}

export function getDaysArray(month, year){
  const prevMonth = (month - 1 > 1 ? month - 1 : 12)
  const prevYear = (prevMonth === 12 ? year - 1: year);
  const nextMonth = (month + 1 > 11 ? 1 : month + 1);
  const nextYear = (nextMonth === 1 ? year + 1: year);
  const numberOfDaysInMonth = new Date(year, month, 0).getDate();
  const numberOfDaysInPrevMonth = new Date(prevYear, prevMonth, 0).getDate();
  let calendar = []
  let startWeekdate = new Date(year + "-" + month + "-1").getDay();
  let currentDay = 1;
  let nextMonthFlag = false;

  for (let row = 0; row < 6; row ++){
    let calendarRow = Array(7).fill(null);
    if (startWeekdate === 7) startWeekdate = 0;
    for (let col = 0; col < 7; col++){
      if (currentDay > numberOfDaysInMonth){
        currentDay = 1;
        nextMonthFlag = true;
      }

      if (col === startWeekdate ){
        if (nextMonthFlag){
          calendarRow[col] = createDateObject(currentDay, nextMonth, nextYear); //add date object here
        }else{
          calendarRow[col] = createDateObject(currentDay, month, year); //add date object here
        }
        currentDay = currentDay + 1;
        startWeekdate = startWeekdate + 1;
      }else{
        calendarRow[col] = createDateObject(numberOfDaysInPrevMonth - startWeekdate + col + 1, prevMonth, prevYear); //add date object here
      }
    }
    calendar.push(calendarRow);
  }
  return calendar;
}
function createDateObject(day, month, year){
  return {
    day: day,
    month: month,
    year: year,
  }
}


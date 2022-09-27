"use strict";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
class DatePicker {
  constructor(datePickerID, callbackFn) {
    this.datePickerID = datePickerID;
    this.callbackFn = callbackFn;
    // Create datepicker:selectedDate month weeksAbbreviation days
    let datePickerElem = document.getElementById(datePickerID);
    datePickerElem.className = "date-picker";
    // SelectedDate
    let selectedDateElem = document.createElement("div");
    selectedDateElem.className = "selected-date";
    selectedDateElem.textContent = "2022 / 06 / 25";
    datePickerElem.appendChild(selectedDateElem);
    // Month: < , cur-mth, >
    let monthElem = document.createElement("div");
    monthElem.className = "month";
    datePickerElem.appendChild(monthElem);
    let prevMonthArrowElem = document.createElement("div");
    prevMonthArrowElem.className = "prev-mth arrow";
    prevMonthArrowElem.textContent = "<";
    monthElem.appendChild(prevMonthArrowElem);
    let curMonthElem = document.createElement("div");
    curMonthElem.className = "cur-mth";
    curMonthElem.textContent = "June 2022";
    monthElem.appendChild(curMonthElem);
    let nextMonthArrowElem = document.createElement("div");
    nextMonthArrowElem.className = "next-mth arrow";
    nextMonthArrowElem.textContent = ">";
    monthElem.appendChild(nextMonthArrowElem);
    // we also need to set the onclick callback functions for arrows
    prevMonthArrowElem.addEventListener("click", () => {
      if (this.month == 0) {
        this.year -= 1;
        this.month = 11;
      } else {
        this.month -= 1;
      }
      document.querySelector(`#${this.datePickerID} .cur-mth`).textContent = `${
        months[this.month]
      } ${this.year}`;
      this.populateDays();
    });
    nextMonthArrowElem.addEventListener("click", () => {
      if (this.month == 11) {
        this.year += 1;
        this.month = 0;
      } else {
        this.month += 1;
      }
      document.querySelector(`#${this.datePickerID} .cur-mth`).textContent = `${
        months[this.month]
      } ${this.year}`;
      this.populateDays();
    });
    // WeeksAbbreviation
    let weekAbbrevsElem = document.createElement("div");
    weekAbbrevsElem.className = "week-abbrevs";
    datePickerElem.appendChild(weekAbbrevsElem);
    const weekAbbrevs = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    for (let weekAbbrev of weekAbbrevs) {
      let weekAbbrevElem = document.createElement("div");
      weekAbbrevElem.className = "week-abbrev";
      weekAbbrevElem.textContent = weekAbbrev;
      weekAbbrevsElem.appendChild(weekAbbrevElem);
    }
    // Create container of days
    let daysInCurMthElem = document.createElement("div");
    daysInCurMthElem.className = "days-in-cur-month";
    datePickerElem.appendChild(daysInCurMthElem);
    // onclick of selected-date: toggle display
    selectedDateElem.addEventListener("click", () => {
      if (weekAbbrevsElem.style.display != "none") {
        weekAbbrevsElem.style.display = "none";
        daysInCurMthElem.style.display = "none";
      } else {
        weekAbbrevsElem.style.display = "grid";
        daysInCurMthElem.style.display = "grid";
      }
    });
  }

  render(date) {
    // first we set the selectedDate to date
    document.querySelector(`#${this.datePickerID} .selected-date`).textContent =
      formatDate(date);
    // We assume render is always called first
    this.initDate = date;
    this.month = date.getMonth();
    this.year = date.getFullYear();
    this.selectedMonth = this.month;
    this.selectedYear = this.year;
    document.querySelector(`#${this.datePickerID} .cur-mth`).textContent = `${
      months[this.month]
    } ${this.year}`;
    this.populateDays();
  }

  populateDays() {
    let daysContainerElem = document.querySelector(
      `#${this.datePickerID} .days-in-cur-month`
    );
    daysContainerElem.innerHTML = "";
    let days = getDaysInThisMonth(this.year, this.month);
    // note that 1st day of the month is not always the first day of the first week in the month
    // Also,days in the last week of the month are not always in the month.
    // Done: 因为第一天是SUN,所以周五的Index应该是5，而不是4
    let weekDayOfFirstDay = new Date(this.year, this.month, 0).getDay() + 1;
    // Done: 这里加1了，那如果是周日，显示为7，合理嘛？
    let weekDayOfLastDay =
      (new Date(this.year, this.month, days - 1).getDay() + 1) % 7;
    // In the former case, we also need to know what day it is the day before the first day in this month
    let preDayMonth = this.month - 1;
    let preDayYear = this.year;
    if (preDayMonth === -1) {
      preDayYear--;
      preDayMonth = 11;
    }
    let preDayDay = getDaysInThisMonth(preDayYear, preDayMonth) - 1;
    let i = 0;
    while (i < weekDayOfFirstDay) {
      // if the first day in this month isn't first day in a week,we should put days in last month in this week
      let theDay = preDayDay - (weekDayOfFirstDay - i) + 1 + 1;
      let dayElem = document.createElement("div");
      dayElem.textContent = `${theDay}`;
      dayElem.className = "day";
      dayElem.classList.add("not-this-month");
      i++;
      daysContainerElem.appendChild(dayElem);
    }
    for (let i = 0; i < days; i++) {
      let theDay = i + 1;
      let dayElem = document.createElement("div");
      dayElem.textContent = `${theDay}`;
      dayElem.className = "day";
      dayElem.addEventListener("click", (e) => {
        // when this day is clicked, we first remove "selected" class from any that was once clicked
        // TODO: maybe下面这两行可以用map()之类的函数式的方式写的更简单一点
        let selectedDays = document.querySelectorAll(
          `#${this.datePickerID} .selected`
        );
        for (let j = 0; j < selectedDays.length; j++) {
          selectedDays[j].classList.remove("selected");
        }
        e.target.classList.add("selected");
        this.selectedDay = theDay;
        this.selectedMonth = this.month;
        this.selectedYear = this.year;
        document.querySelector(
          `#${this.datePickerID} .selected-date`
        ).textContent = formatDate(
          new Date(this.selectedYear, this.selectedMonth, this.selectedDay)
        );
        this.callbackFn(this.datePickerID, {
          month: this.selectedMonth + 1,
          year: this.selectedYear,
          day: this.selectedDay,
        });
      });
      daysContainerElem.appendChild(dayElem);
    }
    i = weekDayOfLastDay + 1;
    while (i < 7) {
      let theDay = i - weekDayOfLastDay;
      let dayElem = document.createElement("div");
      dayElem.textContent = `${theDay}`;
      dayElem.className = "day";
      dayElem.classList.add("not-this-month");
      i++;
      daysContainerElem.appendChild(dayElem);
    }
  }
}

function formatDate(d) {
  let day = d.getDate();
  if (day < 10) {
    day = "0" + day;
  }

  let month = d.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }

  let year = d.getFullYear();

  return year + " / " + month + " / " + day;
}

function getDaysInThisMonth(year, month) {
  let days = daysOfMonth[month];
  if (
    month == 1 &&
    (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0))
  ) {
    days += 1;
  }
  return days;
}

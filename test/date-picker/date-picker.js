(function () {
  let months = [
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

  // init variables, (month,day,year) controls what month should the calendar show.
  // (selectedDay,selectedMonth,selectedYear) shows what date we just clicked
  let now = new Date();
  let month = now.getMonth();
  let year = now.getFullYear();
  let day = now.getDay();
  let selectedDay = day;
  let selectedMonth = month;
  let selectedYear = year;

  const daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  populateDays();

  document.getElementsByClassName("selected-date")[0].textContent =
    formatDate(now);
  // let currentMonth = document.getElementById("cur-mth").textContent;
  // let [month, year] = currentMonth.split(" ");
  // alert(`month is ${month} , year is ${year}`);

  document.getElementById("prev-mth").addEventListener("click", () => {
    if (month == 0) {
      year -= 1;
      month = 11;
    } else {
      month -= 1;
    }
    document.getElementById("cur-mth").textContent = `${months[month]} ${year}`;
    populateDays();
  });

  document.getElementById("next-mth").addEventListener("click", () => {
    if (month == 11) {
      year += 1;
      month = 0;
    } else {
      month += 1;
    }
    document.getElementById("cur-mth").textContent = `${months[month]} ${year}`;
    populateDays();
  });

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

  function populateDays() {
    let days = getDaysInThisMonth(year, month);

    let daysContainerElem =
      document.getElementsByClassName("days-in-cur-month")[0];
    daysContainerElem.innerHTML = "";

    // note that 1st day of the month is not always the first day of the first week in the month
    // Also,days in the last week of the month are not always in the month.
    let weekDayOfFirstDay = new Date(year, month, 0).getDay();
    let weekDayOfLastDay = new Date(year, month, days - 1).getDay();
    // In the former case, we also need to know what day it is the day before the first day in this month
    let preDayMonth = month - 1;
    let preDayYear = year;
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
        let selectedDays = document.getElementsByClassName("selected");
        for (let j = 0; j < selectedDays.length; j++) {
          selectedDays[j].classList.remove("selected");
        }
        e.target.classList.add("selected");
        selectedDay = theDay;
        selectedMonth = month;
        selectedYear = year;
        document.getElementsByClassName("selected-date")[0].textContent =
          formatDate(new Date(selectedYear, selectedMonth, selectedDay));
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
})();

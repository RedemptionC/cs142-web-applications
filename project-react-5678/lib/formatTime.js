export default function formatTime(ISODate) {
  let date = new Date(ISODate);
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
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
  return `${weekDays[date.getDay()]}, ${
    months[date.getMonth()]
  } ${date.getDate()} , ${date.getFullYear()}`;
}

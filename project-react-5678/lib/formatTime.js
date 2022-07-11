export default function formatTime(ISODate) {
  let date = new Date(ISODate);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

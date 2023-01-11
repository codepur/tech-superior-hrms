const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const days = date.getDay();
const daysInMonth = new Date(year, month + 1, 0).getDate();
console.log(daysInMonth, month,year,date,days)

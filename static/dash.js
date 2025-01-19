// Update local time every second
function updateLocalTime() {
  document.getElementById('local-time').textContent =
    new Date().toLocaleTimeString();
}
setInterval(updateLocalTime, 1000);
updateLocalTime(); // Initial call to set the time immediately

// Simple Calendar
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function generateCalendar() {
  const today = new Date();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  document.getElementById(
    'calendar-header',
  ).textContent = `${monthNames[currentMonth]} ${currentYear}`;

  let calendarHTML =
    '<table><thead><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr></thead><tbody>';
  let day = 1;

  for (let row = 0; row < 6; row++) {
    calendarHTML += '<tr>';
    for (let col = 0; col < 7; col++) {
      if (row === 0 && col < firstDay) {
        calendarHTML += '<td></td>';
      } else if (day <= daysInMonth) {
        const currentDate = new Date(currentYear, currentMonth, day)
          .toISOString()
          .split('T')[0];
        const isToday = currentDate === today.toISOString().split('T')[0];

        calendarHTML += `<td class="${isToday ? 'today' : ''}">${day}</td>`;
        day++;
      } else {
        calendarHTML += '<td></td>';
      }
    }
    calendarHTML += '</tr>';
    if (day > daysInMonth) break;
  }
  calendarHTML += '</tbody></table>';
  document.getElementById('calendar').innerHTML = calendarHTML;
}

generateCalendar();

// Handle prev and next month buttons
document.getElementById('prev-month').addEventListener('click', () => {
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  if (currentMonth === 11) currentYear--;
  generateCalendar();
});

document.getElementById('next-month').addEventListener('click', () => {
  currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  if (currentMonth === 0) currentYear++;
  generateCalendar();
});

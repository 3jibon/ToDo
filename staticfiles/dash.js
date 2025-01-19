// Update local time every second
function updateLocalTime() {
  const time = new Date().toLocaleTimeString();
  document.getElementById('local-time').textContent = time;
}

setInterval(updateLocalTime, 1000);
updateLocalTime(); // Initial call to set the time immediately

// Example tasks (replace with dynamic data from your app)
const tasks = [
  { name: 'Finish report', dueDate: '2025-01-09', status: 'today' },
  { name: 'Buy groceries', dueDate: '2025-01-10', status: 'pending' },
  { name: 'Call mom', dueDate: '2025-01-08', status: 'overdue' },
];

// Function to categorize tasks
function categorizeTasks(tasks) {
  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  const todayTasks = [];
  const pendingTasks = [];
  const overdueTasks = [];

  tasks.forEach((task) => {
    if (task.dueDate === today) {
      todayTasks.push(task);
    } else if (new Date(task.dueDate) > new Date(today)) {
      pendingTasks.push(task);
    } else {
      overdueTasks.push(task);
    }
  });

  return { todayTasks, pendingTasks, overdueTasks };
}

// Function to render tasks
function renderTasks() {
  const { todayTasks, pendingTasks, overdueTasks } = categorizeTasks(tasks);

  const todayList = document.getElementById('today-tasks');
  const pendingList = document.getElementById('pending-tasks');
  const overdueList = document.getElementById('overdue-tasks');

  // Clear previous list items and render tasks dynamically
  todayList.innerHTML = todayTasks
    .map((task) => `<li>${task.name}</li>`)
    .join('');
  pendingList.innerHTML = pendingTasks
    .map((task) => `<li>${task.name}</li>`)
    .join('');
  overdueList.innerHTML = overdueTasks
    .map((task) => `<li>${task.name}</li>`)
    .join('');
}

renderTasks();

// Simple Calendar (basic structure)
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function generateCalendar() {
  const today = new Date();
  const month = currentMonth; // Current month (0-11)
  const year = currentYear; // Current year
  const firstDay = new Date(year, month, 1).getDay(); // First day of the month
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Days in current month

  // Array of month names for display
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

  // Update the calendar header with the actual month and year
  const calendarHeader = document.getElementById('calendar-header');
  calendarHeader.textContent = `${monthNames[month]} ${year}`;

  // Rest of the calendar rendering
  let calendarHTML = '<table>';
  calendarHTML +=
    '<thead><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr></thead><tbody>';

  let day = 1;
  for (let row = 0; row < 6; row++) {
    calendarHTML += '<tr>';
    for (let col = 0; col < 7; col++) {
      if (row === 0 && col < firstDay) {
        calendarHTML += '<td></td>'; // Empty cells before the first day of the month
      } else if (day <= daysInMonth) {
        const currentDate = new Date(year, month, day)
          .toISOString()
          .split('T')[0];
        const isToday = currentDate === today.toISOString().split('T')[0];

        // Add class for today’s date
        calendarHTML += `<td class="${isToday ? 'today' : ''}">${day}</td>`;
        day++;
      } else {
        calendarHTML += '<td></td>'; // Empty cells after the last day of the month
      }
    }
    calendarHTML += '</tr>';
    if (day > daysInMonth) break; // Stop generating cells once we’ve reached the last day
  }
  calendarHTML += '</tbody></table>';
  document.getElementById('calendar').innerHTML = calendarHTML;
}

generateCalendar();

// Handle prev and next month buttons
document.getElementById('prev-month').addEventListener('click', () => {
  currentMonth = (currentMonth - 1 + 12) % 12;
  if (currentMonth === 11) currentYear--; // Decrease year if previous month is December
  generateCalendar();
});

document.getElementById('next-month').addEventListener('click', () => {
  currentMonth = (currentMonth + 1) % 12;
  if (currentMonth === 0) currentYear++; // Increase year if next month is January
  generateCalendar();
});

// Attach the event listener only if the element exists
const regLogElement = document.getElementById('reg-log');


if (regLogElement) {
  regLogElement.addEventListener('change', function () {
    if (this.checked) {
      // When checked, change the URL to the signup page
      window.history.pushState({}, '', '/signup');
    } else {
      // When unchecked, revert to the login page
      window.history.pushState({}, '', '/login');
    }
  });
}

// Ensure no interference with /admin paths
if (window.location.pathname.startsWith('/admin')) {
  console.log("Admin page detected. Skipping toggle logic.");
}

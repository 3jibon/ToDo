// Ensure the logic does not interfere with admin pages
if (!window.location.pathname.startsWith('/admin')) {
  // Find the element with ID 'reg-log'
  const regLogElement = document.getElementById('reg-log');

  // Check if the element exists
  if (regLogElement) {
    // Ensure the browser supports the history API
    if (window.history && window.history.pushState) {
      // Attach the 'change' event listener
      regLogElement.addEventListener('change', function () {
        if (this.checked) {
          // Update the URL to '/signup' when checked
          window.history.pushState({}, '', '/signup');
        } else {
          // Update the URL to '/login' when unchecked
          window.history.pushState({}, '', '/login');
        }
      });
    } else {
      console.error(
        'The browser does not support the history API. URL change functionality will not work.',
      );
    }
  } else {
    console.warn(
      "The element with ID 'reg-log' is not found. No toggle logic applied.",
    );
  }
} else {
  console.log('Admin page detected. Skipping toggle logic.');
}

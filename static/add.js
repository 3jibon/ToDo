// Initialize tooltips for Bootstrap 5
document.addEventListener('DOMContentLoaded', function () {
  var tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]',
  );
  var tooltipList = [...tooltipTriggerList].map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Event handler for the "due date" button click
  document.querySelectorAll('.due-date-button').forEach(function (button) {
    button.addEventListener('click', function () {
      // Show clear icon and hide set icon
      this.classList.add('d-none');
      document
        .querySelectorAll('.clear-due-date-button')
        .forEach(function (clearButton) {
          clearButton.classList.remove('d-none');
        });
    });
  });

  // Event handler for the "clear due date" button click
  document
    .querySelectorAll('.clear-due-date-button')
    .forEach(function (button) {
      button.addEventListener('click', function () {
        // Show set icon and hide clear icon
        this.classList.add('d-none');
        document
          .querySelectorAll('.due-date-button')
          .forEach(function (setButton) {
            setButton.classList.remove('d-none');
          });
      });
    });
});

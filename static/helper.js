document.addEventListener('DOMContentLoaded', function () {
  const horiSelector = document.querySelector('.hori-selector');
  const navItems = document.querySelectorAll(
    '#navbarSupportedContent .nav-item',
  );

  // Update the horizontal selector to the current active item
  function updateHorizontalSelector() {
    const activeItem = document.querySelector(
      '#navbarSupportedContent .nav-item.active',
    );
    if (activeItem && horiSelector) {
      const itemRect = activeItem.getBoundingClientRect();
      const parentRect = activeItem.parentElement.getBoundingClientRect();

      // Update the selector's dimensions and position
      horiSelector.style.width = `${itemRect.width}px`;
      horiSelector.style.left = `${itemRect.left - parentRect.left}px`;
    }
  }

  // Set the default active item if none is active
  const defaultActiveItem =
    document.querySelector('#navbarSupportedContent .nav-item.active') ||
    document.querySelector('#navbarSupportedContent .nav-item:first-child');
  if (defaultActiveItem) {
    defaultActiveItem.classList.add('active');
  }

  // Set the initial position of the horizontal selector
  updateHorizontalSelector();

  // Update the selector when a menu item is clicked
  navItems.forEach((item) => {
    item.addEventListener('click', function () {
      // Remove 'active' class from all nav-items
      navItems.forEach((nav) => nav.classList.remove('active'));
      // Add 'active' class to the clicked item
      this.classList.add('active');

      // Call updateHorizontalSelector after a short delay to ensure DOM update
      setTimeout(updateHorizontalSelector, 50);
    });
  });

  // Update the selector on window resize to maintain correct position
  window.addEventListener('resize', updateHorizontalSelector);

  // Update the horizontal selector on page load
  setTimeout(updateHorizontalSelector, 300);
});

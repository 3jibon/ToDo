// Ensure the horizontal selector aligns correctly with the active menu item
function updateHorizontalSelector() {
  const activeItem = document.querySelector('.navbar-nav .active');
  const horiSelector = document.querySelector('.hori-selector');
  if (activeItem && horiSelector) {
    const itemRect = activeItem.getBoundingClientRect();
    horiSelector.style.width = `${itemRect.width}px`;
    horiSelector.style.left = `${activeItem.offsetLeft}px`;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  updateHorizontalSelector();

  // Adjust selector on window resize
  window.addEventListener('resize', updateHorizontalSelector);

  // Update selector on navbar clicks
  const navItems = document.querySelectorAll('.navbar-nav .nav-item');
  navItems.forEach((item) => {
    item.addEventListener('click', function () {
      document
        .querySelectorAll('.navbar-nav .nav-item')
        .forEach((i) => i.classList.remove('active'));
      this.classList.add('active');
      updateHorizontalSelector();
    });
  });
});

// jQuery version for navbar active selector animation
$(document).ready(function () {
  // Set the default active item based on the URL
  const path = window.location.pathname.split('/').pop() || 'dashboard';

  $('#navbarSupportedContent ul li a').each(function () {
    const linkPath = $(this).attr('href').split('/').pop();
    if (linkPath === path) {
      $(this).parent().addClass('active');
    }
  });

  // Initial setup for the horizontal selector
  updateHorizontalSelector();

  // Handle smooth resize events
  $(window).on('resize', function () {
    setTimeout(updateHorizontalSelector, 300);
  });

  // Handle click events for navbar items
  $('#navbarSupportedContent').on('click', 'li', function () {
    // Get the current active item and the new item
    const currentSelector = $('.hori-selector');
    const previousLeft = currentSelector.position().left;

    // Remove active class from all items and add to the clicked item
    $('#navbarSupportedContent ul li').removeClass('active');
    $(this).addClass('active');

    // Get the new active item position and size
    const activeItemNewAnim = $(this);
    const itemPosNewAnimLeft = activeItemNewAnim.position().left;

    // If the clicked item is to the right of the current item, move to the right
    if (itemPosNewAnimLeft > previousLeft) {
      // Apply the smooth transition from current to next position
      currentSelector.css({
        transition: 'none', // Temporarily remove the transition
        left: previousLeft + 'px', // Keep the current position
      });

      setTimeout(function () {
        // Apply the final transition to the new position (rightward)
        currentSelector.css({
          transition: 'all 0.4s ease', // Apply smooth transition
          left: itemPosNewAnimLeft + 'px', // New target position (rightward)
        });
      }, 10); // Brief delay before applying the transition
    }
    // If the clicked item is to the left (or on the same position), no animation needed
    else {
      currentSelector.css({
        transition: 'all 0.4s ease', // Apply smooth transition
        left: itemPosNewAnimLeft + 'px', // Direct move to the new position
      });
    }
  });

  // Smooth transition after toggling the navbar in mobile view
  $('.navbar-toggler').on('click', function () {
    setTimeout(updateHorizontalSelector, 300);
  });
});

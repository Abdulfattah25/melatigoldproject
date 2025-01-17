
      // Session check
      if (!sessionStorage.getItem('isLoggedIn')) {
          window.location.href = 'login.html';
      }
  
      // Add logout handler
      document.addEventListener('DOMContentLoaded', function() {
          const logoutButton = document.querySelector('button:contains("Logout")');
          if (logoutButton) {
              logoutButton.addEventListener('click', function() {
                  sessionStorage.removeItem('isLoggedIn');
                  window.location.href = 'login.html';
              });
          }
      });

      // Add click event to logout button
  document.querySelector('button:contains("Logout")').addEventListener('click', function() {
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = 'Login.html';
  });
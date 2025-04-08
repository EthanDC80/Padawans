"use strict";

// const { debug } = require("console");
var timeInput = document.getElementById('time');
var emailInput = document.getElementById('email');
var messageInput = document.getElementById('message');
var countdownDisplay = document.getElementById('countdown');
startButton.addEventListener('click', function () {
  var assignmentId = assignmentDropdown.value;
  var minutes = parseInt(timeInput.value);
  var email = emailInput.value;
  var message = messageInput.value; // Get the message from the textarea

  if (!assignmentId || isNaN(minutes) || !email || !message) {
    // Check if all fields are filled out
    alert('Please fill out all fields.');
    return;
  }

  var endTime = Date.now() + minutes * 60 * 1000;
  var checkTimer = setInterval(function () {
    var remainingTime = endTime - Date.now();

    if (remainingTime <= 0) {
      clearInterval(checkTimer);
      countdownDisplay.textContent = '00:00';
      checkSubmission(assignmentId, email, message);
    } else {
      var minutesLeft = Math.floor(remainingTime / 60000);
      var secondsLeft = Math.floor(remainingTime % 60000 / 1000);
      countdownDisplay.textContent = "".concat(String(minutesLeft).padStart(2, '0'), ":").concat(String(secondsLeft).padStart(2, '0'));
    }
  }, 1000);
  alert("Timer set for ".concat(minutes, " minutes."));
});

function checkSubmission(assignmentId, email, message) {
  fetch("https://canvas.instructure.com/api/v1/courses/".concat(courseDropdown.value, "/assignments/").concat(assignmentId, "/submissions/self"), options).then(function (response) {
    return response.json();
  }).then(function (submission) {
    if (!submission.submitted_at) {
      getUserName().then(function (name) {
        console.log('Fetched name:', name);

        if (name) {
          sendEmailNotification(email, name, message); // Use it here
        }
      });
    } else {
      alert('Assignment submitted on time!');
    }
  })["catch"](function (error) {
    return console.error('Error checking submission:', error);
  });
} // function sendEmailNotification(email) {
//   const name = localStorage.getItem('userName');
//   fetch('/send-email', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, name })
//   })
//   .then(() => alert('Email sent to your accountability partner.'))
//   .catch(error => console.error('Error sending email:', error));
// }


function sendEmailNotification(email, name, message) {
  var templateParams = {
    name: name,
    email: email,
    message: message
  };
  emailjs.send('default_service', 'template_a87gs8q', templateParams).then(function (response) {
    console.log('SUCCESS!', response.status, response.text);
    alert('Email sent to your accountability partner.');
  }, function (error) {
    console.error('FAILED...', error);
    alert('Failed to send email. Please try again.');
  });
}

function getUserName() {
  var response, data, userName;
  return regeneratorRuntime.async(function getUserName$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch('https://canvas.instructure.com/api/v1/users/self/profile', options));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context.sent;
          userName = data.name;
          localStorage.setItem('userName', userName); // Store it

          return _context.abrupt("return", userName);

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error('Error fetching user name:', _context.t0);
          return _context.abrupt("return", null);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
}

getUserName();
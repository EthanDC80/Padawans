// const { debug } = require("console");

const timeInput = document.getElementById('time');
const emailInput = document.getElementById('email');

startButton.addEventListener('click', () => {
  const assignmentId = assignmentDropdown.value;
  const minutes = parseInt(timeInput.value);
  const email = emailInput.value;
  
  if (!assignmentId || isNaN(minutes) || !email) {
    alert('Please fill out all fields.');
    return;
  }

  const endTime = Date.now() + minutes * 60 * 1000;

  const checkTimer = setInterval(() => {
    const remainingTime = endTime - Date.now();
    if (remainingTime <= 0) {
      clearInterval(checkTimer);
      checkSubmission(assignmentId, email);
    }
  }, 1000);

  alert(`Timer set for ${minutes} minutes.`);
});

function checkSubmission(assignmentId, email) {
  fetch(`https://canvas.instructure.com/api/v1/courses/${courseDropdown.value}/assignments/${assignmentId}/submissions/self`, options)
    .then(response => response.json())
    .then(submission => {
      if (!submission.submitted_at) {
        getUserName().then(name => {
          console.log('Fetched name:', name);
          if (name) {
            sendEmailNotification(email, name); // Use it here
          }
        });
      } else {
        alert('Assignment submitted on time!');
      }
    })
    .catch(error => console.error('Error checking submission:', error));
}

// function sendEmailNotification(email) {
//   const name = localStorage.getItem('userName');
  
//   fetch('/send-email', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, name })
//   })
//   .then(() => alert('Email sent to your accountability partner.'))
//   .catch(error => console.error('Error sending email:', error));
// }

function sendEmailNotification(email, name) {

  var templateParams = {
    name: name,
    email: email,
  };
  emailjs.send('default_service', 'template_a87gs8q', templateParams).then(
    (response) => {
      console.log('SUCCESS!', response.status, response.text);
      alert('Email sent to your accountability partner.');
    },
    (error) => {
      console.error('FAILED...', error);
      alert('Failed to send email. Please try again.');
    }
  );
}


async function getUserName() {
  try {
    const response = await fetch('https://canvas.instructure.com/api/v1/users/self/profile', options);
    const data = await response.json();
    const userName = data.name;
    localStorage.setItem('userName', userName); // Store it
    return userName; // Return it for immediate use
  } catch (error) {
    console.error('Error fetching user name:', error);
    return null;
  }
}

getUserName();

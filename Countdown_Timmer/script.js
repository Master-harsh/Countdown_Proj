// Select DOM elements
const DateInput = document.getElementById("Date");
const TimeInput = document.getElementById("Time");
const StartBtn = document.getElementById("start");
const StopBtn = document.getElementById("stop");
const ResetBtn = document.getElementById("reset");

const Days = document.getElementById("days");
const Hours = document.getElementById("hours");
const Minuts = document.getElementById("minuts");
const Seconds = document.getElementById("second");

let countdownInterval; // Variable to store the interval ID

// Function to update and display the countdown
function UpdateCountdown() {
  const currentTime = new Date(); // Get current time

  const dateValue = DateInput.value; // e.g., "2024-12-31"
  const timeValue = TimeInput.value; // e.g., "23:59"

  if (!dateValue || !timeValue) {
    alert("Please select both date and time!");
    clearInterval(countdownInterval);
    return;
  }

  const targetDateTime = new Date(`${dateValue}T${timeValue}:00`); // Combine date and time into a Date object

  const timeDifference = targetDateTime - currentTime; // Calculate the difference in milliseconds

  if (timeDifference <= 0) {
    clearInterval(countdownInterval); // Stop the countdown
    displayTime(0, 0, 0, 0); // Display "00:00:00:00"
    alert("Countdown Completed!"); // Show a message
    return;
  }

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Update the countdown display
  displayTime(days, hours, minutes, seconds);
}

// Function to display the countdown time in the respective elements
function displayTime(days, hours, minutes, seconds) {
  Days.textContent = days.toString().padStart(2, "0");
  Hours.textContent = hours.toString().padStart(2, "0");
  Minuts.textContent = minutes.toString().padStart(2, "0");
  Seconds.textContent = seconds.toString().padStart(2, "0");
}

// Function to start the countdown
function startCountdown() {
  clearInterval(countdownInterval); // Clear any existing interval to prevent duplicates
  UpdateCountdown(); // Update the countdown immediately
  countdownInterval = setInterval(UpdateCountdown, 1000); // Update every second
}

// Function to stop the countdown
function stopCountdown() {
  clearInterval(countdownInterval); // Stop the countdown
}

// Function to reset the countdown
function resetCountdown() {
  clearInterval(countdownInterval); // Stop the countdown
  DateInput.value = ""; // Clear date input
  TimeInput.value = ""; // Clear time input
  displayTime(0, 0, 0, 0); // Reset the display to "00:00:00:00"
}

// Add event listeners to the buttons
StartBtn.addEventListener("click", startCountdown); // Start button click event
StopBtn.addEventListener("click", stopCountdown); // Stop button click event
ResetBtn.addEventListener("click", resetCountdown); // Reset button click event

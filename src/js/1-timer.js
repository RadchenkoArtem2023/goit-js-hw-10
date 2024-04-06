import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datePickerInput = document.querySelector('input#datetime-picker');
const startButton = document.querySelector('.start-btn');

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    handleSelectedDate(selectedDates);
  },
};

let userSelectedDateInstance = flatpickr(datePickerInput, flatpickrOptions);

function handleSelectedDate(selectedDates) {
  if (selectedDates[0] <= new Date()) {
    startButton.disabled = true;
    displayErrorMessage('Error');
  } else {
    startButton.disabled = false;
  }
}

let intervalId;

console.log(userSelectedDateInstance.selectedDates[0].getTime());

function startTimer() {
  clearInterval(intervalId);
  let currentDate = new Date();
  let timeDifference = userSelectedDateInstance.selectedDates[0] - currentDate;
  updateTimerDisplay(timeDifference);

  intervalId = setInterval(() => {
    updateTimerDisplay(timeDifference);

    if (timeDifference <= 0) {
      clearInterval(intervalId);
      displaySuccessMessage('Success!');
    }

    timeDifference -= 1000;
  }, 1000);
}

function displaySuccessMessage(message) {
  iziToast.success({
    title: 'Success',
    message: message,
  });
}

function displayErrorMessage(message) {
  iziToast.error({
    title: 'Error',
    message: message,
  });
}

function updateElement(selector, value) {
  document.querySelector(selector).textContent =
    value >= 0 ? addLeadingZero(value) : '00';
}

function updateTimerDisplay(timeDifference) {
  const { days, hours, minutes, seconds } = convertMilliseconds(timeDifference);
  updateElement('[data-days]', days);
  updateElement('[data-hours]', hours);
  updateElement('[data-minutes]', minutes);
  updateElement('[data-seconds]', seconds);
}

function convertMilliseconds(timeDifference) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(timeDifference / day);
  // Remaining hours
  const hours = Math.floor((timeDifference % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((timeDifference % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor(
    (((timeDifference % day) % hour) % minute) / second
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

startButton.addEventListener('click', startTimer);
document.addEventListener('DOMContentLoaded', () => {
  startButton.disabled = true;
});

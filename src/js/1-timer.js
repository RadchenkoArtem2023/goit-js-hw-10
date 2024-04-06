import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Оголошуємо змінні
let userSelectedDate;
let countdownInterval;

// Функція для встановлення повідомлення про помилку
function showErrorToast(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
}

// Функція, яка перевіряє, чи обрана користувачем дата у майбутньому
function isFutureDate(selectedDate) {
  const currentDate = new Date();
  return selectedDate.getTime() > currentDate.getTime();
}

// Функція, яка обробляє вибір користувачем дати
function handleDateSelect(selectedDates) {
  const selectedDate = selectedDates[0];
  if (!isFutureDate(selectedDate)) {
    showErrorToast('Please choose a date in the future');
    document.querySelector('[data-start]').disabled = true;
  } else {
    document.querySelector('[data-start]').disabled = false;
    userSelectedDate = selectedDate;
  }
}

// Ініціалізуємо flatpickr з вказаними параметрами
flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: handleDateSelect,
});

// Функція для форматування числа з передпочатковим нулем
function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

// Функція для конвертації мілісекунд у дні, години, хвилини та секунди
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Функція, яка оновлює відображення таймера
function updateTimerDisplay(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}

// Функція, яка розпочинає таймер
function startTimer() {
  const currentTime = new Date().getTime();
  const timeDifference = userSelectedDate.getTime() - currentTime;

  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    updateTimerDisplay(0);
    iziToast.success({
      title: 'Success',
      message: 'Countdown finished!',
      position: 'topRight',
    });
    return;
  }

  countdownInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const timeDifference = userSelectedDate.getTime() - currentTime;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      updateTimerDisplay(0);
      iziToast.success({
        title: 'Success',
        message: 'Countdown finished!',
        position: 'topRight',
      });
    } else {
      updateTimerDisplay(timeDifference);
    }
  }, 1000);

  // Делаем кнопку неактивной и отключаем инпут
  document.querySelector('[data-start]').disabled = true;
  document.querySelector('#datetime-picker').disabled = true;
}

// Прослушиваем клик на кнопке "Start"
document.querySelector('[data-start]').addEventListener('click', startTimer);

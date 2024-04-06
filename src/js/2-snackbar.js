// Підключаємо бібліотеку iziToast
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Отримуємо форму та всі необхідні елементи форми
const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const stateInputs = document.querySelectorAll('input[name="state"]');
const submitButton = document.querySelector('button[type="submit"]');

// Функція для створення промісу
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      setTimeout(() => {
        resolve(delay);
      }, delay);
    } else if (state === 'rejected') {
      setTimeout(() => {
        reject(delay);
      }, delay);
    }
  });
}

// Обробник події при сабміті форми
form.addEventListener('submit', event => {
  event.preventDefault(); // Зупиняємо стандартну поведінку форми

  const delay = parseInt(delayInput.value); // Отримуємо значення затримки
  let state; // Змінна для збереження стану (fulfilled/rejected)

  // Знаходимо обраний стан
  stateInputs.forEach(input => {
    if (input.checked) {
      state = input.value;
    }
  });

  // Створюємо проміс
  const promise = createPromise(delay, state);

  // Обробка виконання промісу
  promise
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
});

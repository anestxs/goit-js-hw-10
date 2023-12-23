import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const delayInput = document.querySelector('input[name="delay"]');
    const delay = parseInt(delayInput.value, 10);

    const stateInput = document.querySelector('input[name="state"]:checked');
    
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => { 
        if (stateInput.value === 'fulfilled') { 
            resolve(delay);
        } else { 
            reject(delay);
        }
      }, delay)
    });

    promise.then(
      (value) => {
        iziToast.success({
          message: `Fulfilled promise in ${value}ms`,
        });
      },
      (value) => {
        iziToast.error({
          message: `Rejected promise in ${value}ms`,
        });
      }
    );
});
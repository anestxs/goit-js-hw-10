import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("#datetime-picker");
const button = document.querySelector("button");
let days = document.querySelector('.value[data-days]');
let hours = document.querySelector('.value[data-hours]');
let minutes = document.querySelector('.value[data-minutes]');
let seconds = document.querySelector('.value[data-seconds]');
let userSelectedDates;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= new Date()) { 
            iziToast.error({
                message: `Please choose a date in the future`,
            });
            button.setAttribute("disabled", true);
        } else { 
            button.removeAttribute("disabled");
            userSelectedDates = selectedDates;
        }
    },
};

const datePicker = flatpickr(input, options);

button.addEventListener("click", () => { 
    const selectedTime = new Date(userSelectedDates).getTime();
    
    button.setAttribute("disabled", true);
    input.setAttribute("disabled", true);
    
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

    function addLeadingZero(value) {
        return String(value).padStart(2, '0');
    }

    const interval = setInterval(() => { 
        let difference = selectedTime - new Date().getTime();
        let gotTime = convertMs(difference);
        
        if (difference > 0) { 
            days.textContent = addLeadingZero(gotTime.days);
            hours.textContent = addLeadingZero(gotTime.hours);
            minutes.textContent = addLeadingZero(gotTime.minutes);
            seconds.textContent = addLeadingZero(gotTime.seconds);
        } else { 
            button.removeAttribute("disabled");
            input.removeAttribute("disabled");
            clearInterval(interval);
        }
    }, 1000);
})
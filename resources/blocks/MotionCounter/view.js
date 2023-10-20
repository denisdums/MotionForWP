import {inView} from "motion";

const counters = {
    countersItems: [],
    init: function () {
        this.countersItems = document.querySelectorAll('.motion-counter');
        this.countersItems.forEach((item) => {
            inView(item, this.handleInView)
        });
    },

    handleInView: function (el) {
        counters.startCounter(el.target);
    },

    startCounter: function (el, speed = 40) {
        const counterNumberText = el.textContent;
        const counterNumberEnd = parseInt(counterNumberText.replace(/\s/g, ''));
        const counterNumberStart = 0;
        const counterNumberStep = Math.ceil((counterNumberEnd - counterNumberStart) / speed);
        let counterNumberCurrent = counterNumberStart;
        let counterNumberInterval = setInterval(function () {
            counterNumberCurrent += counterNumberStep;
            if (counterNumberCurrent >= counterNumberEnd) {
                el.textContent = counterNumberEnd;
                clearInterval(counterNumberInterval);
            } else {
                el.textContent = counterNumberCurrent;
            }
        }, speed);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    counters.init();
});
import config from './config.js';
import utils from './utils.js';

const inputs = {
    umbral: document.getElementById('umbral'),
    splitter: document.getElementById('splitter'),
    w: document.getElementById('w'),
    h: document.getElementById('h'),
    opacity: document.getElementById('opacity'),
    acceleration: document.getElementById('acceleration'),
    deceleration: document.getElementById('deceleration'),
    brushRadius: document.getElementById('brushRadius')
};

Object.keys(inputs).forEach(key => {
    inputs[key].value = config[key];
    inputs[key].nextElementSibling.innerText = config[key];
    inputs[key].addEventListener('input', e => {
        const elem = e.target;
        const brother = elem.nextElementSibling;
        const { value } = elem;
        config[key] = value;
        brother.innerText = value;
        if (utils.v.paused) utils.data = utils.getPixels(config);
    });
});

utils.btn.addEventListener('click', e => {
    utils.data = utils.getPixels(config);
    if (utils.v.paused) {
        utils.v.play();
        utils.btn.classList.add('hide-btn');
    } else {
        utils.v.pause();
        utils.btn.classList.remove('hide-btn');
    }
});

window.addEventListener('keydown', e => {
    const { key } = e;
    const jump = 2;
    const triggers = ({
        ArrowRight() {
            if(utils.v.currentTime < utils.v.duration)
                utils.v.currentTime += jump;
        },
        ArrowLeft() { 
            if(utils.v.currentTime > 0) 
                utils.v.currentTime -= jump;
        }
    })[key];
    if (!document.querySelector('input:focus')) {
        return triggers && triggers();
    }
});

export default inputs;
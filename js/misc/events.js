import config from './config.js';
import utils from './utils.js';

const inputs = {
    umbral: document.getElementById('umbral'),
    splitter: document.getElementById('splitter'),
    w: document.getElementById('w'),
    h: document.getElementById('h'),
    opacity: document.getElementById('opacity')
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
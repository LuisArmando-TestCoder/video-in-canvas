import utils from './misc/utils.js';

import config from './misc/config.js';

import './misc/events.js';

const {
    getPixels,
    scaledHeight,
    yAxis,
    btn,
    v
} = utils;

size();

draw(() => {
    clear();
    if (v.paused && utils.data) {
        return renderGroup('rect', utils.data);
    }
    ctx.drawImage(v, 0, yAxis(), c.width, scaledHeight());
    if (!v.currentTime && !utils.data) utils.data = getPixels(config);
});

btn.addEventListener('click', e => {
    utils.data = getPixels(config);
    if (v.paused) {
        v.play();
        btn.classList.add('hide-btn');
    } else {
        v.pause();
        btn.classList.remove('hide-btn');
    }
});

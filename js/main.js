import utils from './misc/utils.js';

import config from './misc/config.js';

import './misc/events.js';

const {
    getPixels,
    scaledHeight,
    yAxis,
    v
} = utils;

size();
onMouseMove();

draw(() => {
    clear();
    if (v.paused && utils.data) {
        return renderGroup('rect', utils.data, p => {
            if (p.drive <= 0) p.drive = 0;
            else p.drive -= 0.1;
            if (mouse()) {
                const {
                    value: distance,
                    leg1,
                    leg2
                } = getDistanceBetween(mouse()).and(p);
                p.x += -leg1 / 100 * p.drive; // gotta see
                p.y += -leg2 / 100 * p.drive;
                if (distance <= 50) p.drive += 0.2;
            }
        });
    }
    ctx.drawImage(v, 0, yAxis(), c.width, scaledHeight());
    if (!v.currentTime && !utils.data) utils.data = getPixels(config);
});

import utils from './misc/utils.js';
import config from './misc/config.js';
import inputs from './misc/events.js';

import './misc/events.js';

const {
    acceleration,
    deceleration,
    brushRadius
} = inputs;
const {
    getPixels,
    scaledHeight,
    yAxis,
    v,
    // isOutOfTheBox
} = utils;

size();
onMouseMove();

draw(() => {
    clear('#10101099');
    if (v.paused && utils.data) {
        return renderGroup('rect', utils.data, (p, index) => {
            if (p.drive <= 0) p.drive = 0;
            else p.drive -= +deceleration.value;
            if (mouse()) {
                const {
                    value: distance,
                    leg1,
                    leg2
                } = getDistanceBetween(mouse()).and(p);
                p.x += -(p.leg1 || leg1) / 100 * p.drive;
                p.y += -(p.leg2 || leg2) / 100 * p.drive;
                // p.isOutOfTheScreen = isOutOfTheBox(p, c);
                if (distance <= +brushRadius.value) {
                    p.leg1 = leg1;
                    p.leg2 = leg2;
                    p.drive += +acceleration.value;
                }
                // if (p.isOutOfTheScreen) utils.data.splice(index, 1);
            }
            if(p.drive === 0) {
                p.x += (p.original.x - p.x) / 10;
                p.y += (p.original.y - p.y) / 10;
            }
        });
    }
    ctx.drawImage(v, 0, yAxis(), c.width, scaledHeight());
    if (!v.currentTime && !utils.data) utils.data = getPixels(config);
});

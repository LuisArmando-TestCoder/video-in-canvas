const v = document.querySelector('video');
const btn = document.querySelector('button');

const getIMGData = () => ctx.getImageData(0, 0, c.width, c.height).data;
const scaleAxis = (proportion, axis) => axis * proportion;
const proportion = () => c.width / v.videoWidth;
const scaledHeight = () => scaleAxis(proportion(), v.videoHeight);
const yAxis = () => c.height / 2 - scaledHeight() / 2;

let data;

function getPixels({
    umbral = 1,
    splitter = 1,
    opacity = 1,
    w = 1,
    h = 1
}) {
    return getPixelsByUmbral(
        getCanvasPixels(
            getIMGData(), {
                w: c.width,
                h: scaledHeight()
            },
            pixel => {
                const {
                    r,
                    g,
                    b,
                    a
                } = pixel;
                pixel.c = `rgba(${r},${g},${b},${opacity || a})`;
                pixel.w = w;
                pixel.h = h;
                pixel.drive = 0;
            }
        ).filter((_, i) => !(i % splitter)),
        umbral
    );
}

function getCanvasPixels(imgData, {
    w,
    h
}, customizePixel) {
    const canvasPixels = [];
    for (let i = 0; i < imgData.length; i += 4) {
        const item = i / 4;
        const [r, g, b, a, x, y] = [
            imgData[i],
            imgData[i + 1],
            imgData[i + 2],
            imgData[i + 3],
            item % w,
            item / w
        ];
        const pixel = {
            r,
            g,
            b,
            a,
            x,
            y
        };
        if (customizePixel) customizePixel(pixel);
        canvasPixels.push(pixel);
    }
    return canvasPixels;
}

function getPixelsByUmbral(pixels, umbral) {
    return pixels
        .filter(({
            r,
            g,
            b
        }) => (r + g + b) / 3 >= umbral);
}

const utils = {
    data,
    getPixels,
    getIMGData,
    scaleAxis,
    proportion,
    scaledHeight,
    yAxis,
    btn,
    v
};

export default utils;
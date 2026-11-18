import { byId, number } from './ui.js';
import { contain, cover } from './frame.js';

export const suffix = 'planovertical';
export const acceptsImage = false;
export const acceptsAudio = false;
export const looks = [
    { framing: 'crop', zoom: 100, 'position-x': 50, 'position-y': 50 },
    { framing: 'blur', zoom: 100, 'position-x': 50, 'position-y': 50, blur: 24 },
    { framing: 'solid', zoom: 100, 'position-x': 50, 'position-y': 50 }
];

export function readSettings() {
    return {
        mode: byId('framing').value,
        zoom: number('zoom') / 100,
        x: number('position-x') / 100,
        y: number('position-y') / 100,
        blur: number('blur')
    };
}

export function sizeFor() {
    return { width: 720, height: 1280 };
}

function standby(drawing, width, height) {
    const background = drawing.createLinearGradient(0, 0, width, height);
    background.addColorStop(0, '#124843');
    background.addColorStop(.5, '#17342c');
    background.addColorStop(1, '#102025');
    drawing.fillStyle = background;
    drawing.fillRect(0, 0, width, height);
    const band = height * .33;
    drawing.fillStyle = '#225c47';
    drawing.fillRect(0, (height - band) / 2, width, band);
    drawing.strokeStyle = '#b7f2bf9a';
    drawing.lineWidth = 6;
    for (const x of [34, width - 34]) {
        for (const y of [40, height - 40]) {
            drawing.beginPath();
            drawing.moveTo(x, y + (y < height / 2 ? 55 : -55));
            drawing.lineTo(x, y);
            drawing.lineTo(x + (x < width / 2 ? 55 : -55), y);
            drawing.stroke();
        }
    }
    drawing.strokeStyle = '#b7f2bf45';
    drawing.lineWidth = 2;
    for (const x of [width / 3, width * 2 / 3]) {
        drawing.beginPath(); drawing.moveTo(x, 0); drawing.lineTo(x, height); drawing.stroke();
    }
    for (const y of [height / 3, height * 2 / 3]) {
        drawing.beginPath(); drawing.moveTo(0, y); drawing.lineTo(width, y); drawing.stroke();
    }
    drawing.fillStyle = '#d0ffdf';
    drawing.textAlign = 'center';
    drawing.font = '600 62px monospace';
    drawing.fillText('9:16', width / 2, height / 2 + 20);
    drawing.textAlign = 'start';
}

function safeArea(drawing, width, height) {
    const left = Math.round(width * .077);
    const top = Math.round(height * .11);
    const right = Math.round(width * .81);
    const bottom = Math.round(height * .77);
    drawing.save();
    drawing.fillStyle = '#0c241339';
    drawing.fillRect(0, 0, width, top);
    drawing.fillRect(0, bottom, width, height - bottom);
    drawing.fillRect(0, top, left, bottom - top);
    drawing.fillRect(right, top, width - right, bottom - top);
    drawing.strokeStyle = '#c7ffb5d6';
    drawing.lineWidth = 4;
    drawing.setLineDash([16, 12]);
    drawing.strokeRect(left, top, right - left, bottom - top);
    drawing.restore();
}

export function draw(drawing, media, { mode, zoom, x, y, blur }, { width, height, guides }) {
    if (!media) {
        standby(drawing, width, height);
        return;
    }
    drawing.fillStyle = '#111319';
    drawing.fillRect(0, 0, width, height);
    if (mode === 'crop') {
        cover(drawing, media, width, height, zoom, x, y);
        if (guides) safeArea(drawing, width, height);
        return;
    }
    if (mode === 'blur') {
        drawing.filter = 'blur(' + blur + 'px) brightness(.65)';
        cover(drawing, media, width, height, 1.18, x, y);
        drawing.filter = 'none';
    }
    contain(drawing, media, width, height, zoom, x, y);
    if (guides) safeArea(drawing, width, height);
}

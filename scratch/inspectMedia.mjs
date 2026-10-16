import fs from 'fs';

const buf = fs.readFileSync('c:/JEJAKTUMBUH/backsound.mp4');
console.log('backsound.mp4 size:', buf.length);
console.log('First 32 bytes hex:', buf.slice(0, 32).toString('hex'));
console.log('First 32 bytes ascii:', buf.slice(0, 32).toString('utf-8').replace(/[^\x20-\x7E]/g, '.'));

const logoBuf = fs.readFileSync('c:/JEJAKTUMBUH/LOGO SADAQIDS.png');
console.log('LOGO SADAQIDS.png size:', logoBuf.length);
// PNG width and height are at offset 16-24
const width = logoBuf.readUInt32BE(16);
const height = logoBuf.readUInt32BE(20);
console.log(`Logo dimensions: ${width}x${height}`);

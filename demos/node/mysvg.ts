// node svg.js > output.svg

// const Vex = require('vexflow');
import * as Vex from '../../src';
import * as font from '../../src/fonts/load_bravura';
import { Beam, NoteSubGroup, Stave, StaveNote, Renderer } from '../../src';
const { JSDOM } = require('jsdom');

const VF = Vex.Flow;
font.loadBravura();
VF.setMusicFont('Bravura');
const { Renderer, Stave, StaveNote, Formatter } = Vex.Flow;

const dom = new JSDOM('<!DOCTYPE html><html><body><div id="vf"></div><body></html>');

global.document = dom.window.document;

// Create an SVG renderer and attach it to the DIV element named "vf".
const div = document.getElementById('vf') as HTMLDivElement;
const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Configure the rendering context.
renderer.resize(500, 500);
const context = renderer.getContext();
context.setFont('Arial', 10).setBackgroundFillStyle('#eed');

// Create a stave of width 400 at position 10, 40 on the canvas.
const stave = new VF.Stave(10, 40, 400);

// Add a clef and time signature.
stave.addClef('treble').addTimeSignature('4/4');
stave.setContext(context);
stave.draw();
// Connect it to the rendering context and draw!
const notes1 = [
  new StaveNote({ keys: ['c/5'], duration: '16' }),
  new StaveNote({ keys: ['c/5'], duration: '16' }),
  new StaveNote({ keys: ['b/4'], duration: '8' }),
];
const notes2 = [
  new StaveNote({ keys: ['c/5'], duration: '8' }),
  new StaveNote({ keys: ['b/4', 'b/4', 'c/5'], duration: '8' }),
];

var beams = [new VF.Beam(notes1), new VF.Beam(notes2)];

let allnotes = notes1.concat(notes2);
Formatter.FormatAndDraw(context, stave, allnotes);
beams.forEach((beam) => beam.setContext(context).draw());

// const voice = new VF.Voice(Vex.Flow.TIME4_4);
// voice.addTickables(notes);
// formatter.joinVoices([voice]).formatToStave([voice], stave);
// var beam1 = new Vex.Flow.Beam(notes.slice(0, 5));
// beam1.setContext(context).draw();
// voice.draw(context, stave);
//

const svg = div.innerHTML.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');

console.log(svg);

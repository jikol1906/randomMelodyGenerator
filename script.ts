import * as Tone from 'tone';
import { PolySynth } from 'tone';


const allNotes = ["A",
    "A#",
    "B",
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",] as const
type Note = typeof allNotes[number];

const synth = new Tone.PolySynth().toDestination();

const b = document.getElementById("play-button") as HTMLButtonElement
const newB = document.getElementById("new-button") as HTMLButtonElement

b.addEventListener('click', play)
newB.addEventListener('click',newMel);

Tone.Transport.start();

let melody = genMel(); 

function newMel() {
    melody = genMel(); 

}

function play() {
    let playedOnce = true;
    const seq = new Tone.Sequence(function (time, note) {
        synth.triggerAttackRelease(note, "32n", time)
        playedOnce = false;
    }, ["A3",...melody], "8n");
    seq.loop = false;
    //  seq.humanize = true;
    seq.start(Tone.now());


}

function genMel() {
    return shuffle(["C4", ["B3", "D4"], "E4", "F4", shuffle(["G4","C5"]), "B4", "D5", "E5", "F5", "G5"])
}

function shuffle<T>(array: T[]): T[] {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


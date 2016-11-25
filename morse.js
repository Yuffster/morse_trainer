const MorseCodes = {
	"A": ".-",
	"B": "-...",
	"C": "-.-.",
	"D": "-..",
	"E": ".",
	"F": "..-.",
	"G": "--.",
	"H": "....",
	"I": "..",
	"J": ".---",
	"K": "-.-",
	"L": ".-..",
	"M": "--",
	"N": "-.",
	"O": "---",
	"P": ".--.",
	"Q": "--.-",
	"R": ".-.",
	"S": "...",
	"T": "-",
	"U": "..-",
	"W": ".--",
	"X": "-..-",
	"Y": "-.--",
	"Z": "--..",
	"1": ".----",
	"2": "..---",
	"3": "...--",
	"4": "....-",
	"5": ".....",
	"6": "-....",
	"7": "--...",
	"8": "---..",
	"9": "----.",
	"0": "-----"
}

class MorseGenerator {
	constructor(){
		const context_name = '_MORSE_AUDIO_CONTEXT'
		var ac = window[context_name] || new window.AudioContext();
		window[context_name] = ac;
		var vol = ac.createGain();
		vol.connect(ac.destination);
		var osc = ac.createOscillator();
		osc.frequency.value = 440;
		osc.start();
		osc.connect(vol);
		this._vol = vol;
		this._vol.gain.value = 0;
		this._context = ac;
		this._rate = .05;
		this._queued_time = 0;
		this._max_vol = .2;
	}
	char(c) {
		var code = MorseCodes[c.toUpperCase()];
		if (!code) return false;
		var out = [];
		for (let part of code) {
			if (part == '.') out.push(1);
			if (part == '-') out.push(3);
		}
		return out;
	}
	get gain() {
		return this._vol.gain;
	}
	get queued_time() {
		var t = this._queued_time || 0,
		    c = this._context.currentTime;
		return (t > c) ? t : c;
	}
	set queued_time(t) {
		this._queued_time = t;
	}
	get vol() {
		return this._vol.gain;
	}
	setVol(v, t=0) {
		this.vol.setValueAtTime(v*this._max_vol, this.queued_time);
		this.queued_time+=t*this._rate;
	}
	on(t=1) {
		this.setVol(1, t);
		this.setVol(0);
		return this;
	}
	off(t=1) {
		this.setVol(0, t);
		this.queued_time+=t*this._rate;
		return this;
	}
	keyString(str) {
		var t = this.queued_time;
		for (let c of str) {
			let keys = this.char(c);
			if (!keys) continue;
			for (let time of keys) this.on(time).off(1);
			this.off(10);
		}
		return this.queued_time - t;
	}
}
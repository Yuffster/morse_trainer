class Flashcards {

	constructor() {
		this._weights = {};
		this._decay_modifier = .95;
	}

	guess(c, speed=0) {
		c = c.toUpperCase()
		var correct = (this._answer == c);
		if (correct) {
			this._weights[this._answer] -= 3 - speed;
		} else {
			this._weights[this._answer] += speed + 3;
		}
		this.decayWeights();
		return correct;
	}

	nextCard() {
		var c = this.pick();
		this._answer = c;
		return {
			char: c,
			morse: MorseCodes[c]
		};
	}

	get answer() {
		return this._answer;
	}

	pick() {
		var total = 0;
		var ranges = [];
		for (let k in this._weights) {
			total += this._weights[k];
			ranges.push([k, total]);
		}
		var n = Math.floor(Math.random()*total);
		for (let r of ranges) {
			let [k, range] = r;
			if (range >= n) {
				return k;
			}
		}
	}

	addCharacter(c) {
		c = c.toUpperCase();
		this._weights[c] = 10;
	}

	decayWeights() {
		for (let k in this._weights) {
			this._weights[k] = this._weights[k] * this._decay_modifier;
		}
	}

}
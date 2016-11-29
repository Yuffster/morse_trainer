class Flashcards {

	constructor() {
		this._blocks = "ABCDEF".split('');
	}

	onBloop() {
		this._answer = false;
	}

	guess(c) {
		if (this._answer == false) return -1; // Answered too late.
		return (this._answer == c.toUpperCase()) ? 1 : 0;
	}

	nextCard() {
		var c = this._blocks[Math.floor(Math.random()*this._blocks.length)];
		this._answer = c;
		return {
			char: c,
			morse: MorseCodes[c]
		};
	}

	get answer() {
		return this._answer;
	}

	addCharacter(c) {
		this._blocks.push(c.toUpperCase());
		this.generator.keyString(c);
	}

}
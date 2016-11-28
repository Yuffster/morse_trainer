class FlashCards {

	constructor() {
		this._blocks = "ABCDEF".split('');
		this.generator = new AlphabetGenerator();
		this.generator.onBoop = () => this.readBlock();
	}

	readBlock() {
		this.generator.keyString(
			this._blocks[Math.floor(Math.random()*this._blocks.length)]
		);
	}

	addCharacter(c) {
		this._blocks.push(c.toUpperCase());
		this.generator.keyString(c);
	}

}
class UI {

	constructor(start, stop) {
		this.flashcard = new Flashcards();
		window.addEventListener('keypress', (evt) => {
    		this.guessChar(evt.key);
		});
		this.generator = new AlphabetGenerator();
		this.nextCard();
		this._pass = 0;
		this._fail = 0;
	}

	onGenerate() {

	}

	ui(name) {
		return document.getElementById("ui_"+name);
	}

	nextCard() {
		this.ui('card').classList.remove('answer');
		this.ui('card').classList.remove('morse');
		var s = this.flashcard.nextCard();
		this.renderNato(s.char);
		this.renderMorse(s.morse);
		// Key and pause.
		this.generator.key(s.char+'..', ()=> {
			// Add Morse code.
			this.ui('card').classList.add('morse');
		});
		// Key and pause.
		this.generator.key(s.char+'..', ()=>{
			// Show answer.
			this.ui('card').classList.add('answer');
		});
		this.generator.spell(s.char); // Spell out answer.
		// Pause.
		this.generator.spell('...', ()=>this.nextCard());
	}

	guessChar(char) {
		var result = this.flashcard.guess(char);
		if (result == -1) this.alert("Too late.");
		if (result == 1) this.pass("Right!");
		if (result == 0) this.fail("Wrong.");
	}

	pass(message) {
		this.ui('pass').innerHTML = ++this._pass;
		this.alert(message);
	}

	fail(message) {
		this.ui('fail').innerHTML = ++this._fail;
		this.alert(message);
	}

	alert(message) {
		alert(message);
	}

	renderMorse(arr) {
		var html = "";
		for (let c of arr) {
			let row = '<span class="';
			if (c == ".") row += 'dot">.';
			else if (c  == "-") row += 'dash">&mdash;';
			row += '</span>';
			html += row;
		}
		this.ui('morse').innerHTML = html;
	}

	renderNato(c) {
		this.ui('answer').innerHTML = NATO_Alphabet[c.toUpperCase()];
	}

}
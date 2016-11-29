class UI {

	constructor() {
		this._handlers = {};
		this.flashcard = new Flashcards();
		window.addEventListener('keypress', (evt) => {
    		this.guessChar(evt.key);
		});
		this.handle('start', () => this.start());
		this.handle('stop', () => this.stop());
		this.generator = new AlphabetGenerator();
		this._pass = 0;
		this._fail = 0;
		this._answered = false;
	}

	start() {
		this._playing = true;
		this.nextCard();
	}

	stop() {
		this._playing = false;
		this.generator.cancelQueue();
	}

	ui(name) {
		return document.querySelector("[data-ui="+name+']');
	}

	handle(event, fun) {
		if (!this._handlers[event]) this._handlers[event] = [];
		this._handlers[event].push(fun);
		delegate(
			'*[data-event='+event+']',
			'click',
			(e) => {
				this.call_handlers(event, e);
				e.preventDefault();
			}
		);
	}

	call_handlers(event, e) {
		if (!this._handlers[event]) return;
		for (let f of this._handlers[event]) f(e);
	}

	nextCard() {
		if (!this._playing) return;
		this._answered = false;
		this.ui('card').classList.remove('answer');
		this.ui('card').classList.remove('morse');
		this.ui('card').classList.remove('pass');
		this.ui('card').classList.remove('fail');
		var {char, morse} = this.flashcard.nextCard();
		this.renderNato(char);
		this.renderMorse(morse);
		// Key and pause.
		this.generator.key(char+'..', ()=> {
			// Add Morse code.
			this.ui('card').classList.add('morse');
		});
		// Key and pause.
		this.generator.key(char+'..', ()=>{
			// Show answer.
			this.ui('card').classList.add('answer');
		});
		this.generator.spell(char); // Spell out answer.
		// Pause.
		this.generator.spell('...', ()=> this.nextCard());
	}

	guessChar(char) {
		if (this._answered) return;
		this._answered = true;
		this.generator.cancelQueue();
		this.ui('card').classList.add('answer');
		this.ui('card').classList.add('morse');
		var result = this.flashcard.guess(char);
		if (result == -1) this.alert("Too late.");
		if (result == 1) this.pass("Right!");
		if (result == 0) this.fail("Wrong.");
	}

	pass(message) {
		this.ui('pass').innerHTML = ++this._pass;
		this.ui('card').classList.remove('fail');
		this.ui('card').classList.add('pass');
		this.generator.spell("...", () => this.nextCard());
	}

	fail(message) {
		this.ui('fail').innerHTML = ++this._fail;
		this.ui('card').classList.add('fail');
		this.ui('card').classList.remove('pass');
		this.generator.spell(this.flashcard.answer);
		this.generator.key(this.flashcard.answer+'.');
		this.generator.key(this.flashcard.answer+'.');
		this.generator.spell(this.flashcard.answer);
		this.generator.key(this.flashcard.answer);
		this.generator.spell(this.flashcard.answer);
		this.generator.key(this.flashcard.answer);
		this.generator.spell(this.flashcard.answer);
		this.generator.key(this.flashcard.answer);
		this.generator.key(this.flashcard.answer);
		this.generator.spell("...", () => this.nextCard());
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
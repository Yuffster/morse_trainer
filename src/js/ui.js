class UI {

	constructor() {
		this._handlers = {};
		this.flashcard = new Flashcards();
		this._letters = "ETAINOSHRDLUCMFWYGPBVKQJXZ".split("");
		window.addEventListener('keypress', (evt) => {
    		this.guessChar(evt.key);
		});
		this.handle('start', () => this.start());
		this.handle('stop', () => this.stop());
		this.generator = new AlphabetGenerator();
		this._pass = 0;
		this._fail = 0;
		this._xstreak = 0;
		this._streak_target = 5;
		this._gstreak = 0;
		this._answered = false;
		this._guess_stage = 0;
		this._character_streaks = {};
		this._newest_character = '';
		this.addCharacter();
	}

	addCharacter() {
		var c = this._letters.shift();
		this._newest_character = c;
		this._character_streaks[c.toUpperCase()] = 0;
		this.flashcard.addCharacter(c);
	}

	get guessStage() {
		return [
			'fast',
			'fast',
			'repeat',
			'answer'
		][this._guess_stage];
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
		this._guess_stage = 0;
		this.ui('card').classList.remove('answer');
		this.ui('card').classList.remove('morse');
		this.ui('card').classList.remove('pass');
		this.ui('card').classList.remove('fail');
		this.ui('guesstime').innerHTML = '';
		var {char, morse} = this.flashcard.nextCard();
		this.renderNato(char);
		this.renderMorse(morse);
		// Key and pause.
		this.generator.key(char, () => {
			this._guess_stage = 1;
		});
		this.generator.key('..', ()=> {
			this._guess_stage = 2;
			this.ui('card').classList.add('morse');
		});
		// Key and pause.
		this.generator.key(char+'..', ()=>{
			this._guess_stage = 3;
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
		var message = '';
		if (result == 1) {
			this.incrementStreaks();
			message = {
				'fast': 'Excellent!',
				'repeat': 'Good.',
				'answer': "Ok."
			}[this.guessStage];
			this._character_streaks[char.toUpperCase()]++;
			this.pass();
		}
		else if (result == 0) {
			this.fail();
			message = {
				'fast': 'Wrong.<br/>Remember to take your time.',
				'repeat': "Wrong.",
				'answer': "Wrong."
			}[this.guessStage];
			this._character_streaks[char.toUpperCase()] = 0;
		}
		this.ui('guesstime').innerHTML = message || '';
	}

	pass(message) {
		this.ui('pass').innerHTML = ++this._pass;
		this.ui('card').classList.add('pass');
		this.generator.spell("...", () => this.nextCard());
	}

	fail() {
		this.ui('fail').innerHTML = ++this._fail;
		this.ui('card').classList.add('fail');
		this.repeatCard(this.flashcard.answer);
		this.generator.spell("...", () => this.nextCard());
		this.clearStreaks();
	}

	repeatCard(char) {
		this.generator.spell(char);
		this.generator.key(char+'.');
		this.generator.key(char+'.');
		this.generator.spell(char);
		this.generator.key(char);
		this.generator.spell(char);
		this.generator.key(char);
		this.generator.spell(char);
		this.generator.key(char);
		this.generator.key(char);
		this.generator.key(char);
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

	incrementStreaks() {
		var g = this._guess_stage;
		if (g < 2) {
			this._xstreak++;
			this._gstreak++;
		} else if (g == 2) {
			this._xstreak = 0;
			this._gstreak++;
		}
		this.ui('xstreak').innerHTML = this._xstreak;
		this.ui('gstreak').innerHTML = this._gstreak;
		if (this.newestStreak >= this._streak_target) {
			this.addCharacter();
		}
	}

	getCharStreak(c) {
		return this._character_streaks[c.toUpperCase()] || 0;
	}

	get newestStreak() {
		return this.getCharStreak(this._newest_character);
	}

	clearStreaks() {
		this._xstreak = 0;
		this._gstreak = 0;
		this.ui('xstreak').innerHTML = this._xstreak;
		this.ui('gstreak').innerHTML = this._gstreak;
	}

	renderNato(c) {
		this.ui('answer').innerHTML = NATO_Alphabet[c.toUpperCase()];
	}

}
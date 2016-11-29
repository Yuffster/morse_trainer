class UI {

	constructor(start, stop) {
		this.flashcard = new Flashcards();
		window.addEventListener('keypress', (evt) => {
    		this.guessChar(evt.key);
		});
		this.generator = new AlphabetGenerator();
		this.generator.onComplete = () => this.onGenerate();
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
		var stuff = this.flashcard.nextCard();
		this.generator.key(stuff.char+'..', ()=> {
			this.generator.key(stuff.char+'..', ()=> {
				this.showAnswer();
				this.generator.spell(stuff.char, ()=>{
					
				});
			});
		});
		this.renderMorse(stuff.morse);
		this.renderNato(stuff.char);
	}

	guessChar(char) {
		var result = this.flashcard.guess(char);
		if (result == -1) this.alert("Too late.");
		if (result == 1) this.pass("Right!");
		if (result == 0) this.fail("Wrong.");
	}

	showAnswer() {
		this.ui('card').classList.add('answer');
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
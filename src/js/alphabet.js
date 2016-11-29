const NATO_Alphabet = {
	'A': 'Alpha',
	'B': 'Bravo',
	'C': 'Charlie',
	'D': 'Delta',
	'E': 'Echo',
	'F': 'Foxtrot',
	'G': 'Golf',
	'H': 'Hotel',
	'I': 'India',
	'J': 'Juliet',
	'K': 'Kilo',
	'L': 'Lima',
	'M': 'Mike',
	'N': 'November',
	'O': 'Oscar',
	'P': 'Papa',
	'Q': 'Quebec',
	'R': 'Romeo',
	'S': 'Sierra',
	'T': 'Tango',
	'U': 'Uniform',
	'V': 'Victor',
	'W': 'Whiskey',
	'X': 'Xray',
	'Y': 'Yankee',
	'Z': 'Zulu'
};

class AlphabetGenerator  {

	constructor() {
		this._playback_rate = 2;
		this.audio = document.getElementById('nato-alphabet');
		var my = this;
		this.audio.addEventListener('loadeddata', () => this.audioLoaded());
		setTimeout(() => this.timeUpdate(), 50);
		this._morse_chars = "";
		this._morse = new MorseGenerator();
		this._playing = false;
		this.times = {};
		this._audio_loaded = false;
		this._audio_queue = [];
		this._queue = [];
		this._stop_time = 0;
		this._paused = false;
		this.parseSubtitles();
	}

	audioLoaded() {
		this._audio_loaded = true;
		this.shiftQueue();
	}

	timeUpdate() {
		if (this._paused) {
			if (this._unpause_at < new Date().getTime()) {
				this._paused = false;
				this._unpause_at = false;
				this.onComplete();
			}
		} else if (this._playing) { 
			if (this.audio.currentTime > this._stop_time) {
				this.audio.pause();
				this._playing = false;
				this.onComplete();
			}
		}
		setTimeout(() => this.timeUpdate(), 50);
	}

	onComplete() {
		if (this._next_callback) this._next_callback();
		this.shiftQueue();
	}

	shiftQueue() {
		if (this._queue.length > 0) {
			var [char, cb] = this._queue.shift();
			this.playChar(char, cb);
		}
	}

	pause(t) {
		this._paused = true;
		this._unpause_at = new Date().getTime() + t * 1000;
	}

	playChar(c, cb) {
		c = c.toUpperCase();
		this._next_callback = cb;
		var m = c.match(/^M(.)/);
		if (this._playing || this._paused || !this._audio_loaded) {
			this._queue.push([c, cb]);
			return;
		} 
		if (m && m[1] !== '.') {
			this.pause(this._morse.keyString(m[1]));
			c = m[1];
		} else if (m && m[1] == '.' || c == ".") {
			this.pause(1);
		} else if (c == ",") {
			this.pause(.5);
		} else if (c == " ") {
			this.pause(1);
		} else if (c.match(/[.!?]/)) {
			this.pause(2);
		} else {
			this.playSprite(c);
		}
	}

	playSprite(key) {
		if (!this.times[key]) return this.onComplete();
		var [start, end] = this.times[key];
		this.audio.playbackRate = this._playback_rate;
		this.audio.currentTime = start;
		this._stop_time = end;
		this._playing = true;
		this.audio.play();
	}

	parseSubtitles() {
		var subs = NATO_SUBTITLES.split('\n');
		this.times = {};
		var i = 0;
		var time = false;
		for (let l of subs) { // Chunk into 4.
			if (i == 1) time = l;
			if (i == 2) this.times[l] = this.parseTime(time);
			if (i == 3) i = 0;
			else i++;
		}
	}

	boop(time) {
		if (this.booped) return;
		this._morse.on(time);
		this.pause(time);
		window.setTimeout(this.onBoop, time*1000);
		this.booped = true;
	}

	parseTime(time) {
		var times = [];
		for (let t of time.split(' --> ')) {
			let [h, m, s] = t.split(":");
			times.push(h*60*60+m*60+parseFloat(s.replace(',', '.')));
		}
		return times;
	}

	key(msg, callback) {
		this.playString(msg, callback, true);
	}

	spell(msg, callback) {
		this.playString(msg, callback);
	}

	playString(msg, callback, morse=false) {
		for (let i in msg) {
			let cb = (i == msg.length - 1) ? callback : false;
			if (morse == true) this.playChar('M'+msg[i], cb);
			else this.playChar(msg[i], cb);
		}
	}

}

// Subtitles from Wikipedia.
const NATO_SUBTITLES = `1
00:00:00,700 --> 00:00:01,200
A

2
00:00:01,400 --> 00:00:02,500
B

3
00:00:02,600 --> 00:00:04,000
C

4
00:00:04,100 --> 00:00:05,000
D

5
00:00:05,200 --> 00:00:06,300
E

6
00:00:06,300 --> 00:00:07,500
F

7
00:00:07,900 --> 00:00:08,500
G

8
00:00:08,600 --> 00:00:9,500
H

9
00:00:10,100 --> 00:00:11,000
I

10
00:00:11,300 --> 00:00:12,400
J

11
00:00:12,500 --> 00:00:13,500
K

12
00:00:13,700 --> 00:00:14,600
L

13
00:00:14,700 --> 00:00:16,000
M

14
00:00:16,200 --> 00:00:17,200
N

15
00:00:17,500 --> 00:00:18,400
O

16
00:00:18,700 --> 00:00:19,500
P

17
00:00:19,900 --> 00:00:20,800
Q

18
00:00:21,100 --> 00:00:22,200
R

19
00:00:22,400 --> 00:00:23,300
S

20
00:00:23,700 --> 00:00:24,500
T

21
00:00:24,900 --> 00:00:26,000
U

22
00:00:26,200 --> 00:00:27,200
V

23
00:00:27,400 --> 00:00:28,500
W

24
00:00:28,700 --> 00:00:30,000
X

25
00:00:30,200 --> 00:00:31,200
Y

26
00:00:31,500 --> 00:00:32,500
Z

27
00:00:33,500 --> 00:00:34,300
0

28
00:00:34,700 --> 00:00:35,500
1

29
00:00:35,700 --> 00:00:36,800
2

30
00:00:37,000 --> 00:00:37,800
3

31
00:00:38,100 --> 00:00:39,000
4

32
00:00:39,300 --> 00:00:40,200
5

33
00:00:40,000 --> 00:00:41,500
6

34
00:00:41,600 --> 00:00:42,700
7

35
00:00:43,000 --> 00:00:43,800
8

36
00:00:44,100 --> 00:00:44,700
9`
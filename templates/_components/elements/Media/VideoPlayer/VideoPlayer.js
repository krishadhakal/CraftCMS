import PubSub from "underpub-js";

var VideoPlayer = function (options) {

	this.options = {
		$el: false,
		baseClass: 'el-VideoPlayer',
		playing: false,
	};

	$.extend(true, this.options, options);

};

VideoPlayer.prototype.init = function () {

	var self = this;

	self.$player = self.options.$el.find(`.${self.options.baseClass}__player`);
	self.$coverImage = self.options.$el.find(`.${self.options.baseClass}__cover-image`);
	self.$playButton = self.options.$el.find(`.${self.options.baseClass}__play-button`);
	self.aspectRatio = self.options.$el.data('aspectRatio');

	// format aspect ratio string for plyr
	self.aspectRatio = String(self.aspectRatio);
	self.aspectRatio = self.aspectRatio.replace("/", ":");

	console.log(self.aspectRatio);

	self.player = new Plyr(this.$player[0], {
		enabled: true,
		fullscreen: { enabled: false },
		controls: ["progress"],
		settings: ["captions", "quality", "speed", "loop"],
		autoplay: false,
		autopause: false,
		muted: false,
		clickToPlay: true,
		hideControls: false,
		resetOnEnd: false,
		ratio: self.aspectRatio
	});

	self.pause = () => {
		self.player.pause();
	}

	self.play = () => {
		self.player.play();
	}

	self.togglePlayState = () => {
		if (self.options.playing) {
			self.pause();
		} else {
			self.play();
		}
	}

	self.$playButton.on("click", () => self.togglePlayState());
	self.$coverImage.on("click", () => self.togglePlayState());

	self.player.on('playing', () => self.playing());
	self.player.on('pause', () => self.paused());

	PubSub.subscribe("VideoPlayer:toggleOffIfChild", data => {
		const $parent = data.$parent;
		if (self.options.playing && self.options.$el.closest($parent).length) {
			self.pause();
		}
	})
	
};

VideoPlayer.prototype.playing = function () {

	var self = this;

	self.options.$el.attr("data-playing", true);
	self.options.playing = true;

};

VideoPlayer.prototype.paused = function () {

	var self = this;

	self.options.$el.attr("data-playing", false);
	self.options.playing = false;

};

export default VideoPlayer;
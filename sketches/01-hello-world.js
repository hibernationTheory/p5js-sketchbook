function setup() {
	var size = 500;
	createCanvas(size, size);
	textAlign(CENTER, CENTER);
}

function draw() {
	blendMode(REPLACE)
	background.apply(null, [50, 110, 145]);
	blendMode(ADD);
	customTextRGBOffset(
		{
			clr: [255, 0, 0],
			txt: 'OH HAI!',
			x: width/2,
			y: height/2,
			size: 64,
			offset: noise(frameCount/30)*5,
		}
	);
}

function customText(settings) {
	var txt = settings.txt === undefined ? 'Oh Hai' : settings.txt;
	var clr = settings.clr === undefined ? [255] : settings.clr;
	var x = settings.x;
	var y = settings.y;
	var size = settings.size;

	textFont('Arial');
	textSize(size);
	fill.apply(null, clr);
	text(txt, x, y);
}

function customTextRGBOffset(settings) {
	var offset = settings.offset;
	customText(Object.assign({}, settings, {clr: [255, 0, 0], x: settings.x+offset, y: settings.y+offset}));
	customText(Object.assign({}, settings, {clr: [0, 255, 0], x: settings.x-offset, y: settings.y-offset}));
	customText(Object.assign({}, settings, {clr: [0, 0, 255]}));
}
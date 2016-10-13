function setup() {
	var size = 1000;
	createCanvas(size, size);
	background(0);
	angleMode(DEGREES);
	//noLoop();
	frameRate(8);
}

function draw() {
	background(0);
	/*
	dots({
		enabled: false,
		blink: true,
		randomSize: true,
		f: [255],
		x: width/2,
		y: height/2,
		w: 1000,
		h: 1000,
		density: 20,
		size: 2,
		rot: 0, //frameCount/100,
	});

	drawInsideGrid({
		enabled: true,
		blink: false,
		randomSize: false,
		f: [255],
		x: width/2,
		y: height/2,
		w: 1000,
		h: 1000,
		density: 20,
		size: 20,
		//rot: frameCount/100,
		rotIndiv: frameCount/100,
		rotIndivMin: frameCount/50,
	});
	*/
	var shape = new ShowShape({
		x: 0,
		y: 0,
		w: 100,
		h: 100,
		rot: 0,
		boundingBox: false,
	});

	var shape_02 = new ShowShape({
		x: 0,
		y: 0,
		w: 50,
		h: 50,
		rot: 0,
		boundingBox: false,
	});

	var shape_03 = new ShowShape({
		x: 0,
		y: 0,
		w: 50,
		h: 50,
		rot: 0,
		boundingBox: false,
	});

	var dots = new ShowShape({
		x: 0,
		y: 0,
		w: 50,
		h: 50,
		rot: 0,
		boundingBox: false,
	});

	var dots_02 = new ShowShape({
		x: 0,
		y: 0,
		w: 50,
		h: 50,
		rot: 0,
		boundingBox: false,
	});
	
	var grid_shape = new Grid({
		x: width/2, 
		y: height/2,
		w: 600,
		h: 600,
		density: 4,
		obj: shape,
		objDraw: 'customShapeDraw',
		boundingBox: false,
	});

	var grid_shape_02 = new Grid({
		x: width/2, 
		y: height/2,
		w: 800,
		h: 800,
		density: 8,
		obj: shape_02,
		objDraw: 'customShapeDraw',
		boundingBox: false,
	});

	var grid_shape_03 = new Grid({
		x: width/2, 
		y: height/2,
		w: 1000,
		h: 1000,
		density: 8,
		obj: shape_03,
		objDraw: 'customShapeDraw',
		boundingBox: false,
	});


	var dot_shape = new Grid({
		x: width/2, 
		y: height/2,
		w: 1200,
		h: 1200,
		density: 8,
		obj: dots,
		objDraw: 'dotsDraw',
		boundingBox: false,
	});

	var dot_shape_02 = new Grid({
		x: width/2, 
		y: height/2,
		w: 1200,
		h: 600,
		density: 2,
		obj: dots,
		objDraw: 'dotsDraw',
		boundingBox: false,
	});
}

function ShowShape(settings) {
	this.x = settings.x;
	this.y = settings.y;
	this.w = settings.w;
	this.h = settings.h;
	this.rot = settings.rot;
	this.boundingBox = settings.boundingBox;

	this.setPosition = function(x, y) {
		this.x = x;
		this.y = y;
	}

	this.customShape = function() {
		this.wParm = this.w/5;
		this.hParm = this.h/2.5;

		beginShape();
		vertex(0-this.wParm, -this.h/2);
		vertex(-this.w/2, -this.h/2);
		endShape();
		
		beginShape();
		vertex(-this.w/2, -this.h/2);
		vertex(-this.w/2, -this.h/2 + this.hParm);
		endShape();

		beginShape();
		vertex(-this.w/2, this.h/2 - this.hParm);
		vertex(-this.w/2, this.h/2);
		endShape();

		beginShape();
		vertex(-this.w/2, this.h/2);
		vertex(0-this.wParm, this.h/2);
		endShape();	
	}

	this.customShapeDraw = function() {
		if (this.boundingBox) {
			this.displayBoundingBox();
		}
		push();
		translate(this.x, this.y);
		rotate(this.rot);

		noFill();
		stroke(255, random(50, 125));
		this.customShape();
		rotate(180);
		this.customShape();
		pop();
	}

	this.dotsDraw = function() {
		if (this.boundingBox) {
			this.displayBoundingBox();
		}
		push();
		translate(this.x, this.y);
		rotate(this.rot);
		ellipse(0,0,5,5);
		pop();
	}

	this.displayBoundingBox = function() {
		push();
		noFill();
		stroke(125, 125);
		translate(this.x, this.y);
		rotate(this.rot);
		rectMode(CENTER);
		rect(0, 0, this.w, this.h);
		pop();
	}
}


function Grid(settings) {
	this.boundingBox = settings.boundingBox;
	this.x = settings.x;
	this.y = settings.y;
	this.w = settings.w;
	this.h = settings.h;
	this.rot = settings.rot === undefined ? 0 : settings.rot;
	this.density = settings.density;
	this.size = settings.size;
	this.obj = settings.obj;
	this.objDraw = settings.objDraw;
	var distanceX = this.w/this.density;
	var distanceY = this.h/this.density;

	this.displayBoundingBox = function() {
		push();
		noFill();
		stroke(125, 125);
		translate(this.x, this.y);
		rotate(this.rot);
		rectMode(CENTER);
		rect(0, 0, this.w, this.h);
		pop();
	}

	if (this.boundingBox) {
		this.displayBoundingBox();
	}

	push();
	translate(this.x, this.y);
	var index = 0;
	for (var ii=-this.w/2; ii<=this.w/2; ii+=distanceX) {
		for (var jj=-this.h/2; jj<=this.h/2; jj+=distanceY) {
			push();
			this.obj.setPosition(ii,jj);
			this.obj[this.objDraw]();
			pop();
		}
	}
	pop();
}
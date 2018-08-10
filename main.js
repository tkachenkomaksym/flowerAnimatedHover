var wr  = document.querySelector('.wr-flowers'),
	pos = wr.getBoundingClientRect(),
	isOk= true,
	idInterval;

var options = {
	delay: 500,
	duration: 1,
	images: 5,
	k_x: 25,
	k_y: 25
};

var panel = [
	inputDelay = document.querySelector('#delay'),
	inputDuration = document.querySelector('#duration'),
	inputImages = document.querySelector('#images'),
	inputX = document.querySelector('#k_x'),
	inputY= document.querySelector('#k_y')
];
 
updateOk();

for (var i = panel.length - 1; i >= 0; i--) {
	if (panel[i]) {
		panel[i].onkeyup = function() {
			if (this.id == 'duration') {
				options[this.id] = parseFloat(this.value);
			} else {
				options[this.id] = parseInt(this.value);
			}
			if (this.id == 'delay') updateOk();
		};
	}
};

wr.onmousemove = function(e) {
	if (isOk) {
		isOk = false;
		addFlower(wr, e.clientX-pos.left-options['k_x'], e.clientY-pos.top-options['k_y']);
	}
};

function updateOk() {
	clearInterval(idInterval);
	idInterval = setInterval(function() {
		isOk = true;
	}, options.delay);
}

function addFlower(wr, x, y) {
	var flower = createFlower(x, y);
	wr.appendChild(flower);
	setTimeout(function() {
		wr.removeChild(flower);
	}, options.duration * 1000);
}
function createFlower(x, y) {
	var flower = document.createElement('img');
	flower.setAttribute('src', 'img/' + rnd(1,options.images) + '.png');
	flower.style.animationName = 'disappear-' + rnd(1,4);
	flower.style.animationDuration = options.duration + 's';
	flower.style.top = y + 'px';
	flower.style.left = x + 'px';
	flower.className = 'flower';
	return flower;
}
function rnd(min, max) {
	return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}
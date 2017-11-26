// controls.js; howler for harlowe, by chapel
// version 1.0.0

// setup
window.A = window.A || {};
window.A.c = {}; // new namespace for user controls/settings

/* THE MUTE BUTTON */
A.c.isMuted = false; // switch

A.c.mute = function (el) {
	el && $(el).toggleClass('muted') // for user styling
	A.c.isMuted = !A.c.isMuted;
	Howler.mute(A.c.isMuted);
};

/* THE VOLUME SLIDER */
A.c.vol = {
	current : 1,
	last    : 100,
	max     : 100,
	step    : 1
};

A.c.volume = function (el) {
	if (!el) {
		console.log('please pass the target element to A.c.volume()!');
		return;
	}
	
	var $range = $(document.createElement('input')),
		ref = A.c.vol;
	
	$range
		.addClass('volume-control')
		.attr({
			type  : 'range',
			name  : 'volume',
			min   : 0,
			max   : ref.max,
			step  : ref.step,
			value : ref.last
		})
		.appendTo(el);
};

// listener for volume control
$(document).on('input', 'input[name=volume]', function () {
	var $range = $('input[name=volume]'),
		ref = A.c.vol;
	// get input
	ref.last = $range.val();
	ref.current = Number((ref.last / ref.max).toFixed(2));
	// set volume
	Howler.volume(ref.current);
});
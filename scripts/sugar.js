// sugar.js; howler for harlowe, by chapel
// v1.0.0
window.A = window.A || {
	t : {},
	m : window.Howler,
	create : function (id, sources) {
		if (!id || ! sources) {
			console.log('Audio error in newTrack() -> no id or source');
			return;
		}
		if (Array.isArray(sources)) {
			sources = sources;
		} else if (typeof sources === 'string' && arguments.length === 2) {
			sources = [sources];
		} else if (typeof sources === 'string' && arguments.length > 2) {
			var args = [].slice.call(arguments);
			id = args.shift();
			sources = args.forEach(function (a, i, arr) {
				if (typeof a !== 'string') {
					arr.splice(i, 1);
				}
				return arr;
			});
		} else {
			// type error
			console.log('Audio error in newTrack() -> sources could not be processed');
			return;
		}
		
		// create the audio element
		window.T[id] = new Howl({ src : sources });
	}
};
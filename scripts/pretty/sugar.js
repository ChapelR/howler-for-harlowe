// sugar.js; howler for harlowe, by chapel
// v1.0.1
window.A = window.A || {
	t : {},
	m : window.Howler,
	create : function (id, sources) {
		if (!id || ! sources) {
			console.log('Audio error in A.create() -> no id or source');
			return;
		}
		if (Array.isArray(sources)) {
			sources = sources;
		} else if (typeof sources === 'string' && arguments.length === 2) {
			sources = [sources];
		} else if (typeof sources === 'string' && arguments.length > 2) {
			var args = [].slice.call(arguments);
			id = args.shift();
			sources = (function (args) {
				var arr = [];
				args.forEach(function (a) {
					if (typeof a === 'string') {
						arr.push(a);
					}
				});
				return arr;
			}(args));
		} else {
			// type error
			console.log('Audio error in A.create() -> sources could not be processed');
			return;
		}
		
		// create the audio element
		window.A.t[id] = new Howl({ src : sources });
	}
};

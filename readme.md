I suggest using [my fully rewritten Harlowe audio library](https://twinelab.net/harlowe-audio/#/) instead of this for most projects, which has better integration with Harlowe. This repo will probably not see many updates going forward.

## Howler for Harlowe

This is a (very) slightly modified version of [Howler.js](https://howlerjs.com/) for use in the [Twine 2 story format Harlowe](https://twine2.neocities.org/). Howler gives you a variety of powerful tools for controlling audio. Using this code, you can give your Twine story some sound in a simple, reliable way.

**Note**: These scripts don't cooperate with the undo/redo buttons and macros.  For now, I suggest using CSS to hide both buttons when using these scripts, and avoid using the associated macros.  If you need to use the history system, you shouldn't use these scripts until I can figure out a workaround.

## Installation

Navigate to the scripts folder of this repo.  Copy and paste the contents of `main.js` into [your story’s JavaScript area](https://twinery.org/wiki/twine2:adding_custom_javascript_and_css). Then you can use Howler just as you would anywhere else using `<script>` tags in your story. 

If you want to use the simplified syntax mode I've made for people who aren't as comfortable with JavaScript, copy and paste the contents of `sugar.min.js` into your story’s JavaScript area below the contents of `main.js`.

## Documentaion

To use Howler normally, refer to its documentation [here](https://github.com/goldfire/howler.js/blob/master/README.md). 

If you're using the simplified syntax provided by `sugar.min.js`/`sugar.js`, then I'll cover some common use-cases and features below, but you should still read up on Howler's docs.

### Defining a track ( `A.create()` ).

To define a new track, you'll need to give it a name and at least one source url (which can be relative or static). You'll use the `A.create()` function to do this. 

All of your definitions should go either:  
 * In your [Story JavaScript area](https://twinery.org/wiki/twine2:adding_custom_javascript_and_css), beneath all the code from this repo.
 * In a [startup-tagged passage](https://twine2.neocities.org/#passagetag_startup) inside of some script tags.

Neither method is really all that much better than the other, so go with what makes sense to you. 

Here's an example of what a track definition should look like: 

```javascript
A.create('title song', 'media/title.mp3')
```

However, since different browsers accept different file formats, it might be wise to include multiple sources.  Howler will automatically identify which sources can be used by the browser, and will use the first one it can in the list.  Here's an example of a more fool-proof track definition:

```javascript
A.create('title song', ['media/title.mp3', 'media/title.ogg']);
```

-- OR --

```javascript
A.create('title song', 'media/title.mp3', 'media/title.ogg'); // will also work without the array grouping
```

If you make a mistake in the `A.create()` function, no error will be thrown--the command will just be ignored; this may cause Harlowe to claim a track is undefined when you try to use it later.  You can check the [browser's console](https://webmasters.stackexchange.com/a/77337) for information on what might have happened if you suspect `A.create()` is the culprit whenever sound doesn't play--any weirdness will get reported there.

Keep in mind that you can retrieve audio from the web, too:

```javascript
A.create('title song', 'http://www.kozco.com/tech/piano2.wav');
```

### Controlling a track ( `A.t` ).

You can access your track, to play, pause, or otherwise manipulate it, by using `<script>` tags in your passages and using code like this:

```html
<script>
	A.t['title song'].play();
</script>
```

You can use any of the [Howler methods](https://github.com/goldfire/howler.js/#methods) on your tracks using this syntax: `A.t['track name']`, where the `track name` string is the name of a track you've previously set up using the `A.create()` function.

#### The methods.

Here's a list of track methods you might want to use, though there are more than these:

 * `play()` ex. `A.t['name'].play();`: plays or resumes playing the track. (note: cannot be chained, see examples)
 * `playing()` ex. `A.t['name'].playing();`: returnd true if the current track is playing.  useful for avoiding having multiple instances of the same track playing when the user navigates back to a passage, though I can't get it to cooperate with the undo button (for now)
 * `pause()` ex. `A.t['name'].pause();`: stops playback of a track, without losing progress.
 * `stop()` ex. `A.t['name'].stop();`: stops playback and resets progess.
 * `mute()` ex. `A.t['name'].mute(true);`: mute the track (and only this track); it will continue progressing. also used to unmute the track, by giving it `false`.
 * `volume()` ex. `A.t['name'].volume(0.5);`: changes the tracks individual volume: must be given a number between 0.0 (silent) and 1.0 (full volume).
 * `fade()` ex. `A.t['name'].fade(0.0, 1.0, 5000);`: fades a playing track between two volume levels over a number of milliseconds--in the example, we fade from silence to full volume over 8 seconds.
 * `loop()` ex. `A.t['name'].loop(true);`: causes a track to loop when it's played.  switch to false to stop it from looping (it'll completely stop only when finished).
 * `seek()` ex. `A.t['name'].seek(60);`: moves the playback to this time in seconds--in the example, when the track is played, it will start at the one-minute mark.
 
#### Examples.

Assume the following code for all the below examples:

```
:: audioInit [startup]
<script>
	A.create('beep', ['media/beep.ogg', 'media/beep.mp3']);
	A.create('title song', ['media/title.ogg', 'media/title.mp3']);
	A.create('scary song', ['media/scary.ogg', 'media/scary.mp3']);
</script>
```

##### Example 1: Adding the `'beep'` track to links.

```
{
(link: 'Click me!')[
	<script>A.t['beep'].play();</script>
	(goto: 'somePassage')
]
}
```

##### Example 2: Adding the `'beep'` track to a link at half volume.

```
{
(link: 'Click me!')[
	<script>
		A.t['beep'].volume(0.5);
		A.t['beep'].play();
	</script>
	(goto: 'somePassage')
]
}
```

##### Example 3: Adding looping background music.

```
<script>
	A.t['title song'].loop(true);
	A.t['title song'].play();
</script>
```

##### Example 4: Adding looping background music with a 20-second seek and at 75% volume.

```
<script>
	A.t['title song'].loop(true).volume(0.75).seek(20);
	A.t['title song'].play();
</script>
```

##### Example 5: Fade one song out over two seconds and start another by fading it in over one second.

```
{
<script>
	A.t['title song'].fade(1.0, 0.0, 2000);
</script>

(live: 2s)[
	<script>
		A.t['title song'].stop();
		A.t['scary song'].play();
		A.t['scary song'].fade(0.0, 1.0, 1000);
	</script>
	(stop:)
]
}
```

### Master controls ( `A.m` ).

In addition to the controls you can use on individual tracks, you can also control certain things globally, affecting all tracks.  These methods are used with the `A.m` object, like so:

```javascript
A.m.mute(true); // mute all audio
```

#### The methods.

Here's two of the global methods you might want to use, though there are more than these:

 * `A.m.mute(true/false)`: pass it `true` to mute all audio, false to unmute.
 * `A.m.volume()`: pass it a number between 0.0 and 1.0 to control the master volume.  the relative volume of the tracks will still be preserved, and scaled with the master volume.
 
These methods are ideal for making game-wide audio settings, like volume controls or mute buttons.

#### Example.

Here's what a simple mute button might look like:

```
<!-- it would be wise to set $muted to false in a startup-tagged passage before using this code -->
{
(link-repeat: 'Mute')[
	(if: $muted)[
		<script>A.m.mute(false);</script>
		(set: $muted to false)
	](else:)[
		<script>A.m.mute(true);</script>
		(set: $muted to true)
	]
]
}
```

## Extensions 

As I develop them, I'll toss some extensions up here.  The code of these extensions should always go underneath `main.js` and `sugar.min.js` (if it's included) in your story JavaScript area.

### controls.js ( `A.c` )

**Code Location:** `scripts/controls.min.js` or `scripts/pretty/controls.js`

Adds some code to help make a mute button and a volume slider.

#### Mute Switch Overview:

The main attraction here is the function `A.c.mute()`, which can be attached to links, buttons, or other html elements to create a toggleable mute switch.  When used as an `onclick` handler on an html element, you can pass the function the argument `this` to cause the click to add the class `.muted` to said element, allowing for some dynamic styling possiblities (see the final example below).  Omitting the argument has no ill effects.

#### Mute Switch Examples:

**Some basic examples:**

```html
<!-- using a button -->
<button onclick='A.c.mute()'>Mute Sound</button>

<!-- using a harlowe-style link -->
<tw-link onclick='A.c.mute()'>Mute Sound</tw-link>

<!-- using a standard anchor link -->
<a href='#' onclick='A.c.mute()'>Mute Sound</a>
```

**A more advanced example:**

```html
<!-- note the passing of the `this` argument -->
<tw-link name='mute' onclick='A.c.mute(this)'>Mute Sound</tw-link>
```

Then, in our CSS:

```css
tw-link[name='mute'] {
	display: inline-block;
	padding: 0.5em;
	background-color: #eee;
	border: 1px, #ccc, solid;
	color: #111;
	text-align: center;
}
tw-link.muted[name='mute'] {
	background-color: #111;
	border-color: solid;
	color: #eee;
}
```

#### Volume Slider Overview

Under the hood, the volume slider needs to do a lot more: tracking the volume state, reacting to changes to the slider, etc.  It's a little weird to use syntax wise because of this.  You need to define an html element (preferably an empty one) on the page, and then call the `A.c.volume()` function from a script and pass the target element to the function, and it will render the slider (premade in jQuery for your convenience) into the passed element.  This sounds confusing, but the examples below should help out with that.

#### Volume Slider Examples

**Basic usage:**

We need to define an html element and give it something (a name, an id, a class, etc) so that we can use that information to give it to our function.  A `<span>` element with an id is probably your best bet for this.

```html
<span id='volume'></span>
<script>A.c.volume('#volume');</script>
```

I think the process is actually easier to understand than describe.

**A few other examples using other html attributes:**

You need a target element, and some way to point to it.  It doesn't matter how you do that.

```html
<!-- using a class -->
<span class='magic-volume-place'></span><script>A.c.volume('span.magic-volume-place');</script>

<!-- using a name -->
<span name='jiminy'></span><script>A.c.volume('span[name=jiminy]');</script>

<!-- using a totally made-up attribute -->
<span data-mojo='off-the-chart'></span><script>A.c.volume('span[data-mojo=off-the-chart]');</script>
```
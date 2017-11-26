### Basic Installation

You need to be using Harlowe 2.0.1 or higher as your format.

To install, copy and paste the contents of `main.js` into your story JavaScript area.

This will give you access to Howler.js in Twine.

### Installing the sugary API and other extensions.

If you wish to use the simplified syntax detailed in the documentation, copy and paste the contents of `sugar.min.js` into your story JavaScript area.  Note that ORDER IS IMPORTANT.  The contents of `sugar.min.js` should always follow `main.js`. If you want to install another extension, like `controls.min.js`, these extensions can be placed in any order, but must be placed beneath both `main.js` and `sugar.min.js`.

Please note that `sugar.min.js` is **not** required for the other extensions, but if it is included, it must be placed above them and under `main.js`.

### Visual Example

#### Basic Install -- Just Howler:

Your story JavaScript area should be structured like this:

```
contents of main.js
```

#### Sugar API Install -- No Extensions:

Your story JavaScript area should be structured like this:

```
contents of main.js

contents of sugar.min.js
```

#### No Sugar API -- Include Extensions:

Your story JavaScript area should be structured like this:

```
contents of main.js

contents of controls.min.js

contents of some other extension

etc.
```

#### The Crowded Install -- Include Everything:

Your story JavaScript area should be structured like this:

```
contents of main.js

contents of sugar.min.js

contents of controls.min.js

contents of some other extension

etc.
```
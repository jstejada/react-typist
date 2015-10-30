# React Typist
React Component for typing animations. Wrap Typist around your text or any
ReactComponent tree to animate text inside the tree. Easily stylable and highly
configurable.


## Install
```shell
npm install react-typist --save
```

or

```shell
bower install react-typist --save
```


## Live Example
* <a href="//jstejada.github.io/react-typist" target="_blank">Basic example</a>


## Basic Usage
#### CommonJS Module (using webpack or browserify):
```jsx
import React, {Component} from 'react';
import Typist from 'react-typist';

export default class MyComponent extends Component {

  render() {
    return (
      <Typist>
        Animate this text.
      </Typist>;
    );
  }
}
```

#### UMD module:
Include `dist/standalone/Typist.js` into your build, using whatever build tool
or manually entering a `<script>` tag.

<a name="cssBlink"></a>
#### CSS
Typist contains a simple CSS file to make the cursor at the end of the text
blink. To include it, you must include
[`dist/Typist.css`](/dist/Typist.css) in your build.


## Children
Typist will animate any text present in its children and descendents. Each text
node will be animated as it is encountered in depth-first traversal of the
children tree, one after the other. Typist can receive as children any objects
a regular ReactComponent can.

You can use any props in the children you pass to Typist, including your own
css classes. This allows you to easily style your text inside Typist:

```jsx
<Typist>
  <span className="my-custom-class"> First Sentence </span>
  <br />
  <div className="container">
    <p> This will be animated after first sentence is complete </p>
    <MyComponent prop1="val1"> More text. </MyComponent>
  </div>
  Final sentence
</Typist>
```

Refer to [`examples/`](/examples) for more examples.


## Options
* [`className`](#className)
* [`avgTypingDelay`](#avgTypingDelay)
* [`stdTypingDelay`](#stdTypingDelay)
* [`startDelay`](#startDelay)
* [`cursor`](#cursor)
* [`onTypingDone`](#onTypingDone)
* [`delayGenerator`](#delayGenerator)

<a name="className"></a>
#### className
*Default*: `null`

CSS class name to be applied to the Typist root node. Typist will always
have the CSS class `Typist` applied to it.

```xml
<Typist className="MyTypist"> Animate this text. </Typist>
```
 will produce:
```xml
<div class="Typist MyTypist"> Animate this text. </div>
```

<a name="avgTypingDelay"></a>
#### avgTypingDelay
*Default*: `70`

Average typing delay in milliseconds between every keystroke of the typing
animation **(Less is faster)**. The distribution of the typing delays between
strokes is not uniform, to make the animation more human like.

<a name="stdTypingDelay"></a>
#### stdTypingDelay
*Default*: `25`

Standard deviation of typing delay between keystrokes of the typing animation.
**(Less means more uniform, less variance between values)**.

<a name="startDelay"></a>
#### startDelay
*Default*: `0`

Milliseconds before typing animation begins.

<a name="cursor"></a>
#### cursor
*Default*:
```js
{
  show: true,
  blink: true,
  element: '|',
  hideWhenDone: false,
  hideWhenDoneDelay: 1000,
}
```

Object containing options for cursor:

* `show (bool)`: wether to display cursor at the end of text.
* `blink (bool)`: wether to add blinking animation to cursor. You must also
include the [css](#cssBlink)
* `element (string)`: character to use for the cursor
* `hideWhenDone (bool)`: wether the cursor should be hidden after tyiping
animation is complete.
* `hideWhenDoneDelay (int)`: delay in ms to be applied before hiding cursor when
typing animation is complete.

<a name="onTypingDone"></a>
#### onTypingDone
Function to be called when typing animation is complete.

<a name="delayGenerator"></a>
#### delayGenerator
*Default*: [`gaussianDistribution`][normal-dist]

Function to be called to generate the typing delay (in ms) for every keystroke
of the animation. Every time this function is called it should return a value
in milliseconds. This function can be used to provide your own typing delay
distribution, e.g. uniform (always 100ms) or even deterministic.

```js
function(mean, std, current = {line, lineIdx, character, charIdx, defDelayGenerator}) {
  ...
}
```

* `mean (number)`: Average typing delay. Will be the value of [`props.avgTypingDelay`](#avgTypingDelay)
* `std (number)`: Standard deviation of typing delay. Will be the value of [`props.stdTypingDelay`](#stdTypingDelay)
* `current.line (string)`: Value of line of text (Typist child) currently being animated.
* `current.lineIdx (int)`: Index of line of text (Typist child) currently being animated.
* `current.character (string)`: Value of character that was just rendered.
* `current.charIdx (int)`: Index of character that was just rendered.
* `current.defaultDelayGenerator (function)`: Reference to default delay
generator function to be able to fall back to.


This function can also be used to introduce delays at specific points in the
typing animation.

e.g.:
```js
function(mean, std, {line, lineIdx, charIdx, defDelayGenerator}) {
  // Delay the animation for 2 seconds at the last character of the first line
  if (lineIdx === 0 && charIdx === line.length - 1) {
    return 2000;
  }
  return defDelayGenerator();
}
```

## Development

Run:
```shell
npm start
```

to build the examples and start the dev server. Now, open `http://localhost:8080`
and start hacking!

If you just want to build the examples run:
```shell
npm run examples
```

#### To do

* [x] Support delays in typing animation
* [x] Support arbitrary element trees
* [ ] Refactor logic outside component, better maintainability
* [ ] Improve performance of rendering arbitrary element trees
* [ ] Support backspace animation


## Running Tests

```shell
npm test
```


## License

[MIT](http://mit-license.org)

[normal-dist]: https://en.wikipedia.org/wiki/Normal_distribution

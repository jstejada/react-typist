# React Typist
React component for typing animations. Wrap Typist around your text to create
typing animations. Easily stylable and highly configurable.


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

export defaults MyComponent extends Component {

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
Typist will animate the typing of its children in order, one after the other.
It can receive as children any combination of one or many of the following:

* `string`
* `number`
* `ReactElement` with a single child of type `string` or `number`
* `ReactElement` with no children

You can pass any props to the ReactElement children, including your own css classes.
This allows you to easily style your text inside Typist:

```jsx
<Typist>
  <span className="my-custom-class"> First Sentence </span>
  <br />
  <p> This will be animated after first sentence is complete </p>
  <MyComponent prop1="val1"> More text. </MyComponent>
  Final sentence
</Typist>
```

Refer to [`examples/`](/examples) for more examples.


## Options
* [`className`](#className)
* [`avgTypingDelay`](#avgTypingDelay)
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
strokes is not uniform, so as to make the animation more human like.

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
  element: '|'
}
```

Object containing options for cursor:

* show (bool): wether to display cursor at the end of text.
* blink (bool): wether to add blinking animation to cursor. You must also
include the [css](#cssBlink)
* element (string): character to use for the cursor

<a name="onTypingDone"></a>
#### onTypingDone
Function to be called when typing animation is complete.

<a name="delayGenerator"></a>
#### delayGenerator
*Default*: [`gaussianDistribution`](normal-dist)

Function to be called to generate the typing delay (in ms) for every keystroke
of the animation. Every time this function is called it should return a value
in milliseconds.

```js
function(mean) {
  ...
}
```

* `mean`: Average typing delay. Will be the value of [`props.avgTypingDelay`](#avgTypingDelay)


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

* [ ] Tests
* [ ] Support delays in typing animation
* [ ] Support arbitrary element trees
* [ ] Support backspace animation


## Running Tests

```shell
npm test
```


## License

[MIT](http://mit-license.org)

[normal-dist]: https://en.wikipedia.org/wiki/Normal_distribution

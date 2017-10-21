import React from 'react';
import Backspace from './Backspace';
import Delay from './Delay';

export const sleep = (val) => new Promise((resolve) => (
  val != null ? setTimeout(resolve, val) : resolve()
));

export function gaussianRnd(mean, std) {
  const times = 12;
  let sum = 0;
  for (let idx = 0; idx < times; idx++) {
    sum += Math.random();
  }
  sum -= (times / 2);
  return Math.round((sum) * std) + mean;
}

export function eachPromise(arr, iterator, ...extraArgs) {
  const promiseReducer = (prev, current, idx) => (
    prev.then(() => iterator(current, idx, ...extraArgs))
  );
  return Array.from(arr).reduce(promiseReducer, Promise.resolve());
}

export function exclude(obj, keys) {
  const res = {};
  for (const key in obj) {
    if (keys.indexOf(key) === -1) {
      res[key] = obj[key];
    }
  }
  return res;
}

export function isBackspaceElement(element) {
  return element && element.type === Backspace;
}

export function isDelayElement(element) {
  return element && element.type === Delay;
}

export function extractTextFromElement(element) {
  const stack = element ? [element] : [];
  const lines = [];

  while (stack.length > 0) {
    const current = stack.pop();
    if (React.isValidElement(current)) {
      if (isBackspaceElement(current) || isDelayElement(current)) {
        // If it is a `Backspace` or `Delay` element, we want to keep it in our
        // `textLines` state. These will serve as markers when updating the
        // state of the text
        lines.unshift(current);
      } else {
        React.Children.forEach(current.props.children, (child) => {
          stack.push(child);
        });
      }
    } else if (Array.isArray(current)) {
      for (const el of current) {
        stack.push(el);
      }
    } else {
      lines.unshift(current);
    }
  }

  return lines;
}

export function cloneElement(element, children) {
  const tag = element.type;
  const props = exclude(element.props, ['children']);
  // eslint-disable-next-line
  props.key = `Typist-element-${tag}-${Date.now() + Math.random() + Math.random()}`;
  return React.createElement(tag, props, ...children);
}

function cloneElementWithSpecifiedTextAtIndex(element, textLines, textIdx) {
  if (textIdx >= textLines.length) {
    return [null, textIdx];
  }

  let idx = textIdx;
  const recurse = (el) => {
    const [child, advIdx] = cloneElementWithSpecifiedTextAtIndex(
      el,
      textLines,
      idx
    );
    idx = advIdx;
    return child;
  };

  const isNonTypistElement = (
    React.isValidElement(element) &&
    !(isBackspaceElement(element) || isDelayElement(element))
  );

  if (isNonTypistElement) {
    const clonedChildren = React.Children.map(element.props.children, recurse) || [];
    return [cloneElement(element, clonedChildren), idx];
  }

  if (Array.isArray(element)) {
    const children = element.map(recurse);
    return [children, idx];
  }

  // Anything that isn't a React element or an Array is interpreted as text
  return [textLines[idx], idx + 1];
}

export function cloneElementWithSpecifiedText({ element, textLines }) {
  if (!element) {
    return undefined;
  }

  return cloneElementWithSpecifiedTextAtIndex(element, textLines, 0)[0];
}

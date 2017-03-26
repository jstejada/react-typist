import React from 'react';

export const sleep = (val) => new Promise((resolve) => setTimeout(resolve, val));

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

export function extractText(toType) {
  const st = toType ? [toType] : [];
  const lines = [];

  while (st.length > 0) {
    const cur = st.pop();

    if (React.isValidElement(cur)) {
      React.Children.forEach(cur.props.children, (child) => {
        st.push(child);
      });
    } else {
      if (Array.isArray(cur)) {
        for (const el of cur) {
          st.push(el);
        }
      } else {
        lines.unshift(cur);
      }
    }
  }
  return lines;
}

export function elementFactoryMaker() {
  let key = 0;
  return (el) => {
    const tag = el.type;
    const props = exclude(el.props, ['children']);
    props.key = `Typist-el-${key++}`;
    return React.createElement.bind(null, tag, props);
  };
}

export function extractTreeWithText(...args) {
  if (!args[0]) return void(0);
  const factMaker = elementFactoryMaker();

  const inner = (tree, text, textIdx) => {
    if (textIdx >= text.length) return [null, textIdx];
    let idx = textIdx;
    const recurse = (ch) => {
      const [child, advIdx] = inner(ch, text, idx);
      idx = advIdx;
      return child;
    };

    // Recursively call on children of React Element
    if (React.isValidElement(tree)) {
      const fact = factMaker(tree);
      const children = React.Children.map(tree.props.children, recurse) || [];
      return [fact(...children), idx];
    }

    // Recursively call on array
    if (Array.isArray(tree)) {
      const children = tree.map(recurse);
      return [children, idx];
    }

    // Return text
    return [text[idx], idx + 1];
  };
  return inner(...args, 0)[0];
}

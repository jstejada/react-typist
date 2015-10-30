import React from 'react';

export function gaussianRnd(mean, std) {
  const times = 12;
  let sum = 0;
  for (let idx = 0; idx < times; idx++) {
    sum += Math.random();
  }
  sum -= (times / 2);
  return Math.round((sum) * std) + mean;
}

export function asyncEach(arr, callback, onDone = ()=> {}) {
  let count = 0;
  const adv = ()=> {
    if (count === arr.length) {
      return onDone();
    }
    const idx = count;
    count++;
    callback(arr[idx], adv, idx);
  };
  adv();
}

export function eachRndTimeout(arr, callback, onDone, rndFn) {
  asyncEach(arr, (el, adv, idx)=> {
    callback(el, ()=> {
      setTimeout(adv, rndFn(el, idx));
    });
  }, onDone);
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
      React.Children.forEach(cur.props.children, (child)=> {
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
  return (el)=> {
    const tag = el.type;
    const props = exclude(el.props, ['children']);
    props.key = `Typist-el-${key++}`;
    return React.createElement.bind(null, tag, props);
  };
}

export function extractTreeWithText(...args) {
  if (!args[0]) return void(0);
  const factMaker = elementFactoryMaker();

  const inner = (tree, text, textIdx)=> {
    if (textIdx >= text.length) return [null, textIdx];
    let idx = textIdx;
    const recurse = (ch)=> {
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

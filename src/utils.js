import React from 'react';

export function times(tms, fn) {
  for (let idx = 0; idx < tms; idx++) {
    fn();
  }
}

export function normalRnd({tms = 12, mean = 70, std = 25} = {}) {
  let sum = 0;
  times(tms, ()=> {
    sum += Math.random();
  });
  sum -= 6;
  return Math.round((sum) * std) + mean;
}

export function asyncEach(arr, iterator, onDone = ()=> {}) {
  let count = 0;
  const adv = ()=> {
    if (count === arr.length) {
      return onDone();
    }
    const idx = count;
    count++;
    iterator(arr[idx], adv, idx);
  };
  adv();
}

export function eachRndTimeout(arr, iterator, onDone, rndFn = normalRnd) {
  asyncEach(arr, (el, adv)=> {
    setTimeout(()=>{
      iterator(el, adv);
    }, rndFn());
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
  const els = Array.isArray(toType) ? toType : [toType];

  return els.map((el)=> {
    let val = '';
    if (React.isValidElement(el)) {
      val = el.props.children ? el.props.children.toString() : '';
    } else {
      val = el.toString();
    }
    return val;
  });
}

export function extractElementFactories(toType) {
  const els = Array.isArray(toType) ? toType : [toType];

  return els.map((el)=> {
    const tag = React.isValidElement(el) ? el.type : 'p';
    const props = React.isValidElement(el) ? exclude(el.props, ['children']) : {};
    return React.createElement.bind(null, tag, props);
  });
}

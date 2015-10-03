import React from 'react';
const Console = console;

export function gaussianRnd({tms = 12, mean = 70, std = 25} = {}) {
  let sum = 0;
  for (let idx = 0; idx < tms; idx++) {
    sum += Math.random();
  }
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

export function eachRndTimeout(arr, iterator, onDone, rndFn = gaussianRnd) {
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

export function validateTypeable(obj) {
  if (typeof obj !== 'string' && typeof obj !== 'number') {
    Console.warn('The arguments passed as children to Typist must be ' +
                'strings or numbers or ReactElements containing a single child of those types');
  }
  return obj.toString();
}

export function extractText(toType) {
  const els = Array.isArray(toType) ? toType : [toType];

  return els.map((el)=> {
    let val = '';
    if (React.isValidElement(el)) {
      val = el.props.children ? validateTypeable(el.props.children) : '';
    } else {
      val = validateTypeable(el);
    }
    return val;
  });
}

export function extractElementFactories(toType) {
  const els = Array.isArray(toType) ? toType : [toType];

  return els.map((el, idx)=> {
    const tag = React.isValidElement(el) ? el.type : 'span';
    const props = React.isValidElement(el) ? exclude(el.props, ['children']) : {};
    props.key = [`Typist-line-${idx}`];
    return React.createElement.bind(null, tag, props);
  });
}

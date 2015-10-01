
export function times(tms, fn) {
  for (let idx = 0; idx < tms; idx++) {
    fn();
  }
}

export function normalRnd({tms = 12, mean = 90, std = 25} = {}) {
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

export const throttle = function(fn, dealoy) {
  let date = 0;
  return function(...args) {
    let newDate = new Date();
    if (newDate - date > dealoy) {
      fn.call(this, ...args);
      date = newDate;
    }
  };
};

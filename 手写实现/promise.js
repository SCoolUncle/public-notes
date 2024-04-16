/**
 * promise 实现，根据promiseA+ 规范，待优化版
 */

function MyPromise(fn) {
  var state = 'pending'; // Promise的状态
  var value; // Promise的值
  var deferred = null; // Deferred对象

  function resolve(newValue) {
    try {
      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;
        if (typeof then === 'function') {
          then.call(newValue, resolve, reject);
          return;
        }
      }
      state = 'resolved'; // 改变Promise的状态
      value = newValue; // 改变Promise的值

      if (deferred) {
        handle(deferred);
      }
    } catch (e) {
      reject(e);
    }
  }

  function reject(reason) {
    state = 'rejected'; // 改变Promise的状态
    value = reason; // 改变Promise的值

    if (deferred) {
      handle(deferred);
    } else {
      throw reason;
    }
  }

  function handle(handler) {
    if (state === 'pending') {
      deferred = handler;
    } else if (state === 'resolved') {
      handler(value);
    } else if (state === 'rejected') {
      handler(value);
    }
  }

  this.then = function(onFulfilled, onRejected) {
    return new MyPromise(function(resolve, reject) {
      handle(function(value) {
        if (state === 'resolved') {
          resolve(value);
        } else {
          handle(function(reason) {
            reject(reason);
          });
        }
      });

      if (typeof onFulfilled === 'function') {
        handle(function(value) {
          try {
            var x = onFulfilled(value);
            resolve(x);
          } catch (e) {
            reject(e);
          }
        });
      } else {
        onFulfilled(value);
      }

      if (typeof onRejected === 'function') {
        handle(function(reason) {
          try {
            var x = onRejected(reason);
            resolve(x);
          } catch (e) {
            reject(e);
          }
        });
      } else {
        onRejected(value);
      }
    });
  };

  // catch
  this.catch = function(onRejected) {
    return this.then(undefined, onRejected);
  }


  // finally
  this.finally = function(callback) {
    return this.then(function(value) {
      return MyPromise.resolve(callback()).then(function() {
        return value;
      });
    }, function(reason) {
      return MyPromise.resolve(callback()).then(function() {
        throw reason;
      });
    });
  }

  fn(resolve, reject); // 执行传入的函数，并传入resolve和reject函数作为参数
}

// function fn(num) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => resolve(num), 1000)
//   })
// }

// function *gen(){
//   yield fn(1)
//   yield fn(2)
//   yield fn(3)
// }

// let g = gen()

// console.log(g)  
// console.log(g.next) // {value: 1, done: false}
// console.log(g.next) // {value: 2, done: false}
// console.log(g.next) // {value: 3, done: false}
// console.log(g.next) // {value: 4, done: false}
// console.log(g.next) // {undefined: 1, done: true}

function *gen(){
  let res = yield 1
  console.log(res)
  let res2 = yield 2
  console.log(res2)
  let res3 = yield 3
  console.log(res3)
  return 4
}

let g = gen()

console.log(g)
console.log(g.next(111)) 
// 111
console.log(g.next(222)) 
// 222
console.log(g.next(333))
// 333
console.log(g.next(444))
console.log(g.next(555))

// Object [Generator] {}
// { value: 1, done: false }
// 222
// { value: 2, done: false }
// 333
// { value: 3, done: false }
// 444
// { value: 4, done: true }
// { value: undefined, done: true }
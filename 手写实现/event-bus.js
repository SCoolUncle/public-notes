/**
 * 发布订阅模式， 事件总线
 */
class EventBuss{
  constructor(){
    this.events = {}
  }
  // 注册事件
  on(eventName, callBack){
    if(!this.events[eventName].length){
      this.events[eventName] = []
    }
    this.events[eventName].push(callBack)
    // 用于取消订阅
    return this.off(eventName, callBack)
  }

  // 触发事件
  emit(eventName, ...args){
    if(this.events[eventName]){
      this.events[eventName].forEach(item => {
        item(...args)
      })
    }
  }

  // 移除事件, 取消订阅
  off(eventName, callBack){
    if(this.events[eventName]){
      this.events[eventName] = this.events[eventName].filter(item => item !== callBack)
    }
  }
}

/**
 * 发布订阅 事件总线
 * on 订阅事件
 * emit 触发事件
 * off 取消订阅
 * once 只触发一次
 * removeAll 移除所有
 */

class EventBuss {
  constructor() {
    // 存储事件
    this.events = {}
  }

  on(eventName, callBack){
    if(!this.events[eventName]){
      this.events[eventName] = []
    }
    this.events[eventName].push(callBack)
    // 用于取消订阅
    return this.off(eventName, callBack)
  }

  // 触发事件
  emit(eventName, ...args){
    if(this.events[eventName]){
      this.events[eventName].forEach(item => {
        item(...args)
      })
    }
  }

  // 取消订阅， 取消指定事件的指定回调
  off(eventName, callBack){
    if(this.events[eventName]){
      this.events[eventName] = this.events[eventName].filter(item => item !== callBack)
    }
  }

  // 注册一个一次性的事件
  once(eventName, callBack){
    // 定义一个事件用来存储
    const onceWrapper = function(...args){
      callBack(...args)
      // 执行完成后取消订阅
      this.off(eventName, onceWrapper)
    }

    this.on(eventName, onceWrapper)
  }

  remove(eventName){
    if(this.events[eventName]){
      delete this.events[eventName]
    }
  }

  // 取消所有的时间订阅, 清空就完了
  removeAll(){
    this.events = {}
  }


}



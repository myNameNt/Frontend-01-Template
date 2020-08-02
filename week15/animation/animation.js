export class TimeLine {
  constructor(){
    this.animations = []
    this.startTime = 0
  }
  tick (){
    let t = Date.now() - this.startTime
    for (let animation of this.animations) {
      let {object,property,template,start,end,duration,delay,timingFunction} = animation
      if (t > duration + delay) {
        continue
      }
      
      object[property] = template(timingFunction(start,end)(t - delay))
    }
    requestAnimationFrame(()=> this.tick())
  }
  start (){
    this.startTime = Date.now()
    this.tick()
  }
  add (animation) {
    this.animations.push(animation)
  }
}

export   class Animation {
  constructor(object, property, template,start, end, duration, delay, timingFunction) {
    this.object = object
    this.property = property
    this.template = template
    this.start = start
    this.end = end
    this.duration = duration
    this.delay = delay
    this.timingFunction = timingFunction || ((start, end) => {
      return (t) => start + (t / duration) * (end - start)
    })
  }
}


/*

let animation = new Animation(object,property,start,end,duration,delay,timingFunction)
let animation2 = new Animation(object2,property2,start2,end2,duration2,delay2,timingFunction2)

let timeLine = new TimeLine()
timeLine.add(animation)
timeLine.add(animation2)

timeLine.start()
timeLine.stop()

timeLine.pause()
timeLine.resume()


setTimeout setInterval requestAnimationFrame
*/

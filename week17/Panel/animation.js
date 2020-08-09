export class TimeLine {
  constructor() {
    this.animations = new Set()
    this.finishedAnimations =new Set()
    this.startTime = 0
    this.addTimes = new Map()
    this.requestId = null
    this.state = 'initialization'
  }
  tick () {
    let t = Date.now() - this.startTime
    for (let animation of this.animations) {
      let { object, property, template, start, end, duration, delay, startTime, timingFunction} = animation
      let addTime = this.addTimes.get(animation)
      if (t < delay + addTime) {
        continue
      }

      let progression = timingFunction((t - delay - addTime) / duration) // 0-1之间的数
      if (t > duration + delay + addTime) {
        this.animations.delete(animation)
        progression = 1
        this.finishedAnimations.add(animation)
      }

      let value = animation.valueFromProgression(progression)
      object[property] = template(value)
    }

    if (this.animations.size) {
      this.requestId = requestAnimationFrame(() => this.tick())
    } else {
      this.requestId = null
    }
  }
  start () {
    if (this.state !== 'initialization') {
      return
    }
    this.state = 'playing'
    this.startTime = Date.now()
    this.tick()
  }
  pause () {
    if (this.state !== 'playing') {
      return
    }
    this.state = 'paused'
    this.pauseTime = Date.now()
    if (this.requestId !== null) {
      cancelAnimationFrame(this.requestId)
      this.requestId = null
    }
  }
  resume () {
    if (this.state !== 'paused') {
      return
    }
    this.state = 'playing'
    this.startTime += Date.now() - this.pauseTime
    this.tick()
  }
  reset () {
    if (this.state === 'playing') {
      this.pause()
    }
    this.animations = new Set()
    this.addTimes = new Map()
    this.finishedAnimations = new Set()
    this.startTime = 0
    this.requestId = null
    this.state = 'initialization'
    this.pauseTime = null
    this.tick()
  }
  restart () {
    if (this.state === 'playing') {
      this.pause()
    }
    for (let animation of this.finishedAnimations) {
      this.animations.add(animation)
    }
    this.finishedAnimations = new Set()
    this.startTime = Date.now()
    this.requestId = null
    this.state = 'initialization'
    this.pauseTime = null
    this.tick()
  }
  add (animation, addTime) {
    this.animations.add(animation)
    if (this.state === 'playing' && this.requestId === null) {
      this.tick()
    }
    if (this.state === 'playing') {
      this.addTimes.set(animation, addTime !== void 0 ? addTime : Date.now() - this.startTime)
    } else {
      this.addTimes.set(animation, addTime !== void 0 ? addTime : 0)
    }

  }
}

export class Animation {
  constructor(object, property, start, end, duration, delay, timingFunction, template,) {
    this.object = object
    this.property = property
    this.template = template
    this.start = start
    this.end = end
    this.duration = duration
    this.delay = delay || 100
    this.timingFunction = timingFunction || ((start, end) => {
      return (t) => start + (t / duration) * (end - start)
    })
    this.finished = false
  }
  valueFromProgression (progression) {
    return this.start + progression * (this.end - this.start)
  }
}

export class ColorAnimation {
  constructor(object, property, start, end, duration, delay, timingFunction, template) {
    this.object = object
    this.property = property
    this.template = template || ((v) => `rgba(${v.r},${v.g},${v.b},${v.a})`)
    this.start = start
    this.end = end
    this.duration = duration
    this.delay = delay || 100
    this.timingFunction = timingFunction || ((start, end) => {
      return (t) => start + (t / duration) * (end - start)
    })
    this.finished = false
    this.startTime = 0
  }
  valueFromProgression (progression) {
    return {
      r: this.start.r + progression * (this.end.r - this.start.r),
      g: this.start.g + progression * (this.end.g - this.start.g),
      b: this.start.b + progression * (this.end.b - this.start.b),
      a: this.start.a + progression * (this.end.a - this.start.a)
    }
  }
}

export function cubicBezier (p1x, p1y, p2x, p2y) {
  const ZERO_LIMIT = 1e-6;
  // Calculate the polynomial coefficients,
  // implicit first and last control points are (0,0) and (1,1).
  const ax = 3 * p1x - 3 * p2x + 1;
  const bx = 3 * p2x - 6 * p1x;
  const cx = 3 * p1x;

  const ay = 3 * p1y - 3 * p2y + 1;
  const by = 3 * p2y - 6 * p1y;
  const cy = 3 * p1y;

  function sampleCurveDerivativeX (t) {
    // `ax t^3 + bx t^2 + cx t' expanded using Horner 's rule.
    return (3 * ax * t + 2 * bx) * t + cx;
  }

  function sampleCurveX (t) {
    return ((ax * t + bx) * t + cx) * t;
  }

  function sampleCurveY (t) {
    return ((ay * t + by) * t + cy) * t;
  }

  // Given an x value, find a parametric value it came from.
  function solveCurveX (x) {
    var t2 = x;
    var derivative;
    var x2;

    // https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation
    // First try a few iterations of Newton's method -- normally very fast.
    // http://en.wikipedia.org/wiki/Newton's_method
    for (let i = 0; i < 8; i++) {
      // f(t)-x=0
      x2 = sampleCurveX(t2) - x;
      if (Math.abs(x2) < ZERO_LIMIT) {
        return t2;
      }
      derivative = sampleCurveDerivativeX(t2);
      // == 0, failure
      /* istanbul ignore if */
      if (Math.abs(derivative) < ZERO_LIMIT) {
        break;
      }
      t2 -= x2 / derivative;
    }

    // Fall back to the bisection method for reliability.
    // bisection
    // http://en.wikipedia.org/wiki/Bisection_method
    var t1 = 1;
    /* istanbul ignore next */
    var t0 = 0;

    /* istanbul ignore next */
    t2 = x;
    /* istanbul ignore next */
    while (t1 > t0) {
      x2 = sampleCurveX(t2) - x;
      if (Math.abs(x2) < ZERO_LIMIT) {
        return t2;
      }
      if (x2 > 0) {
        t1 = t2;
      } else {
        t0 = t2;
      }
      t2 = (t1 + t0) / 2;
    }

    // Failure
    return t2;
  }

  function solve (x) {
    return sampleCurveY(solveCurveX(x));
  }

  return solve;
}

export const ease = cubicBezier(.25, .1, .25, 1)
export const linear = cubicBezier(0, 0, 1, 1)
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

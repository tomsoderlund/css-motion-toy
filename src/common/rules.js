import { X, Y, Z, ROTATION } from './constants'

export default {

  bounce: {
    apply: ({ dimension = Y, wallPosition = 250, position, speed, acceleration, elapsedTime, options }) => {
      if (position[dimension] > wallPosition) {
        position[dimension] = wallPosition
        speed[dimension] = -speed[dimension] * (1 - options.friction)
        speed[ROTATION] = -speed[ROTATION] * (1 - options.friction)
        position[ROTATION] = position[ROTATION] * (1 - options.friction) // slow down to zero
      }
    }
  },

  blackhole: {
    apply: ({ gravity = 0.01, holePosition = [150, 150], position, speed, acceleration, elapsedTime, options }) => {
      for (let dimension = X; dimension <= Z; dimension++) {
        acceleration[dimension] = (holePosition[dimension] - position[dimension]) * gravity
        speed[dimension] *= (1 - options.friction / 10)
      }
    }
  }

}

import { X, Y, Z, ROTATION, FRICTION } from './constants'

export default {

  bounce: {
    apply: function ({ dimension = Y, wallPosition = 250, position, speed, acceleration, elapsedTime, options }) {
      if (position[dimension] > wallPosition) {
        position[dimension] = wallPosition
        speed[dimension] = -speed[dimension] * (1 - (options[FRICTION] / 100))
        speed[ROTATION] = -speed[ROTATION] * (1 - (options[FRICTION] / 100))
        position[ROTATION] = position[ROTATION] * (1 - (options[FRICTION] / 100)) // slow down to zero
      }
    }
  },

  blackhole: {
    apply: function ({ gravity = 0.01, holePosition = [150, 150], position, speed, acceleration, elapsedTime, options }) {
      for (let dimension = X; dimension <= Z; dimension++) {
        acceleration[dimension] = (holePosition[dimension] - position[dimension]) * gravity
        speed[dimension] *= (1 - (options[FRICTION] / 100) / 10)
      }
    }
  },

  cannon: {
    apply: function ({ dimension = X, power = 5, startTime = 1000, position, speed, acceleration, elapsedTime, options }) {
      if (elapsedTime > startTime) {
        acceleration[dimension] = power
      }
    }
  }

}

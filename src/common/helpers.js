import { getStylesCSS, transformStylesValues } from '../components/Simulator'

export const objectToCSS = obj => Object.keys(obj).reduce((result, key) => result + `${key}: ${obj[key]}; `, '')

export const formatOutputCssRow = (stylesValues, outputOptions, simulationOptions) => {
  const stylesValuesTransformed = transformStylesValues(stylesValues, outputOptions, simulationOptions)
  return `${stylesValuesTransformed.elapsedTime / 100}% { ${objectToCSS(getStylesCSS(stylesValuesTransformed, simulationOptions))} }\n`
}

import React from 'react'
import styled from 'styled-components'

import { DIMENSION_LABELS } from '../common/constants'

const ArrayValueInput = styled.input`
  width: 4em;
  margin: 0 0.05em;
`

export const ArrayInput = ({ values, labels, onChange }) => <span>
  {values.map((value, index) => <ArrayValueInput
    key={index}
    type='number'
    placeholder={labels[index]}
    title={labels[index]}
    value={value}
    onChange={onChange.bind(this, index)}
  />)}
</span>

export const VariableInputBlock = ({ stateObject, label, onChange, labels = DIMENSION_LABELS }) => <p>
  <label>{label}:</label>
  <ArrayInput
    values={stateObject[label.toLowerCase()]}
    labels={labels}
    onChange={onChange}
  />
</p>

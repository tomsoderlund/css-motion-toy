import React from 'react'
import styled from 'styled-components'

const ArrayValueInput = styled.input`
  width: 4em;
  margin: 0 0.05em;
`

export default ({ values, labels, onChange }) => <span>
  {values.map((value, index) => <ArrayValueInput
    key={index}
    type='number'
    placeholder={labels[index]}
    title={labels[index]}
    value={value}
    onChange={onChange.bind(this, index)}
  />)}
</span>

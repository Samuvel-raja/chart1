import React from 'react'
import HorizontalBarChart from './BarChart'

const Scope1 = ({scope1Data,fyears}) => {
  return (
    <div>
      <HorizontalBarChart edata={scope1Data} fyears={fyears}/>
    </div>
  )
}

export default Scope1

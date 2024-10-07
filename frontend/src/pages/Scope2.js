import React from 'react'
import HorizontalBarChart from './BarChart'

const Scope2 = ({scope2Data,fyears}) => {
  return (
    <div>
        <HorizontalBarChart edata={scope2Data} fyears={fyears}/>
    </div>
  )
}

export default Scope2

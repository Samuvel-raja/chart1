import React from 'react'
import HorizontalBarChart from './BarChart'

const Scope3 = ({scope3Data,fyears}) => {
  return (
    <div>
        <HorizontalBarChart edata={scope3Data} fyears={fyears}/>
    </div>
  )
}

export default Scope3

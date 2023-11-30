import MarketingLayout from '@/components/MarketingLayout'
import React from 'react'
import GridComponent from './GridComponent'

const DomainPage = () => {
  return (
    <MarketingLayout GridComponent={<GridComponent />}>
        Domain page
    </MarketingLayout>
  )
}

export default DomainPage
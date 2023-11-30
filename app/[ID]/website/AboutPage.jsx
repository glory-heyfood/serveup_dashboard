import MarketingLayout from '@/components/MarketingLayout'
import React from 'react'
import GridComponent from './GridComponent'

const AboutPage = () => {
  return (
    <MarketingLayout GridComponent={<GridComponent />}>
        About
    </MarketingLayout>
  )
}

export default AboutPage
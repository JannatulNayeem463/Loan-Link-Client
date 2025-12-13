import React from 'react'
import Banner from '../components/Banner'
import HowItWorks from '../components/HowItWorks'
import CustomerFeedback from '../components/CustomerFeedback '
import WhyChooseUs from '../components/WhyChooseUs '
import LoanFAQ from '../components/LoanFAQ '
import AvailableLoans from '../components/AvailableLoans '


const Home = () => {
  return (
    <div>
      <Banner/>
      <AvailableLoans/>
      <HowItWorks/>
      <CustomerFeedback/>
      <WhyChooseUs/>
      <LoanFAQ/>

    </div>
  )
}

export default Home


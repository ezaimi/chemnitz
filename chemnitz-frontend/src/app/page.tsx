// src/app/page.tsx
import About from '@/components/about/About'
import Header from '@/components/general/Header'
import Hero from '@/components/general/Hero'
import { HeaderItemsType } from '@/types/componentTypes'
import AttractionsContainer from '@/components/AttractionsContainer'
import TestCurrentUser from '@/components/TestCurrentUser'
import Footer from '@/components/general/Footer'



export default function Home() {
  return (
    <>
      <div className='bg-[#f4f4f4]'>
        <div id='home'> <Header />
          <Hero /></div>


        <br />
        <br />
        <br />
        <br />

        <div id='about'> <About /></div>



        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <div id='attractions'>        <AttractionsContainer />
        </div>

        <div id='contact'></div>
        <Footer />

      </div>
    </>
  )
}

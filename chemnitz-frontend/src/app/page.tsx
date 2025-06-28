// src/app/page.tsx
import About from '@/components/about/About'
import Header from '@/components/general/Header'
import Hero from '@/components/general/Hero'
import { HeaderItemsType } from '@/types/componentTypes'
import AttractionsContainer from '@/components/AttractionsContainer'



export default function Home() {
  return (
    <>
      <div className='bg-[#f4f4f4]'>
        <Header  />
        <Hero />
        <br />
        <br />
        <br />
        <br />
        <About/>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <AttractionsContainer/>
      </div>
    </>
  )
}

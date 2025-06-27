// src/app/page.tsx
import Header from '@/components/general/Header'
import Hero from '@/components/general/Hero'
import { HeaderItemsType } from '@/types/componentTypes'

const headerItems:HeaderItemsType[] = [
    {label:'home'},
    {label:'about'},
    {label:'attractions'},
    {label:'map'},
    {label:'plan'},
    {label:'contact'}

]

export default function Home() {
  return (
    <>
      <Header headerItems={headerItems}  />
      <Hero />
    </>
  )
}

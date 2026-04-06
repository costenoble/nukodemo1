import { cloneElement, isValidElement } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import SEOHead from '../SEOHead'
import useLocomotiveScroll from '../../hooks/useLocomotiveScroll'
import { LocomotiveContext } from '../../context/LocomotiveContext'

export default function Layout({ children }) {
  const { scrollRef, scrollTo, locoReady } = useLocomotiveScroll()
  const childWithProps = isValidElement(children)
    ? cloneElement(children, { scrollTo })
    : children

  return (
    <LocomotiveContext.Provider value={{ ready: locoReady }}>
      <SEOHead />
      <Navbar scrollTo={scrollTo} />
      <div id="scroll-container" data-scroll-container ref={scrollRef}>
        {childWithProps}
        <Footer />
      </div>
    </LocomotiveContext.Provider>
  )
}

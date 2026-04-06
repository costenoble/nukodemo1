import { createContext, useContext } from 'react'

export const LocomotiveContext = createContext({ ready: false })

export const useLocoReady = () => useContext(LocomotiveContext)

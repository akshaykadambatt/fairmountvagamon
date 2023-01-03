import { useEffect, useState } from "react"

const useViewport = () => {
    const [width, setWidth] = useState(0)
    const handleResize = () => setWidth(window.innerWidth)
    const hasWindow = typeof window !== 'undefined'
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [hasWindow])

    return { 
        w: width, 
        desk: width>1023, //return true if in tablet breakpoint
        tab: width<1023, //return true if in tablet breakpoint
        mob: width<767 //return true if in mobile breakpoint
    }
    
}

export default useViewport
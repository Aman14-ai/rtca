import React from 'react'
import DesktopNav from './nav/DesktopNav'
import MobileNav from './nav/MobileNav'

type Props = React.PropsWithChildren<{}>

const SidebarWrapper = ({ children }: Props) => {
    return (
        <div className='h-full w-full flex flex-col px-1 py-0.5 lg:flex-row gap-1'>
            <MobileNav />
            <DesktopNav />
            <main className='h-[calc(100%-80px)] lg:h-full w-full flex gap-4'>
                {children}
            </main>
        </div>
    )
}

export default SidebarWrapper
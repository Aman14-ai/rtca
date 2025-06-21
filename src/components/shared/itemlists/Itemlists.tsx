import { Card } from '@/components/ui/card'
import React from 'react'
import { Search } from 'lucide-react'
import AnimatedNameLogo from './Logo'

type Props = React.PropsWithChildren<{
    title: string,
    action?: React.ReactNode
}>

const Itemlists = ({ children, title, action: Action }: Props) => {
    return (
        <Card className="bg-cad mb-4 border-none w-full md:max-w-[370px] h-screen lg:h-[100vh] lg:max-w-[500px] lg:ml-0 p-4 overflow-y-scroll ">
            <AnimatedNameLogo />
            <div className="flex flex-col gap-4 lg:max-w-[500px] w-full h-full">

                {/* Heading + Action */}
                <div className='flex items-center justify-between'>
                    <h1 className="text-heading text-xl tracking-wide font-extrabold">{title}</h1>
                    {Action ? Action : null}
                </div>

                {/* Search Bar */}
                <div className="searchbar w-full h-10 border border-white/20 rounded-md px-3 py-1 flex items-center gap-2 bg-white/10 backdrop-blur-sm focus-within:ring-2 focus-within:ring-white/30 transition">
                    <Search className="text-white/70 size-4" />
                    <input
                        type="text"
                        placeholder="Search or start new chat"
                        className="bg-transparent outline-none border-none text-white placeholder-white/70 text-sm w-full"
                    />
                </div>

                {/* Dynamic Content */}
                {children}

            </div>
        </Card>

    )
}

export default Itemlists
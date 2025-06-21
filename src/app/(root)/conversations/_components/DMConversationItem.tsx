import React from 'react'
import { Id } from '../../../../../convex/_generated/dataModel'
import Requests from '../../friends/_components/Requests';
import { Card } from '@/components/ui/card';
import Link from 'next/link'

type Props = {
    id: Id<"conversations">;
    username: string;
    imageUrl: string;
    email: string
}

const DMConversationItem = ({ id, username, imageUrl, email }: Props) => {
    return (
        <Link href={`/conversations/${id}`}>
            <Card className='bg-cad text-white h-18 border-none gap-3 flex flex-row items-center cursor-pointer active:bg-black/10'>

                <div className="cursor-pointer">
                    <div className="group relative h-11 w-11 overflow-hidden rounded-full border-2 border-white/60 shadow-md dark:border-gray-800">
                        <img
                            src={imageUrl || "/default-avatar.jpg"}
                            alt="Profile"
                            className="h-11 w-11 object-cover transition-all duration-300 group-hover:scale-110"
                            
                        />

                        
                    </div>
                </div>

                <div className="relative w-full py-3 pb-3">
                    <div className="content w-full flex flex-col  justify-between">
                        <h3 className="text-md font-semibold">{username}</h3>
                        <p className="text-xs text-gray-400">{email}</p>
                    </div><div className="absolute top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#364650] to-transparent backdrop-blur-sm dark:via-[#3a4d59]"></div>

                    {/* Bottom blurred border */}
                    <div className="absolute bottom-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#364650]  to-transparent backdrop-blur-sm dark:via-[#3a4d59]"></div>


                </div>

            </Card>
        </Link>
    )
}

export default DMConversationItem
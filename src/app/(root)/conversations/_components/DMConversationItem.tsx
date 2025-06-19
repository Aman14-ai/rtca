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
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "/default-avatar.jpg";
                            }}
                        />

                        {!imageUrl && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                        )}
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
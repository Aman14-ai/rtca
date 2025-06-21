'use client'
import React from 'react'
import { Id } from '../../../../../convex/_generated/dataModel'
import { Card } from '@/components/ui/card';
import Image from 'next/image'
import { MoreVertical } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion } from 'framer-motion'
import { api } from '../../../../../convex/_generated/api';
import { useMutationState } from '@/hooks/useMutationState';
import { toast } from 'sonner';
import { ConvexError } from 'convex/values';

type Props = {
    id: Id<"requests">;
    imageUrl: string;
    username: string;
    email: string;
}

const Requests = ({ id, imageUrl, username, email }: Props) => {

    const { mutate: denyRequest, pending: denyPending } = useMutationState(api.request.denyRequest);
    const { mutate: acceptRequest, pending: acceptPending } = useMutationState(api.request.acceptRequest);

    const handleAcceptRequest = async () => {
        try {
            await acceptRequest({ id })
            toast.success("Request Accepted successfully.")
        } catch (error) {
            if (error instanceof ConvexError) {
                toast.error(error.data)
            }
            else {
                console.log("Error while accepting request");
                console.log(error)
                toast.error("unexpected error occurred.")
            }
        }
    }

    const handleDenyRequest = async () => {
        try {
            await denyRequest({ id })


            toast.success("Request Denied successfully.")
        } catch (error) {
            if (error instanceof ConvexError) {
                toast.error(error.data)
            }
            else {
                console.log("Error while denying request");
                console.log(error)
                toast.error("unexpected error occurred.")
            }
        }
    }

    return (
        <Card className='bg-cad text-white h-18 border-none gap-3 flex flex-row items-center'>
            
            <div className="cursor-pointer">
                <div className="group relative h-11 w-11 overflow-hidden rounded-full border-2 border-white/60 shadow-md dark:border-gray-800">
                    <img
                        src={imageUrl || "/default-avatar.jpg"}
                        alt="Profile"
                        className="h-11 w-11 object-cover transition-all duration-300 group-hover:scale-110"
                        
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
                {/* Content container */}
                <div className="content w-full flex items-center justify-between">
                    <div className=' '>
                        <h3 className="text-md font-semibold">{username}</h3>
                        <p className="text-xs text-gray-400">{email}</p>
                    </div>
                    <div className="status mx-4 cursor-pointer">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="cursor-pointer rounded-full p-1.5 text-gray-300 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                                >
                                    <motion.div
                                        animate={{ rotate: 0 }}
                                        whileHover={{ rotate: 90 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <MoreVertical className="h-5 w-5" />
                                    </motion.div>
                                </motion.button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                className="w-56 origin-top rounded-xl border border-gray-200 bg-white/95 p-1 shadow-lg backdrop-blur-lg dark:border-gray-700 dark:bg-gray-900/95 dark:shadow-gray-900/50"
                                sideOffset={5}
                                align="start"
                            >
                                {/* Animated entry effect */}
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <DropdownMenuLabel className="flex items-center px-2 py-1.5 text-sm font-medium text-rose-800 ">
                                        Actions
                                    </DropdownMenuLabel>

                                    <DropdownMenuSeparator className="mx-2 my-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700" />

                                    <DropdownMenuGroup>
                                        {/* Follow Item */}
                                        <DropdownMenuItem className="group relative rounded-lg px-2 py-1.5 text-sm text-gray-700 transition-colors focus:bg-gray-100 focus:text-gray-900 dark:text-gray-300 dark:focus:bg-gray-800 dark:focus:text-gray-100">
                                            <button onClick={handleAcceptRequest} className="flex items-center cursor-pointer">
                                                <motion.svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="cursor-pointer mr-2 h-4 w-4 text-blue-500"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    initial={{ scale: 1 }}
                                                    whileHover={{ scale: 1.2 }}
                                                >
                                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                    <circle cx="8.5" cy="7" r="4" />
                                                    <line x1="20" y1="8" x2="20" y2="14" />
                                                    <line x1="23" y1="11" x2="17" y2="11" />
                                                </motion.svg>
                                                Follow
                                            </button>
                                            <DropdownMenuShortcut className="ml-auto opacity-0 transition-opacity group-hover:opacity-100">
                                                ⌘F
                                            </DropdownMenuShortcut>
                                        </DropdownMenuItem>

                                        {/* Reject Item */}
                                        <DropdownMenuItem className="group relative rounded-lg px-2 py-1.5 text-sm text-gray-700 transition-colors focus:bg-gray-100 focus:text-gray-900 dark:text-gray-300 dark:focus:bg-gray-800 dark:focus:text-gray-100">
                                            <button
                                                onClick={handleDenyRequest}
                                                className="flex items-center cursor-pointer">
                                                <motion.svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="cursor-pointer mr-2 h-4 w-4 text-rose-500"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    initial={{ rotate: 0 }}
                                                    whileHover={{ rotate: 15 }}
                                                >
                                                    <circle cx="12" cy="12" r="10" />
                                                    <line x1="15" y1="9" x2="9" y2="15" />
                                                    <line x1="9" y1="9" x2="15" y2="15" />
                                                </motion.svg>
                                                Reject
                                            </button>
                                            <DropdownMenuShortcut className="ml-auto opacity-0 transition-opacity group-hover:opacity-100">
                                                ⌘R
                                            </DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>

                                    {/* Floating particles background (subtle effect) */}
                                    <div className="absolute inset-0 -z-10 overflow-hidden opacity-5">
                                        {[...Array(5)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute h-1 w-1 rounded-full bg-gray-500"
                                                initial={{
                                                    x: Math.random() * 100,
                                                    y: Math.random() * 100,
                                                    opacity: 0
                                                }}
                                                animate={{
                                                    x: [null, Math.random() * 100],
                                                    y: [null, Math.random() * 100],
                                                    opacity: [0, 0.2, 0]
                                                }}
                                                transition={{
                                                    duration: 5 + Math.random() * 10,
                                                    repeat: Infinity,
                                                    ease: "linear"
                                                }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                </div>

                {/* Top blurred border */}
                <div className="absolute top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#364650] to-transparent backdrop-blur-sm dark:via-[#3a4d59]"></div>

                {/* Bottom blurred border */}
                <div className="absolute bottom-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#364650]  to-transparent backdrop-blur-sm dark:via-[#3a4d59]"></div>
            </div>
        </Card>
    )
}

export default Requests
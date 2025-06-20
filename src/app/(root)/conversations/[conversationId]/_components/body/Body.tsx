'use client'
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef } from 'react'
import { Id } from '../../../../../../../convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { api } from '../../../../../../../convex/_generated/api';
import Message from './Message';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Body = () => {
    const pathname = usePathname();
    const conversationId = pathname?.split("/").pop() as Id<"conversations">;
    const messages = useQuery(api.messages.get, { id: conversationId });
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className='flex-1 w-full overflow-y-auto p-3 no-scrollbar'>
            <div className='min-h-full flex flex-col justify-end'>
                <div className='flex flex-col gap-2'>
                    {messages === undefined ? (
                        <div className='flex justify-center items-center h-full'>
                            <Loader2 className='h-8 w-8 animate-spin' />
                        </div>
                    ) : messages?.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='flex flex-col items-center justify-center h-full text-center p-4'
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="80"
                                height="80"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-gray-400 mb-4"
                            >
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                            <p className='text-gray-500'>No messages yet. Start the conversation!</p>
                        </motion.div>
                    ) : (
                        messages?.map(({ msg, senderImage, senderName, isCurrentUser }, index) => {
                            const lastByUser = messages[index - 1]?.msg.senderId === messages[index].msg.senderId;
                            return (
                                <motion.div
                                    key={msg._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Message
                                        fromCurrentUser={isCurrentUser}
                                        senderImage={senderImage}
                                        senderName={senderName}
                                        lastByUser={lastByUser}
                                        content={msg.content}
                                        createdAt={msg._creationTime}
                                        type={msg.type}
                                    />
                                </motion.div>
                            )
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>
        </div>
    )
}

export default Body
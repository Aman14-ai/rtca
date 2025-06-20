'use client'
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef } from 'react'
import { Id } from '../../../../../../../convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { api } from '../../../../../../../convex/_generated/api';
import Message from './Message';
import { Loader2 } from 'lucide-react';

const Body = () => {
    const pathname = usePathname();
    const conversationId = pathname?.split("/").pop() as Id<"conversations">;
    const messages = useQuery(api.messages.get, { id: conversationId });
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [messages]);

    return (
        <div className='flex-1 w-full overflow-y-auto p-3 no-scrollbar'>
            <div className='flex flex-col-reverse gap-2 min-h-full'>
                {/* This empty div helps with proper scrolling */}
                <div ref={messagesEndRef} />
                
                {messages === undefined ? (
                    <div className='flex justify-center items-center h-full'>
                        <Loader2 className='h-8 w-8 animate-spin' />
                    </div>
                ) : messages?.length === 0 ? (
                    <div className='flex flex-col items-center justify-center h-full text-center p-4'>
                        <p className='text-gray-500'>No messages yet. Start the conversation!</p>
                    </div>
                ) : (
                    messages.map(({msg, senderImage, senderName, isCurrentUser}, index) => {
                        const lastByUser = messages[index - 1]?.msg.senderId === messages[index].msg.senderId;
                        return (
                            <Message 
                                key={msg._id} 
                                fromCurrentUser={isCurrentUser} 
                                senderImage={senderImage} 
                                senderName={senderName} 
                                lastByUser={lastByUser} 
                                content={msg.content} 
                                createdAt={msg._creationTime} 
                                type={msg.type}  
                            />
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default Body
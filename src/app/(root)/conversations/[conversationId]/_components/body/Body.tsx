'use client'
import { usePathname } from 'next/navigation';
import React from 'react'
import { Id } from '../../../../../../../convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { api } from '../../../../../../../convex/_generated/api';
import Message from './Message';

type Props = {}

const Body = (props: Props) => {
    const pathname = usePathname();
    const conversationId = pathname?.split("/").pop() as Id<"conversations">;

    const messages = useQuery(api.messages.get, { id: conversationId });

    return (
        <div className='flex-1 w-full flex overflow-y-scroll flex-col-reverse gap-2 p-3 no-scrollbar'>
            {
                messages?.map(({msg , senderImage , senderName , isCurrentUser},index) => {
                    const lastByUser = messages[index - 1]?.msg.senderId === messages[index].msg.senderId;
                    return <Message key={msg._id} fromCurrentUser={isCurrentUser} senderImage={senderImage} senderName={senderName} lastByUser={lastByUser} content={msg.content} createdAt={msg._creationTime} type={msg.type}  />
                })
            }
        </div>
    )
}

export default Body
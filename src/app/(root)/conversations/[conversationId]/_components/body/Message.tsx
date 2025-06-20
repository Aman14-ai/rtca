import React from 'react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';

type Props = {
    fromCurrentUser: boolean;
    senderImage: string;
    senderName: string;
    lastByUser: boolean;
    content: string[],
    createdAt: number;
    type: string;
}

const formatTime = (timestamp: number) => {
    return format(timestamp, 'HH:mm')
}

const Message = ({ fromCurrentUser, senderImage, senderName, lastByUser, content, createdAt, type }: Props) => {
    return (
        <motion.div
            className={cn("flex items-end", {
                "justify-end": fromCurrentUser,
            })}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
            <div className={cn("flex flex-col w-full mx-2", {
                "order-1 items-end": fromCurrentUser,
                "order-2 items-start": !fromCurrentUser,
            })}>
                <div className={cn(
                    "px-4 py-2 rounded-lg max-w-[90%] md:max-w-[80%] lg:max-w-[78%] flex gap-2 flex-row",
                    {
                        "bg-primary text-white": fromCurrentUser,
                        "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100": !fromCurrentUser,
                        "rounded-br-none": !lastByUser && fromCurrentUser,
                        "rounded-bl-none": !lastByUser && !fromCurrentUser,
                    }
                )}>
                    {type === 'text' ? (
                        <p className='text-wrap break-words whitespace-pre-wrap'>{content}</p>
                    ) : null}
                    <p className={cn("text-xs mt-1", {
                        "text-white/70": fromCurrentUser,
                        "text-gray-500 dark:text-gray-400": !fromCurrentUser,
                    })}>
                        {formatTime(createdAt)}
                    </p>
                </div>
            </div>
            <Avatar className={cn("relative h-8 w-8", {
                "order-2": fromCurrentUser,
                "order-1": !fromCurrentUser,
                "invisible": lastByUser
            })}>
                <AvatarImage src={senderImage} />
                <AvatarFallback>
                    {senderName.substring(0, 1)}
                </AvatarFallback>
            </Avatar>
        </motion.div>
    )
}

export default Message
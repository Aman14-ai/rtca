import React from 'react'
import {format} from 'date-fns'
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
    fromCurrentUser: boolean;
    senderImage:string;
    senderName:string;
    lastByUser:boolean;
    content:string[],
    createdAt:number;
    type:string;

}

const formatTime = (timestamp:number) => {
    return format(timestamp , 'HH:mm')
}

const Message = ({fromCurrentUser , senderImage , senderName , lastByUser , content , createdAt , type}: Props) => {
  return (
    <div className={cn("flex items-end" , {
        "justify-end" : fromCurrentUser,
    })} >
        <div className={cn("flex flex-col w-full mx-2 " , {
            "order-1 items-end" : fromCurrentUser,
            "order-2 items-start" : !fromCurrentUser,
        })}>
            <div className={cn("px-4 py-2 rounded-lg max-w-[78%] flex gap-2 flex-row " ,{
                "bg-primary text-white " : fromCurrentUser,
                "bg-heading text-cad" : !fromCurrentUser,
                "rounded-br-none" : !lastByUser && fromCurrentUser,
                "rounded-bl-none" : !lastByUser && !fromCurrentUser,
            })}>
                {
                    type==='text' ? <p className='text-wrap break-words whitespace-pre-wrap'>{content}</p> : null
                }
                <p className='text-black/60 text-sm mt-2'>{formatTime(createdAt)}</p>
            </div>
        </div>
        <Avatar className={cn("relative h-8 w-8 " , {
            "order-2" : fromCurrentUser,
            "order-1" : !fromCurrentUser,
            "invisible" : lastByUser
        })}>
            <AvatarImage src={senderImage} />
            <AvatarFallback>{senderName.substring(0,1)}</AvatarFallback>
        </Avatar>
    </div>
  )
}

export default Message
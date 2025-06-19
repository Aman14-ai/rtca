'use client'
import { useQuery } from 'convex/react';
import React from 'react'
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import { useParams } from 'next/navigation';
import Header from './_components/Header';
import { Loader2 } from 'lucide-react';
import Body from './_components/body/Body';
import ChatInput from './_components/input/ChatInput';


const page = () => {

  const params = useParams();
  const conversationId = params.conversationId as Id<'conversations'>;

  const conversation = useQuery(api.conversation.get, { id: conversationId });



  return (
    <>
      {
        conversation === undefined
          ?
          (<Loader2 />)
          :
          conversation === null
            ?
            (<div>Conversation not found</div>)
            :
            (
              <>
                <div className="container flex flex-col">
                  <Header imageUrl={(conversation.isGroup ? "" : conversation.otherMember.imageUrl || "")} username={(conversation.isGroup ? conversation.name : conversation.otherMember.username) || ""} />
                  <Body />
                  <ChatInput />
                </div>

              </>
            )
      }
    </>
  )
}

export default page
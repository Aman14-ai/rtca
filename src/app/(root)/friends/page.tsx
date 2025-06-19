'use client' // Add this at the top to make it a Client Component

import ConversationFallback from '@/components/shared/conversations/ConversationFallback'
import Itemlists from '@/components/shared/itemlists/Itemlists'
import React from 'react'
import AddFriendDialog from './_components/AddFriendDialog'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { Loader2 } from 'lucide-react'
import Requests from './_components/Requests'

type Props = {}

const Friends = (props: Props) => {
  // Correct usage of useQuery - no await needed
  const requests = useQuery(api.requests.get)

  return (
    <>
      <Itemlists title='Friends' action={<AddFriendDialog />}>
        <div className='text-heading flex flex-col -space-y-2'>
          {
            requests === undefined ? (
              <div className='flex items-center justify-center'>
                <Loader2 className='h-8 w-8 text-rose-500 animate-spin' />
              </div>
            ) : requests.length === 0 ? (
              <p>No Friend Requests</p>
            ) : (
              requests.map((request) => (
                <Requests
                  key={request.request._id}
                  id={request.request._id}
                  imageUrl={request.sender.imageUrl}
                  username={request.sender.username}
                  email={request.sender.email}
                />
              ))
            )
          }
        </div>
      </Itemlists>
      <ConversationFallback />
    </>
  )
}

export default Friends
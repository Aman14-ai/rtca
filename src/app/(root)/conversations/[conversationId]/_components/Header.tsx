import { Card } from '@/components/ui/card'
import { ArrowLeft, ArrowLeftFromLine, MoreVertical, Search, Video } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

type Props = {
  imageUrl: string,
  username: string;
}

const Header = ({ username, imageUrl }: Props) => {
  return (
    <Card className='bg-cad w-full h-18 border-none flex  flex-row items-center sm:-ml-0 lg:-ml-3 lg:px-6 px-2 rounded-none lg:gap-4 gap-1'>

      <div className=''>
        <Link href={"/conversations"}>
          <ArrowLeft className='text-rose-200 active:text-rose-500 h-5 w-5 cursor-pointer ' />
        </Link>
      </div>

      <div className="  cursor-pointer">
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

      <div className='flex w-full items-center justify-between'>
        <div className=''>
          <div className=' font-bold tracking-tight font-sans text-heading'>{username}</div>
          <div className='cursor-pointer text-sm text-heading/50'>click here for contact info</div>
        </div>
        <div className='flex gap-3 lg:gap-5 md:gap-4'>
          <Video className='cursor-pointer' />
          <Search className='cursor-pointer' />
          <MoreVertical className='cursor-pointer' />
        </div>
      </div>

    </Card>
  )
}

export default Header
'use client'
import ConversationFallback from '@/components/shared/conversations/ConversationFallback'
import Itemlists from '@/components/shared/itemlists/Itemlists'
import React from 'react'
import AddFriendDialog from './_components/AddFriendDialog'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { Loader2 } from 'lucide-react'
import Requests from './_components/Requests'
import { motion } from 'framer-motion'

const ConnectionIcon = () => (
  <motion.svg
    width="80"
    height="80"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 0.8 }}
    animate={{ scale: 1 }}
    transition={{
      type: "spring",
      damping: 10,
      stiffness: 100,
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 2
    }}
  >
    {/* Central node */}
    <motion.circle
      cx="50"
      cy="50"
      r="12"
      fill="#F43F5E"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    />
    
    {/* Outer nodes */}
    {[0, 1, 2].map((i) => {
      const angle = (i * 120 * Math.PI) / 180;
      const cx = 50 + 30 * Math.cos(angle);
      const cy = 50 + 30 * Math.sin(angle);
      
      return (
        <g key={i}>
          <motion.circle
            cx={cx}
            cy={cy}
            r="8"
            fill="#F43F5E"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          />
          
          {/* Connection lines */}
          <motion.path
            d={`M50,50 L${cx},${cy}`}
            stroke="#F43F5E"
            strokeWidth="2"
            strokeDasharray="0 1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.4 + i * 0.1,
              type: "spring"
            }}
          />
          
          {/* Pulsing effect */}
          <motion.circle
            cx={cx}
            cy={cy}
            r="12"
            stroke="#F43F5E"
            strokeWidth="1"
            fill="none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.2, 1.5] }}
            transition={{
              duration: 2,
              delay: 0.8 + i * 0.2,
              repeat: Infinity
            }}
          />
        </g>
      );
    })}
    
    {/* Animated rings around center */}
    <motion.circle
      cx="50"
      cy="50"
      r="20"
      stroke="#F43F5E"
      strokeWidth="1"
      fill="none"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: [0.3, 0.8, 0], scale: [1, 1.5, 2] }}
      transition={{
        duration: 3,
        delay: 0.6,
        repeat: Infinity
      }}
    />
  </motion.svg>
)

const Friends = () => {
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
              <motion.div 
                className="flex flex-col items-center justify-center py-8 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <ConnectionIcon />
                </div>
                <motion.div
                  className="text-center space-y-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <h3 className="text-xl font-bold text-rose-500">Your Network is Ready to Grow</h3>
                  <p className="text-gray-500">Connect with others to build meaningful relationships</p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4"
                  >
                    <AddFriendDialog />
                  </motion.div>
                </motion.div>
                <motion.div
                  className="flex space-x-4 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, i % 2 === 0 ? 10 : -10]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: i * 0.5,
                        ease: "easeInOut"
                      }}
                    >
                      <ConnectionIcon />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
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
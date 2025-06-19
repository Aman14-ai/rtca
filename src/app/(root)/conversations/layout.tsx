'use client'
import Itemlists from '@/components/shared/itemlists/Itemlists'
import { useQuery } from 'convex/react'
import React, { useEffect, useState } from 'react'
import { api } from '../../../../convex/_generated/api'
import { motion } from 'framer-motion'
import DMConversationItem from './_components/DMConversationItem'
import { usePathname } from 'next/navigation'

type Props = React.PropsWithChildren<{}>

const Layout = ({ children }: Props) => {

  const conversations = useQuery(api.conversations.get);
  console.log(conversations);

  const [isHovered, setIsHovered] = useState(false);
  const [isLargeScreen , setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsLargeScreen(window.innerWidth >= 800); 
    };

    checkScreen(); 
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  let pathname = usePathname();
  //console.log(pathname)
  const path = pathname.split('/');
  //console.log(path);

 // console.log("Is it a largescreen" , isLargeScreen);

  const render = ((path.length <= 2 || isLargeScreen))
  //console.log("Does render ", render)


  return (
    <>
      { 
      render &&
        <Itemlists title='Chats'>
          {
            conversations ? conversations.length > 0 ?
              (
                conversations.map((conversations) => {
                  return conversations.conversation.isGroup ? (null) :
                    (
                      <DMConversationItem
                        key={conversations.conversation._id}
                        id={conversations.conversation._id}
                        imageUrl={conversations.otherMember?.imageUrl || ''}
                        username={conversations.otherMember?.username || ''}
                        email={conversations.otherMember?.email || ''}
                      />
                    )
                })
              ) :
              (
                <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 bg-nav/20 rounded-xl   shadow-lg">
                  {/* Animated rose flower SVG */}
                  <motion.svg
                    width="80"
                    height="80"
                    viewBox="0 0 100 100"
                    className="mb-4"
                    animate={{
                      rotate: isHovered ? [0, -10, 10, 0] : 0,
                      scale: isHovered ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.8 }}
                  >
                    {/* Rose petals */}
                    <motion.path
                      d="M50 30C40 20 30 25 30 35C30 45 40 50 50 55C60 50 70 45 70 35C70 25 60 20 50 30Z"
                      fill="#fb7185"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    />
                    <motion.path
                      d="M50 25C45 15 35 20 35 30C35 40 45 45 50 50C55 45 65 40 65 30C65 20 55 15 50 25Z"
                      fill="#f43f5e"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    />
                    {/* Rose center */}
                    <motion.circle
                      cx="50"
                      cy="40"
                      r="5"
                      fill="#be123c"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    />
                    {/* Stem and leaves */}
                    <motion.path
                      d="M50 60L50 80M40 70L50 65M60 75L50 70"
                      stroke="#4d7c0f"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.8, duration: 1 }}
                    />
                  </motion.svg>

                  {/* Floating conversation bubbles */}
                  <div className="relative w-full max-w-md">
                    <motion.div
                      className="absolute -left-4 -top-8"
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#fda4af">
                        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2z" />
                      </svg>
                    </motion.div>

                    <motion.div
                      className="absolute -right-2 -top-12"
                      animate={{
                        y: [0, -8, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.3,
                      }}
                    >
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="#f9a8d4">
                        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2z" />
                      </svg>
                    </motion.div>

                    {/* Main text */}
                    <motion.p
                      className="relative z-10 text-center text-rose-900 text-lg font-medium px-8 py-4 bg-white/90 backdrop-blur-sm rounded-full border border-rose-200 shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      onHoverStart={() => setIsHovered(true)}
                      onHoverEnd={() => setIsHovered(false)}
                    >
                      Please make friends to start conversations
                    </motion.p>
                  </div>

                  {/* Subtle animated dots */}
                  <motion.div className="flex gap-2 mt-6">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-rose-400"
                        animate={{
                          y: [0, -5, 0],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </motion.div>
                </div>
              ) :
              (
                <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 bg-nav/20 rounded-xl   shadow-lg">
                  {/* Animated rose flower SVG */}
                  <motion.svg
                    width="80"
                    height="80"
                    viewBox="0 0 100 100"
                    className="mb-4"
                    animate={{
                      rotate: isHovered ? [0, -10, 10, 0] : 0,
                      scale: isHovered ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.8 }}
                  >
                    {/* Rose petals */}
                    <motion.path
                      d="M50 30C40 20 30 25 30 35C30 45 40 50 50 55C60 50 70 45 70 35C70 25 60 20 50 30Z"
                      fill="#fb7185"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    />
                    <motion.path
                      d="M50 25C45 15 35 20 35 30C35 40 45 45 50 50C55 45 65 40 65 30C65 20 55 15 50 25Z"
                      fill="#f43f5e"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    />
                    {/* Rose center */}
                    <motion.circle
                      cx="50"
                      cy="40"
                      r="5"
                      fill="#be123c"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    />
                    {/* Stem and leaves */}
                    <motion.path
                      d="M50 60L50 80M40 70L50 65M60 75L50 70"
                      stroke="#4d7c0f"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.8, duration: 1 }}
                    />
                  </motion.svg>

                  {/* Floating conversation bubbles */}
                  <div className="relative w-full max-w-md">
                    <motion.div
                      className="absolute -left-4 -top-8"
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#fda4af">
                        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2z" />
                      </svg>
                    </motion.div>

                    <motion.div
                      className="absolute -right-2 -top-12"
                      animate={{
                        y: [0, -8, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.3,
                      }}
                    >
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="#f9a8d4">
                        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2z" />
                      </svg>
                    </motion.div>

                    {/* Main text */}
                    <motion.p
                      className="relative z-10 text-center text-rose-900 text-lg font-medium px-8 py-4 bg-white/90 backdrop-blur-sm rounded-full border border-rose-200 shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      onHoverStart={() => setIsHovered(true)}
                      onHoverEnd={() => setIsHovered(false)}
                    >
                      Please make friends to start conversations
                    </motion.p>
                  </div>

                  {/* Subtle animated dots */}
                  <motion.div className="flex gap-2 mt-6">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-rose-400"
                        animate={{
                          y: [0, -5, 0],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </motion.div>
                </div>
              )
          }
        </Itemlists>
      }
      {children}
    </>
  )
}

export default Layout
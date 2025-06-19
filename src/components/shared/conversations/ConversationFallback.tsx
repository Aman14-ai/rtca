import React from 'react'

const ConversationFallback = () => {
    return (
        <>
            <div className='hidden lg:block md:block relative text-heading w-full h-screen border rounded-lg border-cad/50 bg-conversation'>
                <div className='absolute inset-0 flex flex-col items-center justify-center px-4 text-center'>
                    {/* SVG Illustration */}
                    <div className="mb-8 w-48 h-48 text-heading/40">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-4 max-w-md">
                        <p className='text-xl md:text-2xl font-serif text-heading/80 tracking-wide'>
                            Please select a friend to start conversation
                        </p>
                        <div className="w-32 h-px bg-gradient-to-r from-transparent via-cad/40 to-transparent mx-auto"></div>
                        <p className='text-sm text-heading/50 font-light'>
                            © All rights reserved. Aman Kumar Choudhary
                        </p>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute bottom-8 left-8 w-16 h-16 rounded-full bg-heading/5"></div>
                    <div className="absolute top-12 right-10 w-24 h-24 rounded-full bg-heading/5 blur-sm"></div>
                </div>
            </div>
        </>
    )
}

export default ConversationFallback

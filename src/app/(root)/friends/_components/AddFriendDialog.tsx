"use client"
import React, { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogHeader,
    DialogFooter,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useMutationState } from '@/hooks/useMutationState';
import { api } from '../../../../../convex/_generated/api';
import { toast } from 'sonner';
import { ConvexError } from 'convex/values';

// adding form validation using zod you can do by react hook form

// schema
type FormData = { email: string };

const AddFriendDialog = () => {

    const { mutate: createRequest, pending } = useMutationState(api.request.create);
    const { register, watch, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();

    const email = watch("email");

    const handleSend = async (data:FormData) => {
        try {
            //console.log("Email in function is: " , data.email);
            await createRequest({ email: data.email });
            document.querySelector('form')?.reset();
            toast.success("Request Sent successfully.");
        } catch (error) {
            toast.error(error instanceof ConvexError ? error.data : "unexpected error occurred.");
        }
    };



    return (
        <Dialog>

            <Tooltip>
                <TooltipTrigger>
                    <DialogTrigger asChild>
                        <div className='hover:text-rose-300 text-white/80 hover:animate-bounce hover:animation-duration-[1s] cursor-pointer '>
                            <UserPlus />
                        </div>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent
                    className={`
                                            bg-rose-100 text-sm 
                                            border border-rose-300 dark:border-rose-700
                                            shadow-lg shadow-rose-300/50 dark:shadow-rose-900/30
                                            rounded-lg py-1 px-1
                                            animate-in fade-in-50 zoom-in-55
                                            data-[side=bottom]:slide-in-from-top-2
                                            data-[side=top]:slide-in-from-bottom-2
                                            data-[side=left]:slide-in-from-right-2
                                            data-[side=right]:slide-in-from-left-2
                                        `}
                >
                    <p className="text-rose-700 text-[12px] dark:text-rose-100 font-medium">
                        Add Friends
                    </p>
                </TooltipContent>
            </Tooltip>

            <DialogContent className='sm:max-w-[425px] text-cad'>
                <DialogHeader className='text-black'>
                    <DialogTitle className='text-rose-500'>Add Friend</DialogTitle>
                    <DialogDescription className="-ml-1 flex items-center gap-2 text-black/60">
                        <motion.svg
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            animate={{
                                y: [0, -5, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "easeInOut"
                            }}
                        >
                            <path fill="currentColor" d="M12 4a4 4 0 014 4a4 4 0 01-4 4a4 4 0 01-4-4a4 4 0 014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" />
                        </motion.svg>
                        Grow your circle! Send a request to connect with friends and start meaningful conversations.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(handleSend)}>
                    <div className="space-y-1">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Friend's Email
                        </label>

                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                value={email}

                                {...register("email", {
                                    required: { value: true, message: "Email is required" },
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    },
                                    maxLength: { value: 50, message: "Email too long" },
                                    minLength: { value: 8, message: "Email too short" },
                                })}
                                placeholder="friend@example.com"
                                className={`block w-full rounded-md border px-3 py-2 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 ${errors.email
                                    ? "border-rose-500 text-rose-900 focus:ring-rose-500 bg-rose-50"
                                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800"
                                    }`}
                            />
                        </div>

                        {errors.email && (
                            <motion.p
                                className="flex items-start gap-1.5 text-sm text-rose-600 dark:text-rose-400"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <svg
                                    className="mt-0.5 h-4 w-4 flex-shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>{errors.email.message as string}</span>
                            </motion.p>
                        )}
                    </div>


                    <DialogFooter className={`${isSubmitting ? "cursor-wait" : ""}`}>
                        <Button
                            disabled={isSubmitting}
                            type='submit'
                            className={`mt-3 ${isSubmitting ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
                            aria-busy={isSubmitting}>
                            {
                                !isSubmitting ? (
                                    <>
                                        <span>Send Request</span>

                                    </>
                                ) : (
                                    <>
                                        <span>sending</span>
                                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    </>

                                )
                            }
                        </Button>
                    </DialogFooter>
                </form>

            </DialogContent>

        </Dialog >
    )
}

export default AddFriendDialog
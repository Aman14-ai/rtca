'use client'
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, UserPlus } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogHeader,
    DialogFooter,
} from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { useMutationState } from '@/hooks/useMutationState'
import { toast } from 'sonner'
import { ConvexError } from 'convex/values'

type FormData = { email: string }

const ListsOfUsers = () => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const allUsers = useQuery(api.users.getAll)
    
    const { mutate: createRequest, pending } = useMutationState(api.request.create)
    const { 
        register, 
        handleSubmit, 
        reset,
        formState: { errors, isSubmitting } 
    } = useForm<FormData>()

    const handleSend = async (data: FormData) => {
        try {
            await createRequest({ email: data.email })
            toast.success("Request Sent successfully.")
            setDialogOpen(false)
        } catch (error) {
            toast.error(error instanceof ConvexError ? error.data : "Unexpected error occurred.")
        }
    }

    const handleUserClick = (email: string) => {
        reset({ email }) // Set the form value to the selected user's email
        setDialogOpen(true)
    }

    return (
        <>
            <div className="text-heading cursor-pointer">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Menu />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='max-h-[400px] overflow-y-auto' align='start'>
                        <DropdownMenuLabel className='text-lg font-bold text-rose-500'>
                            Make friends with
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            {allUsers?.map((user) => (
                                <DropdownMenuItem
                                    key={user.email}
                                    className='flex justify-between items-center'
                                    onSelect={(e) => {
                                        e.preventDefault()
                                        handleUserClick(user.email)
                                    }}
                                >
                                    <Card className='bg-cad text-white h-18 border-none gap-1 flex flex-row items-center w-full'>
                                        <div className="cursor-pointer">
                                            <div className="group relative h-10 w-10 overflow-hidden rounded-full border-2 border-white/60 shadow-md">
                                                <img
                                                    src={user.imageUrl || "/default-avatar.jpg"}
                                                    alt="Profile"
                                                    className="h-11 w-11 object-cover transition-all duration-300 group-hover:scale-110"
                                                    
                                                />
                                                
                                            </div>
                                        </div>

                                        <div className="relative w-full py-3 pb-3">
                                            <div className="content w-full flex items-center justify-between">
                                                <div className='ml-2'>
                                                    <h3 className="text-xs font-semibold">{user.username}</h3>
                                                    <p className="text-[10px] text-gray-400">{user.email}</p>
                                                </div>
                                            </div>
                                            <div className="absolute top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#364650] to-transparent backdrop-blur-sm" />
                                            <div className="absolute bottom-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#364650] to-transparent backdrop-blur-sm" />
                                        </div>
                                    </Card>
                                    <DropdownMenuShortcut className='cursor-pointer hover:text-rose-500 active:text-rose-700'>
                                        <UserPlus className="h-4 w-4" />
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className='sm:max-w-[425px] text-cad bg-white'>
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
                            Grow your circle! Send a request to connect with friends.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(handleSend)}>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Friend's Email
                                </label>
                                <div className="relative">
                                    <input
                                        id="email"
                                        type="email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            },
                                        })}
                                        className={`block w-full rounded-md border px-3 py-2 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 ${
                                            errors.email
                                                ? "border-rose-500 text-rose-900 focus:ring-rose-500 bg-rose-50"
                                                : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                        }`}
                                    />
                                </div>
                                {errors.email && (
                                    <motion.p
                                        className="flex items-start gap-1.5 text-sm text-rose-600"
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
                                        <span>{errors.email.message}</span>
                                    </motion.p>
                                )}
                            </div>

                            <DialogFooter>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full mt-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span>Sending...</span>
                                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent ml-2" />
                                        </>
                                    ) : (
                                        "Send Request"
                                    )}
                                </Button>
                            </DialogFooter>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ListsOfUsers
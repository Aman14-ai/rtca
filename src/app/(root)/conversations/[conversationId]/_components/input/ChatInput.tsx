'use client'
import { Card } from '@/components/ui/card'
import { usePathname } from 'next/navigation'
import React, { useRef } from 'react'
import { z } from 'zod'
import { Id } from '../../../../../../../convex/_generated/dataModel'
import { useMutationState } from '@/hooks/useMutationState'
import { api } from '../../../../../../../convex/_generated/api'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { ConvexError } from 'convex/values'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import TextareaAutosize from 'react-textarea-autosize'
import { Button } from '@/components/ui/button'
import { SendHorizonal } from 'lucide-react'
import { motion } from 'framer-motion'

const chatMessageSchema = z.object({
    content: z.string().min(1, { message: "Message is required" }),
})

const ChatInput = () => {
    const pathname = usePathname();
    const conversationId = pathname?.split("/").pop() as Id<"conversations">;
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const { mutate: createMessage, pending } = useMutationState(api.message.create)

    const form = useForm<z.infer<typeof chatMessageSchema>>({
        resolver: zodResolver(chatMessageSchema),
        defaultValues: {
            content: ""
        }
    });

    const handleSubmit = async (values: z.infer<typeof chatMessageSchema>) => {
        await createMessage({
            conversationId,
            type: "text",
            content: [values.content]
        }).then(() => {
            form.reset();
        }).catch((error) => {
            toast.error(error instanceof ConvexError ? error.data : "unexpected error occurred.");
        })
    }

    return (
        <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full px-2 pb-2 md:pb-0 md:px-4"
        >
            <Card className='w-full bg-chat-input-bg border-none p-2 rounded-lg text-heading'>
                <div className='flex gap-2 items-end w-full'>
                    <Form {...form}>
                        <form className='flex gap-2 items-end w-full' onSubmit={form.handleSubmit(handleSubmit)}>
                            <FormField
                                control={form.control}
                                name='content'
                                render={({ field }) => (
                                    <FormItem className='h-full w-full'>
                                        <FormControl>
                                            <TextareaAutosize
                                                {...field}
                                                ref={textAreaRef}
                                                onKeyDown={(event) => {
                                                    if (event.key === 'Enter' && !event.shiftKey) {
                                                        event.preventDefault();
                                                        form.handleSubmit(handleSubmit)();
                                                    }
                                                }}
                                                rows={1}
                                                maxRows={5}
                                                placeholder='Type a message...'
                                                className='w-full min-h-full resize-none border-0 outline-0 mr-2 placeholder:text-white/40 p-1.5 bg-transparent'
                                            />
                                        </FormControl>
                                        <FormMessage className='text-destructive' />
                                    </FormItem>
                                )}
                            />
                            <motion.div whileTap={{ scale: 0.95 }}>
                                <Button 
                                    className='rounded-full p-2 cursor-pointer' 
                                    disabled={pending} 
                                    type='submit'
                                    variant="ghost"
                                >
                                    <SendHorizonal className="h-5 w-5" />
                                </Button>
                            </motion.div>
                        </form>
                    </Form>
                </div>
            </Card>
        </motion.div>
    )
}

export default ChatInput
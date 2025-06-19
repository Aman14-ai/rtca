'use client'
import { Card } from '@/components/ui/card'
import { useParams, usePathname } from 'next/navigation'
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
        <Card className='w-full bg-chat-input-bg border-none p-2 rounded-lg text-heading fixed bottom-0 left-0 right-0 md:static md:mb-2'>
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
                                            maxRows={3}
                                            placeholder='Type a message'
                                            className='w-full min-h-full resize-none border-0 outline-0 mr-2 placeholder:text-white/40 p-1.5'
                                        />
                                    </FormControl>
                                    <FormMessage className='text-destructive' />
                                </FormItem>
                            )}
                        />
                        <Button className='rounded-full py-3 cursor-pointer' disabled={pending} type='submit'>
                            <SendHorizonal />
                        </Button>
                    </form>
                </Form>
            </div>
        </Card>
    )
}

export default ChatInput
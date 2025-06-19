import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import type { WebhookEvent } from '@clerk/backend';
import { Webhook } from 'svix'
import { internal } from "./_generated/api";

// creating a server where webhooks endpoint will be send.
const http = httpRouter();

const validatePayload = async(req:Request) : Promise<WebhookEvent | undefined> => 
{
    const payload = await req.text();
    const svixHeaders = {
        "svix-id":req.headers.get("svix-id")!,
        "svix-timestamp":req.headers.get("svix-timestamp")!,
        "svix-signature":req.headers.get("svix-signature")!,
    }
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY!);

    try {
        const event = webhook.verify(payload, svixHeaders) as WebhookEvent;
        return event;
    } catch (error) {
        console.error("Clerk webhook verification error" , error);
        return undefined;
    }

}

export const handleHandler = httpAction(async(ctx , req) => {
    // first our target is to verify the payload and get the event information
    const event = await validatePayload(req);
    if(!event){
        return new Response("could not validate clerk payload" , {status:400});
    };
    switch(event.type)
    {
        case "user.created":
            console.log("🎯 Received user.created event for:", event.data.id);
            const user = await ctx.runQuery(internal.user.get , {clerkId:event.data.id});
            console.log("🔍 Existing user in DB:", user);
            if (!user) {
                console.log("🚀 Creating user...");
                await ctx.runMutation(internal.user.create, {
                username: `${event.data.first_name} ${event.data.last_name}`,
                imageUrl: event.data.image_url,
                clerkId: event.data.id,
                email: event.data.email_addresses[0].email_address
                });
                console.log("✅ User created in DB.");
            } else {
            console.log("⚠️ User already exists, skipping creation.");
            }
            break;
        case "user.updated":
            console.log("updating user " , event.data.id);
            await ctx.runMutation(internal.user.updateOrCreate , {
                username: `${event.data.first_name} ${event.data.last_name}`,
                imageUrl: event.data.image_url,
                clerkId: event.data.id,
                email: event.data.email_addresses[0].email_address
            });
            break;
        default:
            console.log("unknown event type" , event.type);
            break;
    }
    return new Response(null , {status:200});
})

http.route({
    path:"/clerk-users-webhook",
    method:"POST",
    handler: handleHandler
})

export default http
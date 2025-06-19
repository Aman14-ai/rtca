"use client"

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/useNavigation"
import { UserButton } from "@clerk/nextjs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import Link from "next/link"
import { Settings } from 'lucide-react';
import { Badge } from "@/components/ui/badge";


const MobileNav = () => {



    const path = useNavigation();

    return (
        <Card className="bg-nav lg:hidden  border-t-0  border-b-0 flex justify-between border-r-1 border-white/40 border-l-1 shadow-lg shadow-rose-300/20  opacity-100 mt-2 ">
            <div className="flex flex-row justify-between items-center mx-5 -my-4">
                <nav className="  ">
                    <ul className="flex flex-row items-center gap-6">
                        {
                            path.map((path, id) => {
                                return (
                                    <li key={id} className="relative">

                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button className="rounded-full" asChild size="icon" variant={path.active ? "default" : "outline"}>
                                                    <Link href={path.href}>
                                                        {path.icon}
                                                    </Link>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent
                                                className={`
                                            bg-rose-100
                                            border border-rose-300 dark:border-rose-700
                                            shadow-lg shadow-rose-300/50 dark:shadow-rose-900/30
                                            rounded-lg py-0.5 px-2
                                            animate-in fade-in-50 zoom-in-55
                                            data-[side=bottom]:slide-in-from-top-2
                                            data-[side=top]:slide-in-from-bottom-2
                                            data-[side=left]:slide-in-from-right-2
                                            data-[side=right]:slide-in-from-left-2
                                        `}
                                            >
                                                <p className="text-rose-700 text-sm dark:text-rose-100 font-medium">
                                                    {path.name}
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                        {
                                            typeof path.count === "number" && path.count > 0 &&
                                            (
                                                <Badge className="h-4 min-w-4 rounded-full px-1 font-mono tabular-nums bg-blue-500 text-white absolute -top-1.5 left-6">
                                                    {path.count}
                                                </Badge>
                                            )
                                        }


                                    </li>
                                )
                            })

                        }

                    </ul>
                </nav>

                <div className="flex flex-row items-center justify-center text-center gap-4">

                    <div>
                        <Settings className="text-rose-200 hover:text-white hover:bg-rose-500 hover:scale-110  hover:animate-spin cursor-pointer rounded-full hover:animation-duration-[4s] size-9 p-1" />
                    </div>
                    <div className="mt-2"><UserButton /></div>

                </div>
            </div>
        </Card>
    )
}

export default MobileNav

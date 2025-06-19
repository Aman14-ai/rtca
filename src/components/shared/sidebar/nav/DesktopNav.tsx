"use client"

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/useNavigation"
import { UserButton } from "@clerk/nextjs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import Link from "next/link"
import { Home, Settings } from 'lucide-react';
import { useState } from "react";
import { ModeToggle } from "@/components/ui/themes/theme-toggle";
import { Badge } from "@/components/ui/badge";

const DesktopNav = () => {

    const path = useNavigation();

    return (
        <Card className="hidden lg:flex lg:justify-between lg:items-center lg:flex-col lg:h-[100vh] bg-nav border-r-[#202c33] lg:w-17 lg:px-2 lg:py-5 lg:pb-30 border-t-0 border-l-0 border-b-0">
            <nav>
                <ul className="flex flex-col items-center gap-6">
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
            <div className="flex flex-col items-center gap-4">

                <div>
                    <Settings className="text-rose-200 hover:text-white hover:bg-rose-500 cursor-pointer rounded-full  size-9 p-1" />
                </div>
                <div><UserButton /></div>

            </div>

        </Card>
    )
}

export default DesktopNav

"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
    LogoutLink,
    useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { ChevronDown, Loader2, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { Fragment } from "react";

type Props = {};

const Header = (props: Props) => {
    const { setTheme } = useTheme();

    const { user, isAuthenticated, isLoading, error } = useKindeBrowserClient();

    return (
        <div className="shadow-sm w-full sticky top-0 bg-white dark:bg-gray-900 z-[9]">
            <div className="w-full mx-auto max-w-7xl py-3 px-4 md:px-6 flex items-center justify-between flex-wrap">
                {/* Left Section */}
                <div className="flex items-center flex-1 gap-4 md:gap-9">
                    {/* Logo */}
                    <div>
                        <Link
                            href="/dashboard"
                            className="font-black text-[20px] text-primary select-none"
                        >
                            ResuGenie.ai
                        </Link>
                    </div>

                    {/* Greeting Section (Hidden on small screens) */}
                    {isAuthenticated && user && (
                        <div className="hidden md:flex items-center gap-2">
                            <span className="font-normal text-black/50 dark:text-gray-200">
                                Hi,
                            </span>
                            <h5 className="font-bold text-black dark:text-gray-100">
                                {user?.given_name} {user?.family_name}
                            </h5>
                        </div>
                    )}
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4 mt-3 md:mt-0">
                    {/* Theme Toggle */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Loader or User Profile */}
                    {isLoading || error ? (
                        <Loader2 className="animate-spin h-6 w-6 text-black dark:text-white" />
                    ) : (
                        <Fragment>
                            {isAuthenticated && user && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger role="button">
                                        <div className="flex items-center gap-1">
                                            <Avatar role="button" className="!cursor-pointer">
                                                <AvatarImage src={user?.picture || ""} />
                                                <AvatarFallback className="!cursor-pointer">
                                                    {user?.given_name?.[0]}
                                                    {user?.family_name?.[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <ChevronDown size="18px" />
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="my-3">
                                    <DropdownMenuItem asChild>
                                            <div className="md:flex items-center gap-2">
                                                <span className="font-normal text-black/50 dark:text-gray-200">
                                                    Hi,
                                                </span>
                                                <h5 className="font-bold text-black dark:text-gray-100">
                                                    {user?.given_name} {user?.family_name}
                                                </h5>
                                            </div>
                                        </DropdownMenuItem>
                                        
                                        <Separator />
                                        <DropdownMenuItem
                                            asChild
                                            className="!text-red-500 !cursor-pointer font-medium"
                                        >
                                            <LogoutLink>Log out</LogoutLink>
                                        </DropdownMenuItem>
                                        
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </Fragment>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;

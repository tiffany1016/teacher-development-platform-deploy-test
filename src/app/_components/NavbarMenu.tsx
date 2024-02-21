"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import UserAvatar from "./UserAvatar"
import { INDIGO, LIGHT_BLUE } from "@/lib/constants"
import { Separator } from "@/components/ui/separator"

export function NavbarMenu({userEmail, username}: { userEmail: string , username: string }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-transparent active:bg-transparent">
            <div className="flex">
              <UserAvatar size={24} userEmail={userEmail || ""} />
              <div
                className="flex items-center gap-1.5 rounded-sm hover:opacity-80 py-1 px-2 font-semibold"
              >
                {username}
              </div>
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-2 p-4 w-32 text-sm" style={{ color: INDIGO, backgroundColor: LIGHT_BLUE }} >
              <a href="/CourseHistory" className="hover:opacity-70">我的修課紀錄</a>
              <a href="/MyLectureHistory" className="hover:opacity-70">我的講師紀錄</a>
              <a href="/" className="hover:opacity-70">我的IDP</a>
              <Separator className="bg-white opacity-50" />
              <a href="/AboutMe" className="hover:opacity-70">關於我</a>
              <a href="/auth/signout" className="hover:opacity-70">登出</a>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import {NavigationAction} from "./navigation-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import NavigationItem from "./navigation-item";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";

const NavigationSidebar = async() => {

    const profile = await currentProfile()

    if(!profile) return redirect('/')

    const server = await db.server.findMany({
        where:{
            memebers:{
                some:{
                    profileId: profile.id
                }
            }
        }
    })

    return (  
        <div className=" space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1f22]">
            <NavigationAction/>
            <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10" />

            <ScrollArea className=" flex-1 w-full"> 
                {server.map((server)=>(
                    <div key={server.id} className="mb-4">
                        <NavigationItem  id={server.id} imageUrl={server.imageUrl} name={server.name}/>
                    </div>
                ))}
            </ScrollArea>

            <div className="pd-3 mt-auto flex items-center flex-col gap-y-4 pb-2">
                    <ModeToggle />
                    <UserButton afterSignOutUrl="/" appearance={{
                        elements:{
                            avatarBox: "h-[35px] w-[35px]"
                        }
                    }}/>
            </div>
        </div>
    );
}
 
export default NavigationSidebar;
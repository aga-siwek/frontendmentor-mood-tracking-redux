import { useState } from "react";
import { Menu, X } from "lucide-react"; // Import ikon
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer";

const DRAWER_SIDES = ["top"] as const;

export function SettingMenu() {
    const [isOpen, setOpen] = useState(false);
    return (
        <div className="flex flex-wrap gap-2">
            {DRAWER_SIDES.map((side) => (
                <Drawer key={side} direction="top">
                    <DrawerTrigger asChild>
                        <Button variant="outline" size="icon">
                            {isOpen ? (
                                <X className="h-6 w-6 transition-all rotate-0" />
                            ) : (
                                <Menu className="h-6 w-6 transition-all rotate-0" />
                            )}
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh] p-8">
                        <DrawerClose asChild>
                            <div className="flex justify-end items-center w-full">
                                <Button variant="ghost" size="icon">
                                    <X className="h-6 w-6" />
                                </Button>
                            </div>
                        </DrawerClose>
                        <div className="flex flex-col gap-4 no-scrollbar overflow-y-auto px-4">
                            <a
                                className="hover:text-gray-400 transition-colors "
                            >
                                Home
                            </a>
                            <a
                                className="hover:text-gray-400 transition-colors"
                            >
                                Portfolio
                            </a>
                            <a
                                className="hover:text-gray-400 transition-colors"
                            >
                                About
                            </a>
                            <a
                                className="hover:text-gray-400 transition-colors"
                            >
                                Contact Me
                            </a>
                        </div>
                    </DrawerContent>
                </Drawer>
            ))}
        </div>
    );
}
export default SettingMenu;
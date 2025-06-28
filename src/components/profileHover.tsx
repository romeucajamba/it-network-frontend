//Componentes
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LogOut, TbLockPassword } from "@/lib/icons";
import UserLogo from "@/assets/user.svg";
import { LogOutModal } from "./logOut";
import Link from "next/link";

export function ProfileHover() {
    return (
        <HoverCard>
            <HoverCardTrigger className="cursor-pointer">
                <div className="w-14 h-14 rounded-full overflow-hidden"> 
                    <Image 
                    src={UserLogo} 
                    alt="User avatar" 
                    width={10}
                    height={10}
                    className="w-14 h-14 object-cover"
                    />
                </div>
            </HoverCardTrigger>
            <HoverCardContent className="space-y-6 w-48 bg-slate-800 flex felx-col">
                {/* Opções de perfil e logout */}
                <div className="border-t pt-4 space-y-4">
                    <Link href="/profile" className="flex items-center gap-2 text-[#474747] hover:text-[#009DFF]">
                        <div className="w-24 h-24 rounded-full overflow-hidden"> 
                            <Image 
                            src={UserLogo} 
                            alt="User avatar" 
                            width={15}
                            height={15}
                            className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="text-gray-100">Meu Perfil</span>
                    </Link>

                     <Link href="/change-passe" className="cursor-pointer">
                        <Button className="bg-transparent cursor-pointer">
                            <TbLockPassword/>
                            Mundar senha
                        </Button>
                    </Link>

                    <LogOutModal >
                        <Button className="flex bg-transparent hover:bg-red-500 cursor-pointer text-white hover:text-white ">
                            <LogOut /> Terminar sessão
                        </Button>
                    </LogOutModal>
                    
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}

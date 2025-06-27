//Componentes
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LogOut } from "@/lib/icons";
import UserLogo from "@/assets/user.svg";
import { LogOutModal } from "./logOut";
import Link from "next/link";

export function ProfileHover() {
    return (
        <HoverCard>
            <HoverCardTrigger className="cursor-pointer">
                <div className="w-10 h-10 rounded-full overflow-hidden"> 
                    <Image 
                    src={UserLogo} 
                    alt="User avatar" 
                    width={10}
                    height={10}
                    className="w-full h-full object-cover"
                    />
                </div>
            </HoverCardTrigger>
            <HoverCardContent className="space-y-6 w-48 bg-slate-800">
                {/* Opções de perfil e logout */}
                <div className="border-t pt-4 space-y-3">
                    <Link href="/profile" className="flex items-center gap-2 text-[#474747] hover:text-[#009DFF]">
                        <div className="w-10 h-10 rounded-full overflow-hidden"> 
                            <Image 
                            src={UserLogo} 
                            alt="User avatar" 
                            width={10}
                            height={10}
                            className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="text-gray-100">Meu Perfil</span>
                    </Link>
                    <LogOutModal >
                        <Button className="size-8 flex md:size-10 lg:size-10 xl:size-10 2xl:size-10 bg-transparent hover:bg-transparent cursor-pointer text-white hover:text-white shadow-none">
                            <LogOut />
                            Sair da Conta
                        </Button>
                    </LogOutModal>
                    <Link href="/change-passe" className="cursor-pointer">
                        <Button>Mundar senha</Button>
                    </Link>
                    
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}

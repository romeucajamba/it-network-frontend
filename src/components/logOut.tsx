"use client";
//Componentes
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import Link from "next/link";
//Hooks
import { useState } from "react";

interface LogOutProps {
  children: React.ReactNode,
}

export function LogOutModal( {  children, }: LogOutProps ) {
  const [close, setClosed] = useState(false);

  const closeDialog = (value: boolean) => setClosed(value);

  return (
    <Dialog onOpenChange={closeDialog} open={close} >
      <DialogTrigger asChild>
          { children }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[300px] flex flex-col items-center space-y-4 bg-[#1B191F] border-[#1B191F]">
        <DialogHeader className="flex items-center flex-col space-y-4 pt-4 mt-4">
          <DialogTitle className="text-lg text-center font-medium text-white">
            Tem certeza que deseja  <br/>sair da sua conta?
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center w-full space-x-4">
          <Button 
            onClick={() => {setClosed(false)}} 
            variant="default"
            className="w-28 h-12 cursor-pointer shadow-none focus-visible:ring-0 text-[#717F96] hover:bg-[#F1F5F7] bg-[#F1F5F7]">
              Cancelar
          </Button>
          <Link href="/login">
            <Button
            variant="default"
            className="w-28 h-12 cursor-pointer shadow-none text-white hover:bg-[#EB5656] bg-[#EB5656]"
            >
              Sair
          </Button>
          </Link>
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
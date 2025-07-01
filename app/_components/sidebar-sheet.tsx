"use client"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { quickSearchOptions } from "../_constants/search";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { signIn, signOut, useSession } from "next-auth/react";
import SignInDialog from "./sign-in-dialog";

const SidebarSheet = () => {
  const { data, status } = useSession();

  const handleLogoutClick = () => {
    signOut()
  }

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      {/* AVATAR */}
      <div className="flex items-center justify-between py-5 border-b border-solid gap-2">

        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar className="rounded-lg">
              <AvatarImage src={data?.user?.image ?? ""}
                alt={data?.user?.name ?? ''}
                className="object-cover"
              />
            </Avatar>
            <div className="">
              <p className="font-bold">{data?.user?.name}</p>
              <p className="text-xs">{data?.user?.email}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-bold">Olá, faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size='icon'>
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90vw]">
                <SignInDialog />
              </DialogContent>
            </Dialog>
          </>
        )
        }

      </div>

      {/* PRIMEIRA PARTE DA SIDEBAR */}
      <div className="p-5 flex flex-col gap-2 py-5 border-b border-solid">
        <SheetClose asChild>
          <Button className="gap-2 justify-start" variant={'ghost'} asChild>
            <Link href='/'>
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>
        <Button className="gap-2 justify-start" variant={'ghost'} asChild>
          <Link href="/bookings">
            <CalendarIcon size={18} />
            Agendamentos
          </Link>
        </Button>
      </div>

      {/* SEGUNDA PARTE DA SIDEBAR */}
      <div className="p-5 flex flex-col gap-2 py-5 border-b border-solid">
        {quickSearchOptions.map(option => (
          <SheetClose asChild>
            <Button
              key={option.title}
              className="gap-2 justify-start"
              variant={'ghost'}
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  alt={option.title}
                  height={18} width={18}
                />
                {option.title}
              </Link>
            </Button>
          </SheetClose>
        ))}
      </div>
      {data?.user && (
        <div className="p-5 flex flex-col gap-2 py-5">
          <Button
            className="justify-start gap-2"
            variant={'ghost'}
            onClick={handleLogoutClick}
          >
            <LogOutIcon size={18} />
            Sair da conta
          </Button>
        </div>
      )}
    </SheetContent>
  )
}

export default SidebarSheet;
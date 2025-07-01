import { Button } from "./_components/ui/button";
import Header from "./_components/header";
import Image from "next/image";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { quickSearchOptions } from "./_constants/search";
import BookingItem from "./_components/booking-item";
import Search from "./_components/search";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./_lib/auth";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";


//TODO: receber agendamento como prop

export default async function Home() {
  const session = await getServerSession(authOptions);
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc"
    }
  })

  const confirmedBookings = session?.user ? await db.booking.findMany({
    where: {
      userId: (session?.user as any).id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    },
    orderBy: {
      date: 'asc'
    }
  }) : []
  return (
    <div className="">
      <Header />
      <div className="p-5">
        {/* TEXTO */}
        <h2 className="text-xl font-bold">Olá, {session?.user ? session.user.name?.split(' ')[0] : 'bem-vindo'}!</h2>
        <p className="text-sm">Sábado, 21 de junho</p>
        <p className="text-sm">{format(new Date(), "eeee, dd 'de' MMMM", {
          locale: ptBR
        })}</p>

        {/* BUSCA */}
        <div className="mt-6">
          <Search />
        </div>

        {/* BUSCA RÁPIDA */}
        <div className="flex gap-3 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map(option => (
            <Button key={option.title} className="gap-2" variant={"secondary"} asChild>
              <Link href={`/barbershops?service=${option.title}`} className="flex">
                <Image
                  src={option.imageUrl}
                  alt="Busca rápida para corte de cabelo"
                  width={16}
                  height={16}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        {/* IMAGEM */}
        <div className="relative w-full h-[150px] mt-6">
          <Image alt="Agende nos melhores com o FSW Barber" fill src="/banner-01.png" className="object-cover rounded-xl" />
        </div>

        {/* AGENDAMENTOS */}
        <h2 className="uppercase text-gray-400 font-bold text-xs mt-6 mb-4">Agendamentos</h2>
        <div className="flex overflow-y-auto gap-3 [&::-webkit-scrollbar]:hidden">
          {
            confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))
          }
        </div>

        {/* RECOMENDADOS */}
        <h2 className="uppercase text-gray-400 font-bold text-xs mt-6 mb-4">Recomendados</h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map(barbershop => <BarbershopItem key={barbershop.id} barbershop={barbershop} />)}
        </div>

        {/* POPULARES */}
        <h2 className="uppercase text-gray-400 font-bold text-xs mt-6 mb-4">Populares</h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map(barbershop => <BarbershopItem key={barbershop.id} barbershop={barbershop} />)}
        </div>

      </div>

    </div>
  );
}

import PhoneItem from "@/app/_components/phone-item";
import ServiceItem from "@/app/_components/service-item";
import SidebarSheet from "@/app/_components/sidebar-sheet";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BarbershopPageProps {
  params: {
    id: string;
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  //TODO: chamar banco de dados
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id
    },
    include: {
      services: true
    }
  })

  if (!barbershop) {
    return notFound()
  }
  return (
    <>
      {/* IMAGEM */}
      <div className="relative w-full h-[250px]">
        <Image
          src={barbershop?.imageUrl || "/"}
          alt={barbershop?.name || "Barbearia"}
          fill
          className="object-cover"
        />
        {/* BOTÃO DA ESQUERDA */}
        <Button size="icon" variant={"secondary"} className="absolute top-4 left-4" asChild>
          <Link href={'/'}>
            <ChevronLeftIcon />
          </Link>
        </Button>

        {/* BOTÃO DA DIREITA */}
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="absolute top-4 right-4 ">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </div>

      {/* TÍTULO */}
      <div className="p-5 border-b border-solid">
        <h1 className="text-xl font-bold mb-3">{barbershop?.name}</h1>
        {/* ADDRESS */}
        <div className="flex items-center gap-2 mb-2">
          <MapIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop?.address}</p>
        </div>

        {/* STAR */}
        <div className="flex items-center gap-2">
          <StarIcon className="text-primary fill-primary" size={18} />
          <p className="text-sm">5,0 (430 avaliações)</p>
        </div>
      </div>

      {/* DESCRIÇÃO */}
      <div className="p-5 border-b border-solid space-y-2">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>
        <div className="text-sm text-justify">{barbershop?.description}</div>
      </div>

      {/* SERVIÇOS */}
      <div className="p-5 space-y-3 border-b border-solid">
        <h2 className="text-xs font-bold uppercase text-gray-400">Serviços</h2>
        <div className="space-y-3">
          {barbershop.services.map(service => <ServiceItem key={service.id} service={service} barbershop={barbershop} />)}
        </div>
      </div>

      {/* CONTATO */}
      <div className="p-5 space-y-3">
        {barbershop.phones.map(phone => (
          <PhoneItem key={phone} phone={phone} />
        ))}
      </div>

    </>
  )
}

export default BarbershopPage;
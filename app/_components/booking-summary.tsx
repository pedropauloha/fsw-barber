import { format } from "date-fns"
import { Card, CardContent } from "./ui/card"
import { Barbershop, BarbershopService } from "@prisma/client"
import { ptBR } from "date-fns/locale/pt-BR"

interface BookingSummaryProps {
  service: Pick<BarbershopService, "name" | "price">
  barbershop: Pick<Barbershop, "name">
  selectedDate: Date
}

const BookingSummary = ({
  barbershop,
  service,
  selectedDate,
}: BookingSummaryProps) => {
  return (
    <Card>
      <CardContent className="w-full space-y-3 p-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">{service.name}</h2>
          <p className="text-sm font-bold">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(service.price))}
          </p>
        </div>
        {/* DATA */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Data</h2>
          <p className="text-sm">
            {format(selectedDate, "d 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>
        {/* HORÁRIO */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Horário</h2>
          <p className="text-sm">{format(selectedDate, "HH:mm")}</p>
        </div>
        {/* NOME DA BARBEARIA */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Barbearia</h2>
          <p className="text-sm">{barbershop?.name}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingSummary

import Image from "next/image"
import { Card, CardContent } from "../_components/ui/card"
import { MenuIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetTrigger } from "./ui/sheet"
import SidebarSheet from "./sidebar-sheet"
import Link from "next/link"


const Header = () => {
  return (
    <Card>
      <CardContent className=" p-5 flex flex-row items-center justify-between">
        <Link href="/">
          <Image alt="FSW Barber Logo" src="/logo.png" height={18} width={120} />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
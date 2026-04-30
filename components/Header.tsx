import {
  HomeIcon,
  File,
  UsersRound,
  LogOut,
  UsersRoundIcon,
} from "lucide-react";
import Link from "next/link";
import NavButton from "@/components/NavButton";
import NavButtonMenu from "@/components/NavButtonMenu";
import { ModeToggle } from "@/components/ModeToggle";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 z-20">
      <div className="flex h-8 items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <NavButton href="/tickets" label="Home" icon={HomeIcon} />
          <Link
            href="/tickets"
            className="flex justify-center items-center gap-2 ml-0"
            title="Home"
          >
            <h1 className="hidden sm:block text-xl font-bold m-0 mt-1">
              Tienda de reparación de equipos tecnológicos
            </h1>
          </Link>
        </div>

        <div className="flex items-center">
          <NavButton href="/tickets" label="Tickets" icon={File} />
          <NavButtonMenu
            icon={UsersRoundIcon}
            label="Menu de clientes"
            choices={[
              { title: "Buscar clientes", href: "/customers" },
              { title: "nuevo cliente", href: "/customers/form" },
            ]}
          />

          <ModeToggle />
          <Button
            variant={"ghost"}
            size="icon"
            aria-label="LogOut"
            nativeButton={false}
            title="LogOut"
            className={
              "rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }
            render={
              <LogoutLink>
                <LogOut />
              </LogoutLink>
            }
          ></Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

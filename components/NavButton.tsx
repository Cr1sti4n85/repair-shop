import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type Props = {
  icon: LucideIcon;
  label: string;
  href?: string;
};

const buttonClass = cn(
  "rounded-full p-2 flex items-center justify-center",
  "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
  "transition-colors focus-visible:outline-none focus-visible:ring-2",
);

const NavButton = ({ icon: Icon, label, href }: Props) => {
  if (href) {
    return (
      <Link
        href={href}
        aria-label={label}
        title={label}
        className={buttonClass}
      >
        <Icon className="size-5" />
      </Link>
    );
  }

  return (
    <Button aria-label={label} title={label} className={buttonClass}>
      <Icon className="size-6" />
    </Button>
  );
};

export default NavButton;

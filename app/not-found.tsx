import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Page not Found",
};

export default function NotFound() {
  return (
    <div className="px-2 w-full">
      <div className="mx-auto py-4 flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl">Página no encontrada</h2>
        <Image
          className="m-0 rounded-xl"
          src="/images/not-found.jpg"
          alt="Page not found"
          width={300}
          height={300}
          sizes="300px"
          priority={true}
          title="Página no encontrada"
        />
      </div>
      <Link href="/tickets" className="text-center hover:underline">
        <h3>Volver al inicio</h3>
      </Link>
    </div>
  );
}

import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black bg-home bg-cover bg-center">
      <main className="flex flex-col justify-center text-center max-w-5xl mx-auto h-dvh">
        <div className="flex flex-col gap-6 p-12 rounded-xl bg-black/90 w-4/5 sm:max-w-96 mx-auto text-white sm:text-2xl">
          <h1 className="text-4xl font-bold">
            Repair <br /> TECH
          </h1>
          <address>
            Viena 0271 <br />
            Villa Alemana
          </address>
          <p>Lunes a viernes de 9am a 18pm</p>
          <Link href={"tel:987654321"} className="hover:underline">
            987654321
          </Link>
        </div>
      </main>
    </div>
  );
}

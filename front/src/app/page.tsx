import Link from "next/link";
import { Prisma } from "@prisma/client";
import { Button } from "@/components/ui/button";

export default function Home() {
  console.log("Prisma client properties:", Object.getOwnPropertyNames(Prisma));
  console.log(
    "Prisma ModelName values:",
    Object.values(Prisma.ModelName || {})
  );

  return (
    <div className="container mx-auto h-full ">
      <div className="flex flex-col h-full justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-2">
          {/* Contenu principal */}
          <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-4 flex flex-col mb-4 px-0.5 md:px-2 lg:px-3">
            <h1 className="text-4xl font-bold mb-4">AI Chatbot Factory</h1>
            <p className="text-xl mb-2">
              Bienvenue dans votre usine à chatbots.
              <br /> Créez, configurez et déployez des chatbots personnalisés en
              quelques clics.
            </p>
          </div>

          {/* Placeholder pour équilibrer la grille */}
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* Les boutons */}
          <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 flex items-center justify-center px-0.5 md:px-2 lg:px-3">
            <Button asChild className="w-full ">
              <Link href="/chatbots">Gérer mes chatbots</Link>
            </Button>
          </div>

          <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 flex items-center justify-center px-0.5 md:px-2 lg:px-3">
            <Button asChild className="w-full">
              <Link href="/chatbots/new">Créer un chatbot</Link>
            </Button>
          </div>

          {/* Placeholders pour compléter la ligne des boutons */}
          <div className="hidden sm:block sm:col-span-1 md:col-span-2 lg:col-span-4"></div>
        </div>
      </div>
    </div>
  );
}

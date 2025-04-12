import Link from "next/link";

import { Prisma } from "@prisma/client";

export default function Home() {
  // Au début de votre fichier page.tsx
  console.log("Prisma client properties:", Object.getOwnPropertyNames(Prisma));
  console.log(
    "Prisma ModelName values:",
    Object.values(Prisma.ModelName || {})
  );
  return (
    <div className="container mx-auto h-full flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8">AI Chatbot Factory</h1>
      <p className="text-xl mb-6 text-center">
        Bienvenue dans votre usine à chatbots.
        <br /> Créez, configurez et déployez des chatbots personnalisés en
        quelques clics.
      </p>
      <div className="flex gap-4">
        <Link
          href="/chatbots"
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Gérer mes chatbots
        </Link>
        <Link
          href="/chatbots/new"
          className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Créer un nouveau chatbot
        </Link>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react"; // Vous devrez peut-être installer lucide-react

interface DeleteChatbotButtonProps {
  id: string;
}

export default function DeleteChatbotButton({ id }: DeleteChatbotButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
  }, []);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/chatbots/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        console.error(
          "Erreur de suppression:",
          response.status,
          response.statusText
        );
        throw new Error("Une erreur est survenue lors de la suppression");
      }

      // Rediriger vers la liste des chatbots
      router.push("/chatbots");
      router.refresh();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert("Une erreur est survenue lors de la suppression du chatbot");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" className="cursor-pointer">
          <Trash2 className="h-4 w-4 mr-2" />
          Supprimer
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-black">
            Êtes-vous absolument sûr ?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-black">
            Cette action ne peut pas être annulée. Cela supprimera
            définitivement votre chatbot et tous ses contextes.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-black">Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {isDeleting ? "Suppression..." : "Supprimer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

import { z } from "zod";

// Validation du chatbot
export const chatbotSchema = z.object({
  name: z
    .string()
    .min(1, "Le nom du chatbot est requis")
    .max(100, "Le nom ne peut pas dépasser 100 caractères"),
  description: z.string().optional(),
  color: z
    .string()
    .regex(/^#([0-9A-F]{3}){1,2}$/i)
    .optional(),
  windowWidth: z.number().min(300).max(600).optional(),
  windowHeight: z.number().min(400).max(800).optional(),
});

// Validation du contexte
export const contextSchema = z.object({
  title: z
    .string()
    .min(1, "Le titre du contexte est requis")
    .max(100, "Le titre ne peut pas dépasser 100 caractères"),
  content: z.string().min(1, "Le contenu du contexte est requis"),
});

// Validation du message de chat
export const chatMessageSchema = z.object({
  message: z.string().min(1, "Le message est requis"),
});

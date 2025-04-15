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
  userMessageBgColor: z
    .string()
    .regex(/^#([0-9A-F]{3}){1,2}$/i)
    .optional(),
  userMessageTextColor: z
    .string()
    .regex(/^#([0-9A-F]{3}){1,2}$/i)
    .optional(),
  botMessageBgColor: z
    .string()
    .regex(/^#([0-9A-F]{3}){1,2}$/i)
    .optional(),
  botMessageTextColor: z
    .string()
    .regex(/^#([0-9A-F]{3}){1,2}$/i)
    .optional(),
  botMessageBorderColor: z
    .string()
    .regex(/^#([0-9A-F]{3}){1,2}$/i)
    .optional(),
  showBotMessageBorder: z.boolean().optional(),
});

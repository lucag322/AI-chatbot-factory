import ChatbotForm from "@/components/ChatbotForm";

export default function NewChatbotPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Créer un nouveau chatbot</h1>
      <div className="bg-card shadow-md rounded-lg p-6 border border-gray-300">
        <ChatbotForm />
      </div>
    </div>
  );
}

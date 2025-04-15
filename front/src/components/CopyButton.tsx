"use client"; // Important! Cette directive indique que c'est un composant client

import { useState } from "react";
import { Button } from "./ui/button";

interface CopyButtonProps {
  scriptContent: string;
}

export default function CopyButton({ scriptContent }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="default"
      className="mt-4 cursor-pointer"
      onClick={handleCopy}
    >
      {copied ? "Copié !" : "Copier le script"}
    </Button>
  );
}

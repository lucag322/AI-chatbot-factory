"use client";

interface DateDisplayProps {
  date: string | Date;
}

export default function DateDisplay({ date }: DateDisplayProps) {
  const formatDate = (dateStr: string | Date) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return <span>{formatDate(date)}</span>;
}

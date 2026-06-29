'use client';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/971506873131"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 md:w-auto md:h-auto md:px-4 md:py-3 md:rounded-xl"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 flex-shrink-0" />
      <span className="hidden md:block ml-2 font-medium text-sm whitespace-nowrap">WhatsApp Us</span>
    </a>
  );
}

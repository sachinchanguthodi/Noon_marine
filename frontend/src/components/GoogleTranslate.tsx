'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: new (options: object, element: string) => void;
      };
    };
  }
}

const languages = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'ar', label: 'AR', flag: '🇦🇪' },
  { code: 'fa', label: 'FA', flag: '🇮🇷' },
];

function triggerTranslate(langCode: string) {
  const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
  if (select) {
    select.value = langCode;
    select.dispatchEvent(new Event('change'));
  }
}

export default function GoogleTranslate() {
  const [active, setActive] = useState('en');

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: 'en,ar,fa', autoDisplay: false },
        'google_translate_element'
      );
    };

    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  function handleSelect(code: string) {
    setActive(code);
    if (code === 'en') {
      // Restore original — Google uses a cookie reset
      const frame = document.querySelector<HTMLIFrameElement>('.goog-te-banner-frame');
      if (frame) {
        const restore = frame.contentDocument?.querySelector<HTMLAnchorElement>('a[href*="restore"]');
        restore?.click();
      } else {
        triggerTranslate('en');
      }
    } else {
      triggerTranslate(code);
    }
  }

  return (
    <>
      {/* Hidden Google widget — required to load the engine */}
      <div id="google_translate_element" className="hidden" />

      {/* Custom language switcher */}
      <div className="fixed top-3 right-4 z-50 flex items-center gap-1 bg-gray-900/80 backdrop-blur-sm border border-white/10 rounded-full px-2 py-1 shadow-lg">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
              active === lang.code
                ? 'bg-primary-600 text-white shadow'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}

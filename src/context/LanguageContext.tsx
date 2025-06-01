"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';

type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

// Translation dictionaries
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    "home": "Home",
    "about": "About",
    "divisions": "Divisions",
    "software": "Software",
    "hardware": "Hardware",
    "activities": "Activities",
    "projects": "Projects",
    "join": "Join Now",
    
    // Hero
    "welcomeTitle": "Welcome to Elektora Team",
    "welcomeSubtitle": "A vibrant tech community for software and hardware enthusiasts",
    "joinCommunity": "Join Community",
    "learnMore": "Learn More",
    
    // About
    "aboutTitle": "About Us",
    "aboutDescription": "Elektora Team is a community of passionate tech enthusiasts working together on innovative projects",
    
    // Divisions
    "divisionsTitle": "Our Divisions",
    "divisionsSubtitle": "Specialized focus areas that drive our community's innovation and learning",
    "learnMoreLink": "Learn more →",
    "softwareTitle": "Software Development",
    "softwareDesc": "Web and mobile applications, desktop software, and system utilities.",
    "hardwareTitle": "Hardware Engineering",
    "hardwareDesc": "Embedded systems, IoT devices, custom PCB design, and hardware prototypes.",
    "cloudTitle": "Cloud Infrastructure",
    "cloudDesc": "Cloud services, DevOps, containerization, and infrastructure automation.",
    "dataTitle": "Data Science",
    "dataDesc": "Machine learning, data analysis, visualization, and AI applications.",    "divisionsFooter": "Our divisions collaborate on cross-functional projects, providing members with a holistic learning experience and the opportunity to develop skills across multiple domains in the tech industry.",
    
    // Software Zone
    "softwareZoneTitle": "Software Development Zone",
    "softwareZoneSubtitle": "Innovative solutions through code and creativity",
    
    // Hardware Zone
    "hardwareZoneTitle": "Hardware Engineering Zone", 
    "hardwareZoneSubtitle": "Building tomorrow's technology today",
    
    // Activities
    "activitiesTitle": "Our Activities",
    "activitiesSubtitle": "Regular events and programs that foster learning and collaboration",
    
    // Projects
    "projectsTitle": "Featured Projects",
    "projectsSubtitle": "Discover the innovative solutions our community has built",
    
    // Join Community
    "joinTitle": "Join Our Community",
    "joinSubtitle": "Ready to be part of something amazing? Join thousands of tech enthusiasts!",
    "getStarted": "Get Started",
    "contactUs": "Contact Us",
    
    // Footer
    "copyright": "© 2025 Elektora Team. All rights reserved.",
    "footerDescription": "Empowering the next generation of tech innovators through collaborative learning and community-driven projects."
  },
  id: {
    // Header
    "home": "Beranda",
    "about": "Tentang",
    "divisions": "Divisi",
    "software": "Perangkat Lunak",
    "hardware": "Perangkat Keras",
    "activities": "Aktivitas",
    "projects": "Proyek",
    "join": "Gabung Sekarang",
    
    // Hero
    "welcomeTitle": "Selamat Datang di Elektora Team",
    "welcomeSubtitle": "Komunitas teknologi yang dinamis untuk penggemar perangkat lunak dan keras",
    "joinCommunity": "Gabung Komunitas",
    "learnMore": "Pelajari Lebih Lanjut",
    
    // About
    "aboutTitle": "Tentang Kami",
    "aboutDescription": "Elektora Team adalah komunitas penggemar teknologi yang bekerja sama dalam proyek inovatif",
    
    // Divisions
    "divisionsTitle": "Divisi Kami",
    "divisionsSubtitle": "Area fokus khusus yang mendorong inovasi dan pembelajaran komunitas kami",
    "learnMoreLink": "Selengkapnya →",
    "softwareTitle": "Pengembangan Perangkat Lunak",
    "softwareDesc": "Aplikasi web dan mobile, software desktop, dan utilitas sistem.",
    "hardwareTitle": "Teknik Perangkat Keras",
    "hardwareDesc": "Sistem tertanam, perangkat IoT, desain PCB kustom, dan prototipe perangkat keras.",
    "cloudTitle": "Infrastruktur Cloud",
    "cloudDesc": "Layanan cloud, DevOps, kontainerisasi, dan otomatisasi infrastruktur.",
    "dataTitle": "Sains Data",
    "dataDesc": "Pembelajaran mesin, analisis data, visualisasi, dan aplikasi AI.",    "divisionsFooter": "Divisi kami berkolaborasi pada proyek lintas fungsi, memberikan anggota pengalaman belajar holistik dan kesempatan untuk mengembangkan keterampilan di berbagai domain industri teknologi.",
    
    // Software Zone
    "softwareZoneTitle": "Zona Pengembangan Perangkat Lunak",
    "softwareZoneSubtitle": "Solusi inovatif melalui kode dan kreativitas",
    
    // Hardware Zone
    "hardwareZoneTitle": "Zona Teknik Perangkat Keras",
    "hardwareZoneSubtitle": "Membangun teknologi masa depan hari ini",
    
    // Activities
    "activitiesTitle": "Aktivitas Kami",
    "activitiesSubtitle": "Acara dan program reguler yang mendorong pembelajaran dan kolaborasi",
    
    // Projects
    "projectsTitle": "Proyek Unggulan",
    "projectsSubtitle": "Temukan solusi inovatif yang telah dibangun komunitas kami",
    
    // Join Community
    "joinTitle": "Bergabung dengan Komunitas Kami",
    "joinSubtitle": "Siap menjadi bagian dari sesuatu yang luar biasa? Bergabunglah dengan ribuan penggemar teknologi!",
    "getStarted": "Mulai Sekarang",
    "contactUs": "Hubungi Kami",
    
    // Footer
    "copyright": "© 2025 Elektora Team. Hak Cipta Dilindungi.",
    "footerDescription": "Memberdayakan generasi berikutnya inovator teknologi melalui pembelajaran kolaboratif dan proyek yang didorong komunitas."
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Check if user has already set a preference
    const storedLanguage = localStorage.getItem('language') as Language | null;
    
    if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'id')) {
      setLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'id' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

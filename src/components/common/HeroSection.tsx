/**
 * Hero Section Component
 * Auto-scrolling background images with hero content
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/common/Button';

const heroImages = [
  '/Hero-1.png',
  '/Hero-2.jpg',
  '/Hero-3.jpg',
];

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-scroll images every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // 2000ms = 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative py-20 md:py-32 overflow-hidden pt-32">
      {/* Background Images with Transition */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`Hero background ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover"
              quality={100}
            />
          </div>
        ))}
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-10"></div>

      {/* Content */}
      <div className="container-custom relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg">
            AI-Powered Glaucoma Detection
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed drop-shadow-md">
            Early Diagnosis for Better Vision
          </p>
          <p className="text-lg text-white/90 mb-10 max-w-3xl mx-auto drop-shadow-md">
            Upload retinal images and get instant AI-based analysis to assist in early glaucoma detection.
            Our advanced deep learning algorithms provide accurate, reliable results in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-primary-200 hover:bg-primary-300 text-black font-semibold px-8 py-4 text-lg shadow-xl">
                Try Now
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm shadow-xl">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative eye visualization */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-32 h-32 bg-primary-200 rounded-full opacity-20 blur-3xl z-10"></div>
    </section>
  );
}

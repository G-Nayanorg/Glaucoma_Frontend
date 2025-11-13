/**
 * Navbar Component
 * Main navigation bar for the home page
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/utils/cn';

/**
 * Navigation items
 */
const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Accuracy', href: '#accuracy' },
  { label: 'Demo', href: '#demo' },
  { label: 'Contact', href: '#contact' },
];

/**
 * Navbar Component
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scroll to section
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const offset = 80; // Height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white shadow-md'
          : 'bg-white/95 backdrop-blur-sm'
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Title */}
          <Link
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group"
          >
            {/* Icon */}
            <Image
              src="/logo.png"
              alt="Glaucoma AI Logo"
              width={64}
              height={64}
              className="w-16 h-16 object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />

            {/* Title */}
            <div className="flex flex-col">
              <span className="font-grotesk font-bold text-xl text-black group-hover:text-primary-600 transition-colors">
                Glaucoma AI
              </span>
              <span className="text-xs text-medical-gray-600 font-sans">
                Early Detection • Better Vision
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-4 py-2 text-sm font-medium text-black hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/dashboard"
              className="ml-4 px-6 py-2.5 bg-primary-200 hover:bg-primary-300 text-black font-semibold rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Try Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-primary-50 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-medical-gray-200 animate-slide-in">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-4 py-3 text-sm font-medium text-black hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                >
                  {item.label}
                </a>
              ))}
              <Link
                href="/dashboard"
                className="mx-4 mt-2 px-6 py-3 bg-primary-200 hover:bg-primary-300 text-black font-semibold rounded-lg transition-colors duration-200 text-center shadow-sm"
              >
                Try Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

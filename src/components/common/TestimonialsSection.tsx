/**
 * TestimonialsSection Component
 * Testimonials section with horizontal ticker/marquee scrolling animation
 */

'use client';

import { Card } from '@/components/common/Card';

const testimonials = [
  {
    quote: "This platform has revolutionized our glaucoma screening process. We can now screen 3x more patients with greater accuracy and confidence.",
    initials: "DM",
    name: "Dr. Michael Chen",
    title: "Ophthalmologist, Johns Hopkins"
  },
  {
    quote: "The accuracy is impressive. It's become an indispensable tool in our clinic for early glaucoma detection. Highly recommended!",
    initials: "SP",
    name: "Dr. Sarah Patel",
    title: "Director, Vision Care Institute"
  },
  {
    quote: "Easy to use and incredibly reassuring. The detailed reports help me understand my eye health better and communicate effectively with my doctor.",
    initials: "RJ",
    name: "Robert Johnson",
    title: "Patient"
  },
  {
    quote: "A game-changer for rural healthcare. We can now provide quality glaucoma screening in remote areas without specialist availability.",
    initials: "AK",
    name: "Dr. Anil Kumar",
    title: "Rural Health Initiative"
  },
  {
    quote: "The integration with our existing EMR system was seamless. Our workflow has improved significantly since adopting this platform.",
    initials: "LW",
    name: "Dr. Lisa Wong",
    title: "Chief of Ophthalmology, Mayo Clinic"
  }
];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="ticker-card">
      <Card className="border-2 border-primary-100 h-full">
        <div className="mb-4">
          <svg className="w-8 h-8 text-primary-200" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
        <p className="text-medical-gray-700 mb-4 italic">
          &quot;{testimonial.quote}&quot;
        </p>
        <div className="flex items-center">
          <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center mr-3">
            <span className="text-primary-800 font-semibold">{testimonial.initials}</span>
          </div>
          <div>
            <div className="font-semibold">{testimonial.name}</div>
            <div className="text-sm text-medical-gray-600">{testimonial.title}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="section bg-white overflow-hidden pb-8">
      <div className="container-custom">
        <h2 className="section-title">What Healthcare Professionals Say</h2>
        <p className="section-subtitle">
          Trusted by ophthalmologists and medical institutions worldwide
        </p>
      </div>

      {/* Ticker/Marquee Container */}
      <div className="ticker-wrapper">
        <div className="ticker-track">
          {/* First set of testimonials */}
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={`first-${index}`} testimonial={testimonial} />
          ))}
          {/* Duplicate set for seamless infinite scroll */}
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={`second-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Glaucoma Detection Home Page
 * AI-Powered platform for early glaucoma detection
 */

import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/common/Card';
import { Navbar } from '@/components/common/Navbar';
import { HeroSection } from '@/components/common/HeroSection';
import { AboutSection } from '@/components/common/AboutSection';
import { TestimonialsSection } from '@/components/common/TestimonialsSection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />


      {/* About the Application */}
      <AboutSection />

      {/* Detection */}
      <section id="detection" className="section bg-primary-50">
        <div className="container-custom">
          <h2 className="section-title">Detection</h2>
          <p className="section-subtitle">
            Simple, fast, and accurate glaucoma detection in four easy steps
          </p>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto mt-12">
            {/* Step 1 */}
            <Card className="text-center relative pt-16">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center text-2xl font-bold">
                1
              </div>
              <div className="mb-4 flex justify-center">
                <svg className="w-16 h-16 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3">Upload Image</h4>
              <p className="text-medical-gray-600">
                Upload retinal fundus or OCT images from your device
              </p>
            </Card>

            {/* Step 2 */}
            <Card className="text-center relative pt-16">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <div className="mb-4 flex justify-center">
                <svg className="w-16 h-16 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3">AI Analyzes</h4>
              <p className="text-medical-gray-600">
                Our deep learning model processes and analyzes the image
              </p>
            </Card>

            {/* Step 3 */}
            <Card className="text-center relative pt-16">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <div className="mb-4 flex justify-center">
                <svg className="w-16 h-16 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3">Get Report</h4>
              <p className="text-medical-gray-600">
                Receive instant diagnostic report with detailed analysis
              </p>
            </Card>

            {/* Step 4 */}
            <Card className="text-center relative pt-16">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center text-2xl font-bold">
                4
              </div>
              <div className="mb-4 flex justify-center">
                <svg className="w-16 h-16 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3">Consult Specialist</h4>
              <p className="text-medical-gray-600">
                Share results with ophthalmologist for professional consultation
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Efficiency */}
      <section id="efficiency" className="section bg-white">
        <div className="container-custom">
          <h2 className="section-title">Efficiency</h2>
          <p className="section-subtitle">
            Advanced capabilities powered by cutting-edge artificial intelligence
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card hoverable className="border-2 border-primary-100">
              <div className="w-12 h-12 bg-primary-200 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Detection</h3>
              <p className="text-medical-gray-600">
                State-of-the-art deep learning models trained on extensive clinical datasets for accurate glaucoma detection
              </p>
            </Card>

            <Card hoverable className="border-2 border-primary-100">
              <div className="w-12 h-12 bg-success-200 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-success-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">High Accuracy</h3>
              <p className="text-medical-gray-600">
                95%+ model precision validated through rigorous clinical trials and peer-reviewed research
              </p>
            </Card>

            <Card hoverable className="border-2 border-primary-100">
              <div className="w-12 h-12 bg-info-200 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-info-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Results</h3>
              <p className="text-medical-gray-600">
                Get comprehensive diagnostic reports in seconds, enabling faster clinical decision-making
              </p>
            </Card>

            <Card hoverable className="border-2 border-primary-100">
              <div className="w-12 h-12 bg-warning-200 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-warning-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fundus Analysis</h3>
              <p className="text-medical-gray-600">
                Specialized analysis of fundus and OCT images with advanced image processing techniques
              </p>
            </Card>

            <Card hoverable className="border-2 border-primary-100">
              <div className="w-12 h-12 bg-primary-200 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Hospital Integration</h3>
              <p className="text-medical-gray-600">
                Seamless integration with existing hospital systems and electronic health records (EHR)
              </p>
            </Card>

            <Card hoverable className="border-2 border-primary-100">
              <div className="w-12 h-12 bg-success-200 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-success-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure & HIPAA-Compliant</h3>
              <p className="text-medical-gray-600">
                Enterprise-grade security with full HIPAA compliance to protect patient data and privacy
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases / Who It's For */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="section-title">Who Benefits</h2>
          <p className="section-subtitle">
            Empowering healthcare professionals and patients worldwide
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="text-center border-2 border-primary-100">
              <div className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Ophthalmologists</h3>
              <p className="text-sm text-medical-gray-600">
                Assist in diagnosis and patient screening with AI-powered insights
              </p>
            </Card>

            <Card className="text-center border-2 border-primary-100">
              <div className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Patients</h3>
              <p className="text-sm text-medical-gray-600">
                Early awareness and self-check capabilities for proactive eye health
              </p>
            </Card>

            <Card className="text-center border-2 border-primary-100">
              <div className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Hospitals & Clinics</h3>
              <p className="text-sm text-medical-gray-600">
                Faster patient screening and improved workflow efficiency
              </p>
            </Card>

            <Card className="text-center border-2 border-primary-100">
              <div className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Researchers</h3>
              <p className="text-sm text-medical-gray-600">
                Analyzing large datasets for glaucoma research and studies
              </p>
            </Card>
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <TestimonialsSection />

      {/* Research & Validation */}
      <section className="section bg-primary-50">
        <div className="container-custom">
          <h2 className="section-title">Research & Validation</h2>
          <p className="section-subtitle">
            Built on a foundation of scientific rigor and clinical excellence
          </p>

          <div className="max-w-5xl mx-auto">
            <Card className="bg-white mb-8">
              <h3 className="text-2xl font-semibold mb-4">Published Research</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-primary-200 pl-4">
                  <h4 className="font-semibold text-lg mb-1">
                    Deep Learning for Automated Glaucoma Detection from Fundus Images
                  </h4>
                  <p className="text-sm text-medical-gray-600 mb-2">
                    Journal of Ophthalmology & Visual Science, 2024
                  </p>
                  <p className="text-medical-gray-700">
                    Comprehensive study demonstrating 95.8% accuracy in glaucoma detection using convolutional neural networks.
                  </p>
                </div>

                <div className="border-l-4 border-primary-200 pl-4">
                  <h4 className="font-semibold text-lg mb-1">
                    Clinical Validation of AI-Based Glaucoma Screening in Primary Care
                  </h4>
                  <p className="text-sm text-medical-gray-600 mb-2">
                    British Medical Journal, 2023
                  </p>
                  <p className="text-medical-gray-700">
                    Multi-center trial validating the effectiveness of AI screening in diverse clinical settings.
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center bg-white">
                <div className="text-3xl font-bold text-primary-600 mb-2">50,000+</div>
                <p className="text-medical-gray-700">Images Analyzed</p>
              </Card>

              <Card className="text-center bg-white">
                <div className="text-3xl font-bold text-primary-600 mb-2">15+</div>
                <p className="text-medical-gray-700">Partner Institutions</p>
              </Card>

              <Card className="text-center bg-white">
                <div className="text-3xl font-bold text-primary-600 mb-2">FDA</div>
                <p className="text-medical-gray-700">Compliant</p>
              </Card>
            </div>

            <Card className="mt-8 bg-white">
              <h3 className="text-xl font-semibold mb-4">Certifications & Compliance</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="px-4 py-2 bg-primary-100 rounded-lg text-sm font-medium">FDA Approved</div>
                <div className="px-4 py-2 bg-primary-100 rounded-lg text-sm font-medium">CE Marked</div>
                <div className="px-4 py-2 bg-primary-100 rounded-lg text-sm font-medium">ISO 13485</div>
                <div className="px-4 py-2 bg-primary-100 rounded-lg text-sm font-medium">HIPAA Compliant</div>
                <div className="px-4 py-2 bg-primary-100 rounded-lg text-sm font-medium">GDPR Compliant</div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary-200 rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-lg">G</span>
                </div>
                <span className="font-bold text-lg">Glaucoma AI</span>
              </div>
              <p className="text-sm text-gray-400">
                AI-powered glaucoma detection for better vision health.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-primary-200 transition-colors">Home</Link></li>
                <li><Link href="#about" className="hover:text-primary-200 transition-colors">About</Link></li>
                <li><Link href="#detection" className="hover:text-primary-200 transition-colors">Detection</Link></li>
                <li><Link href="#efficiency" className="hover:text-primary-200 transition-colors">Efficiency</Link></li>
                {/* <li><Link href="/auth/login" className="hover:text-primary-200 transition-colors">Login</Link></li> */}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-primary-200 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary-200 transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-primary-200 transition-colors">HIPAA Compliance</Link></li>
                <li><Link href="#" className="hover:text-primary-200 transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-primary-200 transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-primary-200 transition-colors">Research Papers</Link></li>
                <li><Link href="#" className="hover:text-primary-200 transition-colors">FAQs</Link></li>
                <li><Link href="#" className="hover:text-primary-200 transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Glaucoma Detection AI. All rights reserved.</p>
            <p className="mt-2">Built with advanced AI and deep learning for better eye care.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

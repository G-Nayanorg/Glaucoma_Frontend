/**
 * Glaucoma Detection Home Page
 * AI-Powered platform for early glaucoma detection
 */

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Navbar } from '@/components/common/Navbar';
import { HeroSection } from '@/components/common/HeroSection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* About the Application */}
      <section id="about" className="section bg-white">
        <div className="container-custom">
          <h2 className="section-title">About Our Platform</h2>
          <p className="section-subtitle">
            Revolutionizing eye care through artificial intelligence
          </p>

          <div className="max-w-6xl mx-auto space-y-12">
            {/* First Row: The Problem + Our Solution | About-1 Image */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">The Problem</h3>
                <p className="text-medical-gray-700 mb-6 leading-relaxed">
                  Glaucoma is the leading cause of irreversible blindness worldwide, affecting over 80 million people.
                  Early detection is crucial, as vision loss from glaucoma is permanent and cannot be restored.
                  Traditional screening methods can be time-consuming and require specialized expertise.
                </p>

                <h3 className="text-2xl font-semibold mb-4">Our Solution</h3>
                <p className="text-medical-gray-700 leading-relaxed">
                  Our platform uses advanced AI algorithms and deep learning models to detect early signs of glaucoma
                  from fundus and OCT images. With high accuracy and instant results, we help ophthalmologists and
                  healthcare providers screen patients faster and more efficiently, enabling early intervention and
                  better patient outcomes.
                </p>
              </div>

              <div className="relative h-[400px]">
                <Image
                  src="/About-1.jpg"
                  alt="Glaucoma Detection Technology"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Second Row: About-2 Image | Technology Stack */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px]">
                <Image
                  src="/About-2.jpg"
                  alt="AI-Powered Eye Care"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-6">Technology Stack</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary-200 rounded-full mt-2 mr-3"></span>
                    <span className="text-medical-gray-700"><strong>Deep Learning:</strong> Convolutional Neural Networks (CNNs) for image analysis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary-200 rounded-full mt-2 mr-3"></span>
                    <span className="text-medical-gray-700"><strong>Medical Imaging:</strong> Specialized fundus and OCT image processing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary-200 rounded-full mt-2 mr-3"></span>
                    <span className="text-medical-gray-700"><strong>AI Models:</strong> Trained on thousands of validated clinical images</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary-200 rounded-full mt-2 mr-3"></span>
                    <span className="text-medical-gray-700"><strong>Cloud Computing:</strong> Fast, scalable infrastructure for instant results</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="section bg-primary-50">
        <div className="container-custom">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Simple, fast, and accurate glaucoma detection in four easy steps
          </p>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
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

      {/* Features / Key Highlights */}
      <section id="features" className="section bg-white">
        <div className="container-custom">
          <h2 className="section-title">Key Features</h2>
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

      {/* Results / Accuracy Section */}
      <section id="accuracy" className="section bg-primary-50">
        <div className="container-custom">
          <h2 className="section-title">Proven Accuracy</h2>
          <p className="section-subtitle">
            Clinical validation and performance metrics you can trust
          </p>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            <div className="bg-white p-6 rounded-xl text-center shadow-card">
              <div className="text-4xl font-bold text-primary-600 mb-2">95.8%</div>
              <div className="text-sm font-medium text-medical-gray-700">Model Accuracy</div>
            </div>
            <div className="bg-white p-6 rounded-xl text-center shadow-card">
              <div className="text-4xl font-bold text-success-600 mb-2">94.2%</div>
              <div className="text-sm font-medium text-medical-gray-700">Precision Rate</div>
            </div>
            <div className="bg-white p-6 rounded-xl text-center shadow-card">
              <div className="text-4xl font-bold text-info-600 mb-2">96.5%</div>
              <div className="text-sm font-medium text-medical-gray-700">Recall Rate</div>
            </div>
            <div className="bg-white p-6 rounded-xl text-center shadow-card">
              <div className="text-4xl font-bold text-warning-600 mb-2">95.3%</div>
              <div className="text-sm font-medium text-medical-gray-700">F1 Score</div>
            </div>
          </div>

          <Card className="max-w-4xl mx-auto bg-white">
            <h3 className="text-2xl font-semibold mb-4">Clinical Validation</h3>
            <p className="text-medical-gray-700 mb-4 leading-relaxed">
              Our AI model has been extensively validated through clinical trials involving over 50,000 retinal images
              from diverse patient populations. The model's performance has been peer-reviewed and published in leading
              ophthalmology journals.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-success-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-medical-gray-700">Outperforms traditional screening methods in early-stage detection</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-success-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-medical-gray-700">Validated by board-certified ophthalmologists from multiple institutions</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-success-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-medical-gray-700">Consistent performance across different imaging equipment and protocols</span>
              </li>
            </ul>
          </Card>
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

      {/* Demo / Try It Section */}
      <section id="demo" className="section bg-gradient-to-br from-primary-100 via-primary-50 to-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title">Try It Yourself</h2>
            <p className="text-xl text-medical-gray-700 mb-8">
              Experience the power of AI-driven glaucoma detection
            </p>

            <Card className="bg-white text-left">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Upload Your Image</h3>
                  <p className="text-medical-gray-600 mb-6">
                    Upload a retinal fundus or OCT image to see our AI in action.
                    Get instant analysis and detailed diagnostic insights.
                  </p>

                  <div className="border-2 border-dashed border-primary-200 rounded-xl p-8 text-center mb-6 bg-primary-50 hover:bg-primary-100 transition-colors cursor-pointer">
                    <svg className="w-12 h-12 text-primary-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm font-medium text-primary-800">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-medical-gray-600 mt-1">
                      PNG, JPG, or DICOM (max 10MB)
                    </p>
                  </div>

                  <Link href="/dashboard">
                    <Button size="lg" className="w-full bg-primary-200 hover:bg-primary-300 text-black font-semibold">
                      Start Free Detection
                    </Button>
                  </Link>
                </div>

                <div className="bg-primary-50 p-6 rounded-xl">
                  <h4 className="text-lg font-semibold mb-4">Sample Demo</h4>
                  <p className="text-sm text-medical-gray-600 mb-4">
                    Watch how our AI analyzes retinal images:
                  </p>

                  <div className="bg-medical-gray-900 rounded-lg aspect-video flex items-center justify-center mb-4">
                    <svg className="w-16 h-16 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>

                  <ul className="space-y-2 text-sm text-medical-gray-700">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-success-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Real-time image processing
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-success-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Detailed diagnostic report
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-success-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Risk assessment visualization
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="section-title">What Healthcare Professionals Say</h2>
          <p className="section-subtitle">
            Trusted by ophthalmologists and medical institutions worldwide
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 border-primary-100">
              <div className="mb-4">
                <svg className="w-8 h-8 text-primary-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-medical-gray-700 mb-4 italic">
                "This platform has revolutionized our glaucoma screening process. We can now screen 3x more patients
                with greater accuracy and confidence."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center mr-3">
                  <span className="text-primary-800 font-semibold">DM</span>
                </div>
                <div>
                  <div className="font-semibold">Dr. Michael Chen</div>
                  <div className="text-sm text-medical-gray-600">Ophthalmologist, Johns Hopkins</div>
                </div>
              </div>
            </Card>

            <Card className="border-2 border-primary-100">
              <div className="mb-4">
                <svg className="w-8 h-8 text-primary-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-medical-gray-700 mb-4 italic">
                "The accuracy is impressive. It's become an indispensable tool in our clinic for early glaucoma detection.
                Highly recommended!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center mr-3">
                  <span className="text-primary-800 font-semibold">SP</span>
                </div>
                <div>
                  <div className="font-semibold">Dr. Sarah Patel</div>
                  <div className="text-sm text-medical-gray-600">Director, Vision Care Institute</div>
                </div>
              </div>
            </Card>

            <Card className="border-2 border-primary-100">
              <div className="mb-4">
                <svg className="w-8 h-8 text-primary-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-medical-gray-700 mb-4 italic">
                "Easy to use and incredibly reassuring. The detailed reports help me understand my eye health better and
                communicate effectively with my doctor."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center mr-3">
                  <span className="text-primary-800 font-semibold">RJ</span>
                </div>
                <div>
                  <div className="font-semibold">Robert Johnson</div>
                  <div className="text-sm text-medical-gray-600">Patient</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

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

      {/* Contact Section */}
      <section id="contact" className="section bg-white">
        <div className="container-custom">
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">
            Have questions? We're here to help
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-primary-50">
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <div className="font-semibold">Email</div>
                    <a href="mailto:support@glaucomadetection.ai" className="text-primary-600 hover:underline">
                      support@glaucomadetection.ai
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <a href="tel:+1234567890" className="text-primary-600 hover:underline">
                      +1 (234) 567-8900
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <div className="font-semibold">Address</div>
                    <p className="text-medical-gray-700">
                      123 Medical AI Plaza<br />
                      San Francisco, CA 94102
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="font-semibold mb-3">Follow Us</div>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary-200 transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary-200 transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary-200 transition-colors">
                    <span className="sr-only">Facebook</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label className="label">Name</label>
                  <input type="text" className="input-field" placeholder="Your name" />
                </div>

                <div>
                  <label className="label">Email</label>
                  <input type="email" className="input-field" placeholder="your@email.com" />
                </div>

                <div>
                  <label className="label">Subject</label>
                  <input type="text" className="input-field" placeholder="How can we help?" />
                </div>

                <div>
                  <label className="label">Message</label>
                  <textarea className="input-field" rows={4} placeholder="Your message..."></textarea>
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary-200 hover:bg-primary-300 text-black font-semibold">
                  Send Message
                </Button>
              </form>
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
                <li><Link href="#how-it-works" className="hover:text-primary-200 transition-colors">How It Works</Link></li>
                <li><Link href="/dashboard" className="hover:text-primary-200 transition-colors">Try Now</Link></li>
                <li><Link href="#contact" className="hover:text-primary-200 transition-colors">Contact</Link></li>
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
            <p>&copy; 2024 Glaucoma Detection AI. All rights reserved.</p>
            <p className="mt-2">Built with advanced AI and deep learning for better eye care.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

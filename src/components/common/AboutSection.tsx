/**
 * AboutSection Component
 * About Our Platform section with scroll-triggered slide animations
 */

'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function AboutSection() {
    const row1Content = useScrollAnimation<HTMLDivElement>();
    const row1Image = useScrollAnimation<HTMLDivElement>();
    const row2Image = useScrollAnimation<HTMLDivElement>();
    const row2Content = useScrollAnimation<HTMLDivElement>();

    return (
        <section id="about" className="section bg-white pb-0">
            <div className="container-custom">
                <h2 className="section-title">About Our Platform</h2>
                <p className="section-subtitle">
                    Revolutionizing eye care through artificial intelligence
                </p>

                <div className="max-w-6xl mx-auto space-y-4">
                    {/* First Row: The Problem + Our Solution | About-1 Image */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
                        <div
                            ref={row1Content.ref}
                            className={`slide-in-left ${row1Content.isInView ? 'in-view' : ''}`}
                        >
                            <h3 className="text-xl md:text-2xl font-semibold mb-4">The Problem</h3>
                            <p className="text-medical-gray-700 mb-6 leading-relaxed text-sm md:text-base">
                                Glaucoma is the leading cause of irreversible blindness worldwide, affecting over 80 million people.
                                Early detection is crucial, as vision loss from glaucoma is permanent and cannot be restored.
                                Traditional screening methods can be time-consuming and require specialized expertise.
                            </p>

                            <h3 className="text-xl md:text-2xl font-semibold mb-4">Our Solution</h3>
                            <p className="text-medical-gray-700 leading-relaxed text-sm md:text-base">
                                Our platform uses advanced AI algorithms and deep learning models to detect early signs of glaucoma
                                from fundus and OCT images. With high accuracy and instant results, we help ophthalmologists and
                                healthcare providers screen patients faster and more efficiently, enabling early intervention and
                                better patient outcomes.
                            </p>
                        </div>

                        <div
                            ref={row1Image.ref}
                            className={`relative h-[250px] md:h-[400px] slide-in-right ${row1Image.isInView ? 'in-view' : ''}`}
                        >
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
                        <div
                            ref={row2Image.ref}
                            className={`relative h-[250px] md:h-[400px] slide-in-left ${row2Image.isInView ? 'in-view' : ''} order-2 md:order-1`}
                        >
                            <Image
                                src="/About-2.jpg"
                                alt="AI-Powered Eye Care"
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>

                        <div
                            ref={row2Content.ref}
                            className={`slide-in-right ${row2Content.isInView ? 'in-view' : ''} order-1 md:order-2`}
                        >
                            <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Technology Stack</h3>
                            <ul className="space-y-3 md:space-y-4">
                                <li className="flex items-start">
                                    <span className="inline-block w-2 h-2 bg-primary-200 rounded-full mt-2 mr-3"></span>
                                    <span className="text-medical-gray-700 text-sm md:text-base"><strong>Deep Learning:</strong> Convolutional Neural Networks (CNNs) for image analysis</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="inline-block w-2 h-2 bg-primary-200 rounded-full mt-2 mr-3"></span>
                                    <span className="text-medical-gray-700 text-sm md:text-base"><strong>Medical Imaging:</strong> Specialized fundus and OCT image processing</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="inline-block w-2 h-2 bg-primary-200 rounded-full mt-2 mr-3"></span>
                                    <span className="text-medical-gray-700 text-sm md:text-base"><strong>AI Models:</strong> Trained on thousands of validated clinical images</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="inline-block w-2 h-2 bg-primary-200 rounded-full mt-2 mr-3"></span>
                                    <span className="text-medical-gray-700 text-sm md:text-base"><strong>Cloud Computing:</strong> Fast, scalable infrastructure for instant results</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

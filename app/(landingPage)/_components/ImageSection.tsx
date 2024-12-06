'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const images = [
    { src: "/image1.jpeg", alt: "AI-powered resume creation" },
    { src: "/image2.jpeg", alt: "Professional resume example" },
]

export function ImageSection() {
    const [currentImage, setCurrentImage] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length)
    const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)

    return (
        <section className="w-full py-12 md:py-16 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-7">
                <div className="flex flex-col items-center space-y-10">
                    <Card className="w-full max-w-[1400px] mx-auto overflow-hidden">
                        <CardContent className="p-0">
                            <div className="relative aspect-[16/9] mx-auto">
                                {images.map((image, index) => (
                                    <Image
                                        key={image.src}
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        sizes="(max-width: 1400px) 100vw, 1400px"
                                        priority={index === 0}
                                        className={`object-cover transition-opacity duration-500 ${index === currentImage ? 'opacity-100' : 'opacity-0'
                                            }`}
                                    />
                                ))}
                                <div className="absolute inset-0 flex items-center justify-between p-4">
                                    <Button size="icon" variant="ghost" onClick={prevImage} className="text-white bg-black/50 hover:bg-black/70">
                                        <ChevronLeft className="h-6 w-6" />
                                        <span className="sr-only">Previous image</span>
                                    </Button>
                                    <Button size="icon" variant="ghost" onClick={nextImage} className="text-white bg-black/50 hover:bg-black/70">
                                        <ChevronRight className="h-6 w-6" />
                                        <span className="sr-only">Next image</span>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="text-center max-w-3xl">
                        <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
                            Revolutionize Your Job Search
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
                            Our AI-powered platform analyzes thousands of successful resumes to ensure yours stands out in today&apos;s competitive job market.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}


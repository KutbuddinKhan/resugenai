import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, FileText, MessageSquare } from 'lucide-react'

export function FeatureCards() {
    const features = [
        {
            title: "AI-Powered Optimization",
            description: "Our Gemini AI analyzes your input and optimizes every section of your resume for maximum impact and relevance.",
            icon: Lightbulb
        },
        {
            title: "Industry-Specific Templates",
            description: "Choose from a variety of professionally designed templates tailored to your specific industry and career level.",
            icon: FileText
        },
        {
            title: "Real-Time Feedback",
            description: "Receive instant suggestions and improvements as you build your resume, ensuring the best possible outcome.",
            icon: MessageSquare
        }
    ]

    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-7">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center max-w-[1400px] mx-auto">
                    {features.map((feature, index) => (
                        <Card key={index} className="w-full max-w-sm">
                            <CardHeader>
                                <feature.icon className="w-10 h-10 mb-2 text-purple-500" />
                                <CardTitle>{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}


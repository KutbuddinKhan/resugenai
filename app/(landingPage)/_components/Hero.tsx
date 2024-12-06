export function Hero() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-black">
                            Craft Your Perfect Resume with AI
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-6200 md:text-xl">
                            ResuGen.ai uses advanced AI to help you create a standout resume in minutes.
                            Tailored to your industry, experience, and career goals.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

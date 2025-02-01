"use client"

import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

type Props = {
  onSubmit: (question: string) => void
}

export default function QuestionInput({ onSubmit }: Props) {
    const [activeQuery, setActiveQuery] = useState<string | null>(null)

    const suggestions = [
        "Show dengue cases in Ghana for the last 3 months",
        "Compare malaria rates in Greater Accra, Ashanti, and Northern regions this year",
        "Measles outbreaks at Korle Bu Teaching Hospital in the past month",
        "Trend of malaria cases in Ashanti Region over the past 6 months",
    ]

    const handleSubmit = (suggestion?: string) => {
        const question = suggestion || activeQuery
        if (question) {
            onSubmit(question)
            setActiveQuery(null)
        }
    }

    return (
        <div className="relative w-full max-w-3xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-3">
                {suggestions.map((suggestion, index) => (
                    <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs bg-white hover:bg-gray-100"
                        onClick={() => handleSubmit(suggestion)}
                    >
                        {suggestion}
                    </Button>
                ))}
            </div>
            <form
                className="relative flex items-center gap-2 p-2 bg-white rounded-[20px] shadow-sm border border-gray-100"
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}
            >
                <Input
                    type="text"
                    value={activeQuery || ""}
                    onChange={(e) => setActiveQuery(e.target.value)}
                    placeholder="Ask about anything..."
                    className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder:text-gray-500"
                />
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-100" type="submit">
                    <ArrowUp className="h-5 w-5 text-gray-500" />
                    <span className="sr-only">Submit query</span>
                </Button>
            </form>
        </div>
    )
}


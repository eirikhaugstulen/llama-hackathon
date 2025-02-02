"use client"

import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    showSuggestions: boolean
    onSuggestionClick: (suggestion: string) => void
}

export default function QuestionInput({
    value,
    onChange,
    onSubmit,
    showSuggestions,
    onSuggestionClick
}: Props) {
    const suggestions = [
        "Show dengue cases in Ghana for the last 3 months",
        "Compare malaria rates in all regions last year",
        "Measles outbreaks at Korle Bu Teaching Hospital in the past month",
        "Trend of malaria cases in Ashanti Region over the past 6 months",
    ]

    return (
        <form onSubmit={onSubmit}>
            <div className="relative w-full max-w-3xl mx-auto">
                {showSuggestions && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {suggestions.map((suggestion, index) => (
                            <div className="w-full truncate" key={index}>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs text-left bg-white hover:bg-gray-100 max-w-full"
                                    onClick={() => onSuggestionClick(suggestion)}
                                >
                                    {suggestion}
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
                <div
                    className="relative flex items-center gap-2 p-2 bg-white rounded-[20px] shadow-sm border border-gray-100"
                >
                    <Input
                        type="text"
                        value={value}
                        onChange={onChange}
                        placeholder="Ask about anything..."
                        className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder:text-gray-500"
                    />
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-100" type="submit">
                        <ArrowUp className="h-5 w-5 text-gray-500" />
                        <span className="sr-only">Submit query</span>
                    </Button>
                </div>
            </div>
        </form>
    )
}


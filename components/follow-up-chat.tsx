"use client"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { useChat } from "ai/react"
import QuestionInput from "./question-input"
import { ThinkingMessage } from "./message"
import { PreviewMessage } from "./message"
import { useScrollToBottom } from "./use-scroll-to-bottom"
import { useEffect } from "react"
import { VisualizationData } from "./visualization-container"

export function FollowUpChat({
    setVisualizationData,
}: {
    setVisualizationData: (data: VisualizationData) => void
}) {
    const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();
    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
        error,
    } = useChat({
        initialMessages: [
            {
                id: 'initial-message',
                role: 'assistant',
                content: 'Hey there! Let\'s start creating a new visualisation. Can you tell me what you want to visualise?',
            },
        ],
        onFinish(message) {
            if (message.toolInvocations && message.toolInvocations.length > 0) {
                const updateDataItemsToolCall = message.toolInvocations.filter(toolInvocation => toolInvocation.toolName === 'updateDataItems')
                if (updateDataItemsToolCall.length > 0) {
                    const latestToolCall = updateDataItemsToolCall[updateDataItemsToolCall.length - 1]
                    
                    if (latestToolCall.result) {
                        const { indicators, periods, orgUnits } = latestToolCall.result.data

                        setVisualizationData({
                            dataItems: indicators,
                            periods,
                            orgUnits,
                        })
                    }
                }
            }
        },
    })

    useEffect(() => {
        if (error) {
            console.log(error)
        }
    }, [error])

    const handleSuggestionClick = (suggestion: string) => {
        handleInputChange({ target: { value: suggestion } } as React.ChangeEvent<HTMLInputElement>)
        handleSubmit()
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 max-h-[700px]">
                <div
                    ref={messagesContainerRef}
                    className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4"
                >

                    {messages.map((message) => (
                        <PreviewMessage
                            key={message.id}
                            message={message}
                            isReadonly={true}
                        />
                    ))}

                    {isLoading &&
                    messages.length > 0 &&
                    messages[messages.length - 1].role === 'user' && <ThinkingMessage />}

                    <div
                        ref={messagesEndRef}
                        className="shrink-0 min-w-[24px] min-h-[24px]"
                    />
                </div>

                <QuestionInput
                    value={input}
                    onChange={handleInputChange}
                    onSubmit={handleSubmit}
                    onSuggestionClick={handleSuggestionClick}
                    showSuggestions={messages.length < 2}
                />
            </CardContent>
        </Card>
    )
} 
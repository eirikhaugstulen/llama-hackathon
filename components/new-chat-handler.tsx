"use client"

import { redirect } from "next/navigation"
import QuestionInput from "./question-input"

type Props = {
    id: string
}

export default function NewChatHandler({ id }: Props) {
    const onSubmit = async (question: string) => {
        console.log(question)
        redirect(`/analytics/${id}?query=${question}`)
    }

    return (
        <QuestionInput onSubmit={onSubmit} />
    )
} 
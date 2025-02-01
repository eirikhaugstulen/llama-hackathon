"use client"

import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Button } from "./ui/button"


export default function NewChatHandler() {    
    const onSubmit = async () => {
        const supabase = createClient()

        const { data, error } = await supabase
            .from('visualizations')
            .insert({})
            .select()
            .single()
        

        if (error || !data) {
            console.error(error)
            return;
        }

        redirect(`/analytics/${data.id}`)
    }

    return (
        <div className="w-full">
            <div className="flex justify-end">
                <Button
                    variant="outline"
                    onClick={onSubmit}
                >
                    New Chat
                </Button>
            </div>
        </div>
    )
} 
import NewChatHandler from "@/components/new-chat-handler";
import { generateId } from "@/lib/utils";

export default function Page() {
    const id = generateId();

    return (
        <div className="flex flex-1 flex-col justify-end pb-16 gap-4 p-4 min-h-[calc(100vh-4rem)]">
            <NewChatHandler id={id} />
        </div>
    )
}
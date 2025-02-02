import NewChatHandler from "@/components/new-chat-handler";
import { redirect } from "next/navigation";
import {
    Card, 
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Page() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/login');
    }

    const { data } = await supabase
        .from('visualizations')
        .select('*')
        .eq('user_id', user.id);

    if (!data) {
        return <div>No visualizations found</div>;
    }

    return (
        <div className="w-full max-w-3xl mx-auto p-4 min-h-[calc(100vh-4rem)]">
            <NewChatHandler />

            <div className="flex flex-col gap-4 py-4">

                {data.map((visualization) => (
                    <Link key={visualization.id} href={`/analytics/${visualization.id}`}>
                        <Card className="group hover:bg-muted">
                            <CardHeader>
                                <CardTitle className="group-hover:underline">
                                    {visualization.title}
                                </CardTitle>
                                <CardDescription className="group-hover:underline">
                                    {visualization.description}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
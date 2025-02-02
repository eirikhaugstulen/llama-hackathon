import {
    Card, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { VisualizationContainer } from "@/components/visualization-container"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: visualization, error } = await supabase
        .from('visualizations')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

    if (error || !visualization) {
        return (
            <div className="flex justify-center items-center mt-32">
                <Card>
                    <CardHeader>
                        <CardTitle>Error</CardTitle>
                        <CardDescription>
                            We couldn&apos;t find the visualization you were looking for.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Link href="/analytics">
                            <Button>Go back</Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    return (
        <div className="justify-center items-center mt-3 w-full px-10 pt-6">
            <div className="w-full space-y-1 mb-4">
                <h1 className="text-xl font-bold">{visualization.title}</h1>
                <p className="text-md text-muted-foreground">
                    {visualization.description}
                </p>
            </div>
            <VisualizationContainer />
        </div>
    )
}
    
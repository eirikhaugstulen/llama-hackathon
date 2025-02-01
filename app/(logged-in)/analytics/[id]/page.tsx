import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

export default async function Page({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ query: string }> }) {
    const { id } = await params
    const { query } = await searchParams
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
        <div className="justify-center items-center mt-3 w-full px-10">
            <div className="w-full text-xl mb-4">
                <h1 className="text-2xl font-bold">{visualization.title}</h1>
                <p className="text-muted-foreground">
                    {visualization.description}
                </p>
            </div>
            <div className="w-full grid grid-cols-10 gap-4">
                <Card className="col-span-6">
                    <CardHeader>
                        <CardTitle>Chart</CardTitle>
                    </CardHeader>
                    <CardContent>
                        
                    </CardContent>
                </Card>

                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>
                            
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>ID: {id}</p>
                        <p>Query: {query}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
    
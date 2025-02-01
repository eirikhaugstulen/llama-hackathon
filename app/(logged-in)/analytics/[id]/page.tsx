import {
    Card, CardContent, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card"
import { z } from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function Page({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ query: string }> }) {
    const { id } = await params
    const { query } = await searchParams

    //Make sure the query is a string and does not contain any malicious characters
    const sanitizedQuery = z.string().safeParse(query)

    if (!sanitizedQuery.success) {
        return (
            <div className="flex justify-center items-center mt-32">
                <Card>
                    <CardHeader>
                        <CardTitle>Invalid query</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>It seems like the query you provided is invalid. Please try again.</p>
                    </CardContent>
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
        <div className="flex justify-center items-center mt-32">
            <Card>
                <CardHeader>
                    <CardTitle>Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>ID: {id}</p>
                    <p>Query: {query}</p>
                </CardContent>
            </Card>
        </div>
    )
}
    
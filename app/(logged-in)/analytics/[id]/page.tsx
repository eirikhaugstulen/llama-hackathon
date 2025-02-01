import { z } from "zod"

export default async function Page({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ query: string }> }) {
    const { id } = await params
    const { query } = await searchParams

    const sanitizedQuery = z.string().safeParse(query)

    if (!sanitizedQuery.success) {
        console.log(id)
        console.log(query)
        return <div>Invalid query</div>
    }

    return (
        <div>
            <h1>{id}</h1>
            <p>{query}</p>
        </div>
    )
}
    
import { embed } from 'ai'
import { openai } from '@ai-sdk/openai'
import { createClient } from '@supabase/supabase-js'

const embedding = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: 'Malaria confirmed cases reported',
})

const supabase = await createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

const { data, error } = await supabase.from('indicators').update({
    embedding: embedding.embedding,
}).eq('displayName', 'Malaria confirmed cases reported')

console.log(data, error)
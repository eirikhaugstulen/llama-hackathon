'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const schema = z.object({
        email: z.string().email(),
        password: z.string(),
    })
    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const parsedData = schema.safeParse(data)

    if (!parsedData.success) {
        redirect('/login?error=invalid_data')
    }

    const { error } = await supabase.auth.signInWithPassword(parsedData.data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/dashboard', 'layout')
    redirect('/dashboard')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
}
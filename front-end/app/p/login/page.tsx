"use client"
import React, { FormEvent, useEffect, useState } from 'react'
import styles from "./page.module.css"
import store from '@/store'
import { logInUser } from '@/store/actions/userActions'
import Link from 'next/link'
import { Loading } from '@/public/svg/converted'

export default function Page() {

    // user info on redux
    const [user] = useState(store.getState().user)
    const [loading, setLoading] = useState<boolean>(false)

    async function submitForm(e: FormEvent) {

        e.preventDefault()

        setLoading(true)

        const form = e.target as HTMLFormElement

        const userData: UserLogIn = {
            email: form.email.value,
            password: form.password.value
        }

        const data = await store.dispatch(logInUser(userData))

        if (data) {
            alert(data.message)

            window.location.pathname = "/"
        }

        setLoading(false)

    }

    useEffect(() => {

        // redirects to home page
        if ((user as User).token) {
            window.location.pathname = "/"
        }

    }, [user])

    return (
        <div id={styles.container}>

            <h1>Login</h1>

            <Link href={"/p/signup"}>Ainda não tem conta? Clique aqui!</Link>

            <form onSubmit={(e) => submitForm(e)}>

                <div>
                    <label>
                        Email
                        <input type='email' name='email' required placeholder='seuemail@gmail.com'></input>
                    </label>

                    {/* needs to apply PATTERN */}
                    <label>
                        Senha
                        <input type='password' name='password' required placeholder='*********'></input>
                    </label>
                </div>

                <button type='submit' disabled={loading}>
                    {loading ? <Loading /> : "Login"}
                </button>

            </form>

        </div>
    )
}

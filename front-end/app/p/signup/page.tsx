"use client"
import React, { FormEvent, useEffect, useState } from 'react'
import styles from "./page.module.css"
import store from '@/store'
import { signUpUser } from '@/store/actions/userActions'
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

        if (form.password.value != form.confirm_password.value) {
            alert("Senhas diferentes. Tente Novamente.")

            setLoading(false)

            return
        }

        const userData: UserSignUp = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            email: form.email.value,
            password: form.password.value
        }

        const data = await store.dispatch(signUpUser(userData))

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

            <h1>Registre-se</h1>

            <Link href={"/p/login"}>Já tem conta? Clique aqui!</Link>

            <form onSubmit={(e) => submitForm(e)}>

                <label>
                    Seu Email
                    <input type='email' name='email' required placeholder='seuemail@gmail.com'></input>
                </label>

                {/* needs to apply PATTERN */}
                <label>
                    Senha
                    <input type='password' name='password' required placeholder='*********'></input>
                </label>

                {/* needs to apply PATTERN */}
                <label>
                    Confirmar Senha
                    <input type='password' name='confirm_password' required placeholder='*********'></input>
                </label>

                <label>
                    Primeiro Nome
                    <input type='text' name='firstName' required placeholder='Laura'></input>
                </label>

                <label>
                    Último Nome
                    <input type='text' name='lastName' required placeholder='Santos'></input>
                </label>

                <button type='submit' disabled={loading}>
                    {loading ? <Loading /> : "Cadastrar"}
                </button>

            </form>

        </div>
    )
}

"use client"
import React, { FormEvent, useRef } from 'react'
import styles from "./page.module.css"
import axios from 'axios'

export default function Page() {

    async function submitForm(e: FormEvent) {

        e.preventDefault()

        const form = e.target as HTMLFormElement

        if (form.password.value != form.confirm_password.value) {

            alert("Senhas diferentes. Tente Novamente.")

            return
        }

        const { data }: { data: ServerWithJsonResponse } = await axios.post(
            `${process.env.SERVER_URL}/signup`,
            {
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                email: form.email.value,
                password: form.password.value
            }
        )

        if (!data.success) {

            alert(data.message)

            return

        }

        alert(data.message)

        window.location.pathname = "/"

    }

    return (
        <div id={styles.container}>

            <h1>Registre-se</h1>

            <form onSubmit={(e) => submitForm(e)}>

                <label>
                    Seu Email
                    <input type='email' name='email' required placeholder='seuemail@gmail.com'></input>
                </label>

                <label>
                    Senha
                    <input type='password' name='password' required placeholder='*********'></input>
                </label>

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

                <button type='submit'>Cadastrar</button>

            </form>

        </div>
    )
}

'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { getData } from '@/api/fetchConfig'

export default async function Page({ params }: { params: { id: string } }) {

    const [data, setData] = useState<ServerWithStringResponse>()

    // gets ID from url, then makes a request to server, receiving the original url
    useEffect(() => {
        async function load() {
            const res = await getData(`${process.env.SERVER_URL}/${params.id}`, true)

            setData(res as ServerWithStringResponse)
        }
        load()
    }, [])

    if (data) {
        window.location.assign(`${data.response}`)
    }

    return (
        <div id={styles.container}>

            <div id={styles.message}>
                <h1 className={styles.primary_color}>
                    {data?.message ? data.message : "Redirecionando..."}
                </h1>

                {data && (
                    <h2>{data.response}</h2>
                )}

                <p>[sticker]</p>
            </div>

        </div>
    )
}

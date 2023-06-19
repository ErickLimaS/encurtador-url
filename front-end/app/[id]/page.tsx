'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'

async function getData(shortUrlId: string) {

    const res = await fetch(`${process.env.SERVER_URL}/${shortUrlId}`)
        .then((result) => { return result.json() })

    if (!res.success) {
        throw new Error('Failed to fetch data')
    }

    return res

}

export default async function Page({ params }: { params: { id: string } }) {

    const [data, setData] = useState<ServerWithStringResponse>()

    // gets ID from url, then makes a request to server, receiving the original url
    useEffect(() => {
        async function load() {
            const res: ServerWithStringResponse = await getData(params.id)

            setData(res)
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

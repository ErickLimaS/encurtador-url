"use client"
import React, { useEffect, useLayoutEffect, useState } from 'react'
import styles from "./page.module.css"
import store from '@/store'
import { getData } from '@/api/fetchConfig'
import UrlCreatedByUserCard from '@/app/components/UrlCreatedByUserCard/UrlCreatedByUserCard'

export default async function Page() {

    const [user] = useState(store.getState().user)

    const data: any = await getData(`${process.env.SERVER_URL}/user/activities`, undefined, {
        headers: {
            "Authorization": `Bearer ${(user as User).token}`
        }
    })

    return (
        <div id={styles.container}>

            <h1>Histórico</h1>

            <section id={styles.results_container}>

                {data.activities.map((item: UrlObjectFromServer, key: number) => (
                    <div key={key} className={styles.result_item}>
                        <h2>{key + 1}</h2>
                        <UrlCreatedByUserCard props={item} />
                    </div>
                ))}

            </section>

        </div >
    )
}

import { getData } from '@/api/fetchConfig'
import UrlCard from '@/app/components/UrlCard/UrlInfoCard'
import React from 'react'
import styles from "./page.module.css"

export default async function Page() {

    const data: any = await getData(`${process.env.SERVER_URL}/all?limit=100&sortBy=DESC`)

    return (
        <div id={styles.container}>

            <h1>Top 100 URLs</h1>

            <section id={styles.results_container}>

                {data.map((item: UrlObjectFromServer, key: number) => (
                    <div key={key} className={styles.result_item}>
                        <h2>{key + 1}</h2>
                        <UrlCard data={item} />
                    </div>
                ))}

            </section>

        </div>
    )
}

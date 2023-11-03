import { getData } from '@/api/fetchConfig'
import UrlCard from '@/app/components/UrlCard/UrlInfoCard'
import React from 'react'
import styles from "./page.module.css"

export default async function Page() {

    const data: unknown = await getData(`${process.env.SERVER_URL}/all?limit=100&sortBy=DESC`)

    return (
        <div id={styles.container}>

            <h1>Top 100 URLs</h1>

            <section id={styles.results_container}>

                {(data as [UrlObjectFromServer]).map((item: UrlObjectFromServer, key: number) => (
                    <div key={key} className={styles.result_item}>
                        <UrlCard data={item} position={key + 1} />
                    </div>
                ))}

            </section>

        </div>
    )
}

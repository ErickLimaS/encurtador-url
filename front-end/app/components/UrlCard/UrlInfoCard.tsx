"use client"
import React from 'react'
import styles from "./component.module.css"
import Link from 'next/link'

export default function UrlCard({ data }: { data: UrlObjectFromServer }) {

    return (
        <div id={styles.container}>
            <div id={styles.visitors_container}>
                <p>{data.visitors} <span>Visitas</span></p>
            </div>
            <div id={styles.info_container}>
                <div id={styles.first_info}>
                    <h3><span className={`${styles.lower_fs} ${styles.color_black}`}>Original:</span> {data.originalUrl}</h3>
                    <p><span className={`${styles.lower_fs} ${styles.color_black}`}>Hash:</span> {data.shortenedUrl}</p>
                </div>
                <p>
                    Criado por{" "}
                    <span className={`${styles.color_primary}`}>
                        {data.creator.firstName || "Anonimo"}
                    </span>
                    {" "}em{" "}
                    <span className={`${styles.color_primary}`}>
                        {new Date(data.createdAt).toLocaleString(
                            'default', { day: "2-digit", month: '2-digit', year: '2-digit' }
                        )}
                    </span>
                </p>
            </div>
            <Link href={data.originalUrl} id={styles.link}>
                Acessar URL
            </Link>
        </div>
    )
}

"use client"
import React from 'react'
import styles from "./component.module.css"
import Link from 'next/link'

export default function UrlCard({ data, position }: { data: UrlObjectFromServer, position: number }) {

    return (
        <div id={styles.container}>

            <div id={styles.classification_heading}>
                <h2>{position}</h2>
            </div>

            <div id={styles.card_heading_tittle_wrapper}>
                <h3>
                    <Link href={data.originalUrl}>
                        {data.shortenedUrl}
                    </Link>
                </h3>
                <p>
                    <span className={`${styles.lower_fs} ${styles.color_black}`}>Original:</span> {data.originalUrl}
                </p>
            </div>

            <div id={styles.visitors_container}>
                <p>{data.visitors}</p>
                <span>Visitas</span>
            </div>

            <div id={styles.card_footer_wrapper}>
                <Link href={data.originalUrl} id={styles.link}>
                    Acessar URL
                </Link>

                <small>
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
                </small>
            </div>

        </div>
    )
}

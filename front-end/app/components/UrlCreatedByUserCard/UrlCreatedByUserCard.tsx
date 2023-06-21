"use client"
import React, { useEffect, useState } from 'react'
import styles from "./component.module.css"
import Link from 'next/link'
import { getData } from '@/api/fetchConfig'
import store from '@/store'

export default function UrlCreatedByUserCard({ props }: { props: UrlObjectFromServer }) {

    const [user] = useState(store.getState().user)

    async function deleteUrl() {

        const data: any = await getData(`${process.env.SERVER_URL}/delete-short-url`, true, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${(user as User).token}`
            },
            body: JSON.stringify({
                "_id": `${props._id}`
            })
        })

        if (data.success) {

            alert(data.message)

            window.location.reload()

        }

    }

    useEffect(() => {

        if (!(user as User).token) {

            window.location.pathname = "/"

        }

    }, [])

    return (
        <div id={styles.container}>
            <div id={styles.visitors_container}>
                <p>{props.visitors} <span>Visitas</span></p>
            </div>
            <div id={styles.info_container}>
                <div id={styles.first_info}>
                    <h3><span className={`${styles.lower_fs} ${styles.color_black}`}>Original:</span> {props.originalUrl}</h3>
                    <p><span className={`${styles.lower_fs} ${styles.color_black}`}>Hash:</span> {props.shortenedUrl}</p>
                </div>
                <p onClick={() => console.log(props)}>
                    Criado por{" "}
                    <span className={`${styles.color_primary}`}>
                        {props.creator.firstName || "Anonimo"}
                    </span>
                    {" "}em{" "}
                    <span className={`${styles.color_primary}`}>
                        {new Date(props.createdAt).toLocaleString(
                            'default', { day: "2-digit", month: '2-digit', year: '2-digit' }
                        )}
                    </span>
                </p>
            </div>
            <Link href={props.originalUrl} id={styles.link}>
                Acessar URL
            </Link>

            <button id={styles.delete_btn} onClick={() => deleteUrl()}>
                Excluir
            </button>
        </div>
    )
}

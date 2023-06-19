import Link from 'next/link'
import React from 'react'
import styles from "./footer.module.css"

export default function Footer() {
    return (
        <footer id={styles.container}>

            <div id={styles.links_container}>

                <h6>Navegação</h6>

                <nav>
                    <ul>
                        <li><Link href="/p/top-100">Top 100</Link></li>
                        <li><Link href="/p/docs">Documentação</Link></li>
                        <li><Link href="#">Termos de Uso</Link></li>
                    </ul>
                </nav>

            </div>

            <small>@2023. Desafio Speedio</small>

        </footer>
    )
}

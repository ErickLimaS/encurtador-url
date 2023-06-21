'use client'
import React, { useEffect, useState } from 'react'
import styles from './header.module.css'
import Link from 'next/link'
import * as SVG from '@/public/svg/converted'

export default function Header() {

    const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(true)
    const [isUserPanelExpanded, setIsUserPanelExpanded] = useState<boolean>(false)

    const [userData, setUserData] = useState<User>()

    function login() {

        // todo

    }

    useEffect(() => {

        // todo
        // if user is already logged in

    }, [])

    return (
        <header id={styles.header_tag}>

            <div id={styles.container}>

                <Link href={'/'}>Brand Logo</Link>

                <nav className={styles.desktop_only}>
                    <ul className={styles.row} id={styles.nav_list_container}>
                        <li><Link href={'/p/top-100'}>Top 100</Link></li>
                        <li><Link href={'/p/docs'}>Documentação</Link></li>
                    </ul>
                </nav>

                <div id={styles.user_panel_container}>

                    <button
                        id={styles.menu_panel_btn}
                        aria-controls={styles.menu_list_panel}
                        onClick={() => {
                            setIsUserPanelExpanded(!isUserPanelExpanded)
                        }}
                    >
                        <SVG.List aria-label={isUserPanelExpanded ? "Fechar Menu" : "Abrir Menu"} />
                    </button>

                    <div aria-expanded={isMenuExpanded} id={styles.menu_list_panel}>
                        <button
                            className={styles.desktop_only}
                            id={styles.user_open_panel_btn}
                            aria-controls={styles.user_panel}
                            onClick={() => {
                                setIsUserPanelExpanded(!isUserPanelExpanded)
                            }}
                        >
                            {isUserPanelExpanded ? (
                                <><SVG.XCircle alt="Cruz Indicada para Fechar Menu." />Fechar Menu</>
                            ) : (
                                <><SVG.PersonFill alt="Perfil de Pessoa." />Meu Perfil</>
                            )}

                        </button>

                        <div aria-expanded={isUserPanelExpanded} id={styles.user_panel}>

                            <h5 className={styles.mobile_only}><SVG.PersonFill /> Usuário</h5>

                            <ul role='menu'>
                                <li>
                                    <Link href={'/user/activities'} role='menuitem'><SVG.ClockHistory />Histórico</Link>
                                </li>
                                <li>
                                    <button role='menuitem'><SVG.BoxArrowLeft />Sair</button>
                                </li>
                            </ul>

                            <h5 className={styles.mobile_only}>Links</h5>

                            <ul role='menu' className={styles.mobile_only}>
                                <li role='menuitem'>
                                    <Link href={'/p/top-100'}>Top 100</Link>
                                </li>
                                <li role='menuitem'>
                                    <Link href={'/p/docs'}>Documentação</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

        </header>
    )
}

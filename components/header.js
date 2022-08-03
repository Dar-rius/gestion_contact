import Image from "next/image"
import Logo from "../assets/logo.png"
import Link from "next/link"
import styles from "../styles/header.module.css"

export default function Header(){
    return <>
        <header className={styles.header}>
            <Link href="/">
                <a>
                    Accueil
                </a>
            </Link>

            <div>
                <Link href="/ajoutcontact">
                    <a>Ajouter un contact</a>
                </Link>
            </div>
        </header>
    </>
}
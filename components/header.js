import Image from "next/image"
import Logo from "../assets/logo.png"
import Link from "next/link"
import styles from "../styles/header.module.css"
import { Button } from "antd"

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
                    <a>
                    <Button type="primary" shape="round" size="large">
                        Ajouter un contact
                    </Button>
                    </a>
                </Link>
            </div>
        </header>
    </>
}
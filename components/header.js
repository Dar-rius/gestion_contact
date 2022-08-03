import Image from "next/image"
import Logo from "../assets/logo.png"
import Link from "next/link"

export default function Header(){
    return <>
        <header>
            <Link href="/">
                <a>
                    <Image src={Logo}/>
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
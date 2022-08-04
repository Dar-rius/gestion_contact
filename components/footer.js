import Link from "next/link"

export default function Footer(){
    return(
        <footer style={{textAlign:"center", color:"#9EABBA", padding:"0.3%", fontSize:"16px", position:"absolute", bottom:0, width:"100%"}}>
            <div style={{display:"flex", justifyContent:"center"}}>
                <p style={{marginRight:"0.5%"}}>Coding by </p>   
                <Link href="https://dar-rius.github.io/portfolio/">
                    <a>
                        Mohamed
                    </a>
                </Link>
        </div>
        </footer>
    )
}
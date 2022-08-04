import Link from "next/link"

export default function Footer(){
    return(
        <footer style={{textAlign:"center", backgroundColor:"#2E86C1", color:"white", padding:"1%", fontSize:"16px", position:"absolute", bottom:0, width:"100%"}}>
            <div style={{display:"flex", justifyContent:"center"}}>
                <p style={{marginRight:"0.5%"}}>Designed by </p>   
                <Link href="https://dar-rius.github.io/portfolio/">
                    <a>
                        Mohamed
                    </a>
                </Link>
        </div>
        </footer>
    )
}
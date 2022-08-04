import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader } from 'semantic-ui-react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/header';
import styles from '../../styles/contactid.module.css'
import Person from "../../assets/personne.png"
import Footer from '../../components/footer';

const DeleteContact = ({ contact }) => {
    //variables pour confirmer et verifier la suppression du contact
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (isDeleting) {
            deleteContact();
        }
    }, [isDeleting])
    
    //Une fonction pour ouvrir le pup demandant la confirmation avant de supprimer
    const open = () => setConfirm(true);
    //Une fontion pour fermer le pup
    const close = () => setConfirm(false);

    //Une fonction qui va passer une methode pour suppimer le contact
    const deleteContact = async () => {
        const contactID = router.query.id;
        try {
            const deleted = await fetch(`http://localhost:3000/api/contacts/${contactID}`, {
                method: "Delete"
            });

            router.push("http://localhost:3000/");
        } catch (error) {
            console.log(error)
        }
    }

    // Une fonction qui va rediriger le visiteur de la plateforme vers la page d'edition du contact
    const goEdit = () =>{
        const contactID = router.query.id;
        router.push(`/${contactID}/edit`)
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    }

    return (
        <>
            <Header/>
                <div className={styles.container}>
                {isDeleting
                    ? <Loader active />
                    :
                    <>
                    <section className={styles.sec}>
                        <Image src={Person} width="110%" height="110%"/>
                        <p style={{fontSize:"18px"}}> <strong>{contact.prenom} {contact.nom}</strong></p>
                        <p style={{fontSize:"18px"}}><strong>Mobile:</strong> {contact.phone}</p>
                        <p style={{fontSize:"18px"}}> <strong>Adresse mail:</strong> {contact.email}</p>
                        <diV className={styles.bouton}>
                            <Button color='red' onClick={open}>Supprimer</Button>
                            <Button color='blue' onClick={goEdit}>Modifier</Button>
                        </diV>
                    </section>
                    
                    </>
                }
                <Confirm
                    style={{color:"black", fontSize:"18px"}}
                    content='Voulez vous vraiment supprimer ce contact ?'
                    cancelButton='Non'
                    confirmButton="Oui"
                    open={confirm}
                    onCancel={close}
                    onConfirm={handleDelete}
                />
        </div>
        <Footer/>
        </>
    )
}

DeleteContact.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/contacts/${id}`);
    const { data } = await res.json();

    return { contact: data }
}

export default DeleteContact;
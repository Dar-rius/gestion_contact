import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader } from 'semantic-ui-react';
import Link from 'next/link';
import Header from '../../components/header';
import styles from '../../styles/contactid.module.css'
import Person from "../../assets/personne.png"

const DeleteContact = ({ contact }) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isDeleting) {
            deleteContact();
        }
    }, [isDeleting])
    

    const open = () => setConfirm(true);

    const close = () => setConfirm(false);

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
                        <p style={{fontSize:"18px"}}> <strong>Nom:</strong> {contact.nom}</p>
                        <p style={{fontSize:"18px"}}> <strong>Prenom:</strong> {contact.prenom}</p>
                        <p style={{fontSize:"18px"}}><strong>Telephone:</strong> {contact.phone}</p>
                        <p style={{fontSize:"18px"}}> <strong>adresse mail:</strong> {contact.email}</p>
                        <Button color='red' onClick={open}>Supprimer</Button>
                        <Button color='blue' onClick={goEdit}>Modifier</Button>
                    </>
                }
                <Confirm
                    open={confirm}
                    onCancel={close}
                    onConfirm={handleDelete}
                />
        </div>
        </>
    )
}

DeleteContact.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/contacts/${id}`);
    const { data } = await res.json();

    return { contact: data }
}

export default DeleteContact;
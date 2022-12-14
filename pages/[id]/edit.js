import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import styles from "../../styles/ajout.module.css"
import Header from '../../components/header';
import Footer from '../../components/footer';

//page permettant de modifier les donnees d'un contact
const EditContact = ({ contact }) => {
    //les variables contenant les donnees des differents champs
    const [form, setForm] = useState({ nom: contact.nom, prenom: contact.prenom, phone: contact.phone, email: contact.email});
    
    //variable pour valider le formulaire
    const [isSubmitting, setIsSubmitting] = useState(false);

    //les variables pour pour les erreurs
    const [errors, setErrors] = useState({});

    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateForm();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    //Fonction permettant passer la methode pour mettre a jour les donnees
    const updateForm = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/contacts/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push("http://localhost:3000/");
        } catch (error) {
            console.log(error);
        }
    }

    //Focntion pour valider le formulaire et qui verifie s'il y a une erreur dans le formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    //Fonction qui verifie si les champs sont vides
    const validate = () => {
        let err = {};

        if (!form.nom) {
            err.nom = 'Votre nom est requis';
        }
        if (!form.prenom) {
            err.prenom = 'Votre prenom est requis est requis';
        }
        if (!form.phone) {
            err.phone = 'Votre numero de telephone est requis';
        }
        if (!form.email) {
            err.email = 'Votre adresse mail est requis';
        }
        return err;
    }

    return (
        <div>
            <Header/>
            
            <div >
                {
                isSubmitting
                    ? <Loader active inline='centered' />
                    : <Form onSubmit={handleSubmit} style={{marginBottom:"6.3%"}} className={styles.group_forms}>
                        <Form.Input
                            error={errors.nom ? { content: 'Votre nom est requis', pointing: 'below' } : null}
                            label='Nom'
                            placeholder='Entrez votre nom'
                            name='nom'
                            value = {form.nom}
                            onChange={handleChange}
                            width= "13"

                        />
                        <Form.Input
                            error={errors.prenom ? { content: 'Votre prenom est requis est requis', pointing: 'below' } : null}
                            label='Prenom'
                            placeholder='Entrez votre prenom'
                            name='prenom'
                            value = {form.prenom}
                            onChange={handleChange}
                            width= "13"

                        />
                        
                        <Form.Input
                            error={errors.phone ? { content: 'Votre numero de telephone est requis', pointing: 'below' } : null}
                            label="Numero de telephone"
                            placeholder='Entrez votre numero de telephone '
                            name='phone'
                            value = {form.phone}
                            onChange={handleChange}
                            width= "13"

                        />
                        <Form.Input
                            error={errors.email ? { content: 'Votre adresse mail est requis', pointing: 'below' } : null}
                            label="Adresse mail"
                            type="email"
                            placeholder='Entrez votre adresse mail'
                            name='email'
                            value = {form.email}
                            onChange={handleChange}
                            width= "13"

                        />
                        <Button 
                        color="blue"
                        size="large"
                        type='submit'
                        >
                            Modifier
                        </Button>
                    </Form>
                }
            </div>
            <Footer/>
        </div>
    )
}

EditContact.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/contacts/${id}`);
    const { data } = await res.json();

    return { contact: data }
}

export default EditContact;
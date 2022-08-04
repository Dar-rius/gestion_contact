import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import styles from "../../styles/ajout.module.css"
import Header from '../../components/header';
import Footer from '../../components/footer';


//formualire
export default function Contact(){
    //Les variables contenant les donnees des differents champs
    const [form, setForm] = useState({nom:'', prenom:'', phone:'', email:''});

    //variable pour valider le formulaire
    const [isSubmitting, setIsSubmitting] = useState(false);

    //les variables pour pour les erreurs
    const [errors, setErrors] = useState({});
    
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createContact();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    //Fonction permettant passer la methode pour creer un contact 
    const createContact = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/contacts', {
                method: 'POST',
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
            [e.target.name]: e.target.value,
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
        <section>
            <Header/>
                <div >
                    <div>
                    {
                        isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit} className={styles.group_forms} >
                            <Form.Input
                                error={errors.nom ? { content: 'Votre nom est requis', pointing: 'below' } : null}
                                label='Nom'
                                placeholder='Entrez votre nom'
                                name='nom'
                                onChange={handleChange}
                                size="large"
                                width= "10"
                            />
                            <Form.Input
                                error={errors.prenom ? { content: 'Votre prenom est requis est requis', pointing: 'below' } : null}
                                label='Prenom'
                                placeholder='Entrez votre prenom'
                                name='prenom'
                                onChange={handleChange}
                                size="large"
                                width="10"
                            />
                        
                            <Form.Input
                                error={errors.phone ? { content: 'Votre numero de telephone est requis', pointing: 'below' } : null}
                                label="Numero de telephone"
                                placeholder='Entrez votre numero de telephone '
                                name='phone'
                                onChange={handleChange}
                                size="large"
                                width="10"
                            />
                            <Form.Input
                                error={errors.email ? { content: 'Votre adresse mail est requis', pointing: 'below' } : null}
                                label="Adresse mail"
                                type="email"
                                placeholder='Entrez votre adresse mail'
                                name='email'
                                onChange={handleChange}
                                size="large"
                                width="10"
                            />

                            <Button 
                                color="blue"
                                size="large"
                                type='submit' >
                                Ajouter
                            </Button>
                        </Form>
                    }
                </div>
            </div>
        <Footer/>

        </section>
    )
}


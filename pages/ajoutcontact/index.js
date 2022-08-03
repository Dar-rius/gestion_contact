import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';

//formualire
export default function Contact(){
    const [form, setForm] = useState({nom:'', prenom:'', phone:'', email:''});
    const [isSubmitting, setIsSubmitting] = useState(false);
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
            <div className="form-container">
            <h1>Ajoter des un contact</h1>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.nom ? { content: 'Votre nom est requis', pointing: 'below' } : null}
                                label='Nom'
                                placeholder='Entrez votre nom'
                                name='nom'
                                onChange={handleChange}
                            />
                            <Form.Input
                                fluid
                                error={errors.prenom ? { content: 'Votre prenom est requis est requis', pointing: 'below' } : null}
                                label='Prenom'
                                placeholder='Entrez votre prenom'
                                name='prenom'
                                onChange={handleChange}
                            />
                           
                            <Form.Input
                                fluid
                                error={errors.phone ? { content: 'Votre numero de telephone est requis', pointing: 'below' } : null}
                                label="Numero de telephone"
                                placeholder='Entrez votre numero de telephone '
                                name='phone'
                                onChange={handleChange}
                            />
                            <Form.Input
                                fluid
                                error={errors.email ? { content: 'Votre adresse mail est requis', pointing: 'below' } : null}
                                label="Adresse mail"
                                type="email"
                                placeholder='Entrez votre adresse mail'
                                name='email'
                                onChange={handleChange}
                            />

                            <Button type='submit'>Creer</Button>
                        </Form>
                }
            </div>
        </div>
    )
}


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
            router.push("http://localhost:3000/accueil");
        } catch (error) {
            console.log(error);
        }
    }
      
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
            err.prenom = 'votre prenom est requis est requis';
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
            <h1>Creer un projet</h1>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.nom}
                                label='Le nom'
                                placeholder='Entrez votre nom'
                                name='nom'
                                onChange={handleChange}
                            />
                            <Form.Input
                                fluid
                                error={errors.prenom}
                                label='Le prenom'
                                placeholder='Entrez votre prenom'
                                name='prenom'
                                onChange={handleChange}
                            />
                            <Form.Input
                                fluid
                                label='numero de telephone'
                                placeholder='Entrez votre numero'
                                name='phone'
                                error={errors.phone}
                                onChange={handleChange}
                            />
                            <Form.Input
                                fluid
                                label='Adresse mail'
                                placeholder='Entrez votre adresse mail'
                                name='emalil'
                                type='email'
                                error={errors.resume }
                                onChange={handleChange}
                            />

                            <Button type='submit'>Creer</Button>
                        </Form>
                }
            </div>
        </div>
    )
}


import dbConnexion from '../../../utils/mongodb';
import Contact from '../../../models/Contact'

dbConnexion();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        //Afficher les contacts 
        case 'GET':
            try {
                const contacts = await Contact.find({});

                res.status(200).json({ success: true, data: contacts })
            } catch (error) {
                res.status(400).json({ success: false });
            }
        break;

        // Creer un contact lorsqu'une methode post passe
        case 'POST':
            try {
                const contacts = await Contact.create(req.body);

                res.status(201).json({ success: true, data: contacts })

            } catch (error) {
                res.status(400).json({ success: false });
            }
        break;
        default:
            res.status(400).json({ success: false });
        break;
    }
}
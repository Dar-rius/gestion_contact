import Contact from '../../../models/Contact'
import dbConnexion from '../../../utils/mongodb';

dbConnexion();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        //Afficher les donnees du contact
        case 'GET':
            try {
                const contact = await Contact.findById(id);

                if (!contact) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: contact });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        //Mettre a jour les donnees du contact
        case 'PUT':
            try {
                const contact = await Contact.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if (!contact) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: contact });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        //Supprimer le contact
        case 'DELETE':
            try {
                const deletedcontact = await Contact.deleteOne({ _id: id });

                if (!deletedcontact) {
                    return res.status(400).json({ success: false })
                }

                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}
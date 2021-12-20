import { validateParams } from "../../utils/index.js";
import ContactsRepository from "../repositories/ContactRepository.js";

class ContactController {
  async index(req, res) {
    const { orderBy } = req.query;
    const contacts = await ContactsRepository.findAll(orderBy);
    res.status(200).json(contacts);
  }

  async show(req, res) {
    const { id } = req.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json(contact);
  }

  async store(req, res) {
    const { name, email, phone, category_id } = req.body;

    const paramsSchema = {
      name: "",
    };

    const errors = validateParams(req.body, paramsSchema);

    if (errors) {
      return res.status(422).json({ errors: errors });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return res.status(404).json({ error: "Email has already been taken" });
    }
    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id,
    });
    res.status(200).json(contact);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, email, phone, category_id } = req.body;

    const paramsSchema = {
      name: "",
    };

    const errors = validateParams(req.body, paramsSchema);

    if (errors) {
      return res.status(422).json({ errors: errors });
    }

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return res.status(404).json({ error: "Contact not found" });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      return res
        .status(400)
        .json({ error: "Incosistency between email sended" });
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });
    res.status(200).json(contact);
  }

  async delete(req, res) {
    const { id } = req.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    await ContactsRepository.delete(id);
    res.sendStatus(204);
  }
}

// Singleton
export default new ContactController();

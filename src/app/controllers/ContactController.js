import { isValidUUID } from "../../utils/isValidUUID.js";
import { validateParams } from "../../utils/validateParams.js";
import ContactsRepository from "../repositories/ContactRepository.js";

class ContactController {
  async index(req, res) {
    const { orderBy } = req.query;
    const contacts = await ContactsRepository.findAll(orderBy);
    res.status(200).json(contacts);
  }

  async show(req, res) {
    const { id } = req.params;

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: "Invalid contact id" });
    }

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

    if (category_id && !isValidUUID(category_id)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    if (email) {
      const contactExists = await ContactsRepository.findByEmail(email);

      if (contactExists) {
        return res.status(404).json({ error: "Email has already been taken" });
      }
    }

    const contact = await ContactsRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
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

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: "Invalid contact id" });
    }

    if (category_id && !isValidUUID(category_id)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return res.status(404).json({ error: "Contact not found" });
    }

    if (email) {
      const contactByEmail = await ContactsRepository.findByEmail(email);

      if (contactByEmail && contactByEmail.id !== id) {
        return res
          .status(400)
          .json({ error: "Incosistency between email sended" });
      }
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });
    res.status(200).json(contact);
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: "Invalid contact id" });
    }

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

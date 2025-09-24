import { Request, Response } from "express";
import Event from "../models/eventModel";

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar eventos", error });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, date, location } = req.body;

    const newEvent = await Event.create({ title, description, date, location });

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar evento", error });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar evento", error });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    res.status(200).json({ message: "Evento excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar evento", error });
  }
};

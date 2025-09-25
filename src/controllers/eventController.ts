import { Request, Response } from "express";
import Event from "../models/eventModel";

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find({});
    res.status(200).json(events);
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  console.log("DADOS RECEBIDOS NO CONTROLLER:", req.body); // Adicione esta linha
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error: any) {
    console.error("Erro detalhado ao criar evento:", error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: "Dados inválidos. Verifique os campos obrigatórios.", details: error.errors });
    }
    
    res.status(500).json({ message: "Erro interno ao criar evento." });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { 
      new: true,
      runValidators: true 
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }
    res.status(200).json(updatedEvent);
  } catch (error: any) {
    console.error("Erro detalhado ao atualizar evento:", error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: "Dados inválidos para atualização.", details: error.errors });
    }

    res.status(500).json({ message: "Erro interno ao atualizar evento." });
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
    console.error("Erro detalhado ao deletar evento:", error);
    res.status(500).json({ message: "Erro interno ao deletar evento." });
  }
};
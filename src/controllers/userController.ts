// /server/src/controllers/userController.ts
import { Request, Response } from 'express';
import User from '../models/User';
import { Clerk } from '@clerk/clerk-sdk-node';

const clerkClient = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export const syncUser = async (req: Request, res: Response) => {
  console.log("Controller syncUser iniciado. ---");

  try {
    const { userId } = req.auth;
    if (!userId) {
      console.error("ERRO: userId não foi encontrado em req.auth.");
      return res.status(400).json({ message: 'Clerk ID não encontrado' });
    }

    console.log(`Procurando no MongoDB por um usuário com Clerk ID: ${userId}`);
    let userInDb = await User.findOne({ clerkId: userId });
    console.log("Busca no MongoDB concluída.");

    if (userInDb) {
      console.log("Usuário já existe. Enviando resposta de sucesso.");
      return res.status(200).json(userInDb);
    }

    console.log("LOG 5: Usuário não encontrado no DB. Buscando dados na API do Clerk...");
    const clerkUser = await clerkClient.users.getUser(userId);
    console.log("Dados do Clerk recebidos com sucesso.");

    const newUser = new User({
      clerkId: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
      name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
      role: 'user'
    });

    console.log("LOG 7: Salvando novo usuário no MongoDB...");
    await newUser.save();
    console.log("Usuário salvo com sucesso!");
    
    return res.status(201).json(newUser);

  } catch (error) {
    console.error("LOG DE ERRO no controller syncUser ---", error);
    return res.status(500).json({ message: 'Erro interno ao sincronizar usuário.' });
  }
};
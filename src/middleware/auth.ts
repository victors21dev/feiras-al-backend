// /server/src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { Clerk } from '@clerk/clerk-sdk-node';

const clerkClient = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export const syncUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.auth;

  try {
    let userInDb = await User.findOne({ clerkId: userId });

    if (!userInDb) {
      console.log(`Sincronizando novo usuário: ${userId}`);
      const clerkUser = await clerkClient.users.getUser(userId);
      
      const newUser = new User({
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress,
        name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
        role: 'user'
      });
      await newUser.save();
    }
    next();

  } catch (error) {
    console.error("Erro ao sincronizar usuário:", error);
    return res.status(500).json({ message: 'Erro interno ao sincronizar usuário.' });
  }
};
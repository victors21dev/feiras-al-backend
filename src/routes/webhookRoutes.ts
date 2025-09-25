import { Router } from 'express';
import { Webhook } from 'svix';
import bodyParser from 'body-parser';
import User from '../models/User';
import { WebhookEvent } from '@clerk/clerk-sdk-node';

const router = Router();
router.post(
  '/clerk',
  bodyParser.raw({ type: 'application/json' }),
  async (req, res) => {
    console.log('LOG 0: Rota de webhook foi atingida!');
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
      return res.status(500).send('Webhook secret não configurado no .env');
    }
    const headers = req.headers;
    const payload = req.body;
    const svix_id = headers["svix-id"] as string;
    const svix_timestamp = headers["svix-timestamp"] as string;
    const svix_signature = headers["svix-signature"] as string;

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).send("Faltando headers do svix");
    }

    const wh = new Webhook(WEBHOOK_SECRET); 

    let evt: WebhookEvent;
    try {
      evt = wh.verify(payload, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
      console.log('LOG 1: Webhook verificado com sucesso!');
    } catch (err) {
      console.error('ERRO NA VERIFICAÇÃO:', err);
      return res.status(400).send('Erro na verificação');
    }

    const eventType = evt.type;
    console.log(`LOG 2: Tipo de evento recebido: ${eventType}`);

    if (eventType === 'user.created') {
      console.log('LOG 3: Entrou no bloco user.created.');

      try {
        const { id, email_addresses, first_name, last_name } = evt.data;
        
        const newUser = new User({
          clerkId: id,
          email: email_addresses[0].email_address,
          name: `${first_name || ''} ${last_name || ''}`.trim(),
          role: 'user'
        });

        await newUser.save();
        console.log(`LOG 4: Usuário ${id} salvo no MongoDB com sucesso!`);

        return res.status(201).json({ message: 'Usuário criado com sucesso' });

      } catch (dbError) {
        console.error('LOG 5: ERRO AO SALVAR NO BANCO DE DADOS!', dbError);
        return res.status(500).json({ error: 'Erro ao salvar usuário no banco' });
      }
    }
    
    return res.status(200).send('Webhook processado para outro tipo de evento.');
  }
);

export default router;
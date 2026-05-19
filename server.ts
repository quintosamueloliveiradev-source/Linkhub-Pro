import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Permite parse de JSON no Body (Necessário para Webhooks e API)
  app.use(express.json());

  // ==========================================
  // 🚀 API ROUTES (BACKEND)
  // Mimetiza a estrutura do Next.js App Router API
  // ==========================================

  const apiRouter = express.Router();

  // /api/stripe/webhook
  apiRouter.post("/stripe/webhook", async (req, res) => {
    // Implementar verificação de assinatura do Stripe
    // const sig = req.headers['stripe-signature'];
    // const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    
    // Simulação: atualiza usuário para plano PRO no Supabase via Service Role Key
    console.log("Stripe Event recebido", req.body);
    res.json({ received: true });
  });

  // /api/pix/create
  apiRouter.post("/pix/create", async (req, res) => {
    const { userId, planId } = req.body;
    // Simulação: Chamada à API de banco / MercadoPago
    // Retorna string EMV (Copia e Cola)
    const emvString = "00020126440014br.gov.bcb.pix0122sua-chave-pix-aqui5204000053039865802BR5911LinkVibe Pro6009Sao Paulo62070503***6304EE88";
    res.json({ 
      success: true, 
      qrCodeString: emvString,
      paymentId: "pix_simulado_123" 
    });
  });

  // /api/domain/verify
  apiRouter.post("/domain/verify", async (req, res) => {
    // Lógica para verificar CNAME record
    res.json({ verified: true, domain: req.body.domain });
  });

  app.use("/api", apiRouter);

  // ==========================================
  // ⚙️ VITE MIDDLEWARE (FRONTEND & SPA ROUTING)
  // ==========================================
  
  if (process.env.NODE_ENV !== "production") {
    // Mode de Desenvolvimento
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Modo Produção
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // SPA Fallback para React Router
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 LinkVibe SaaS Server rodando na porta ${PORT}`);
  });
}

startServer();

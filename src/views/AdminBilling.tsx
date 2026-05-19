import { useState } from 'react';
import { CreditCard, QrCode, CheckCircle2, Zap, Star } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export function AdminBilling() {
  const [method, setMethod] = useState<'stripe'|'pix'>('stripe');
  const [pixStatus, setPixStatus] = useState<'idle'|'generated'|'paid'>('idle');
  const [pixCode, setPixCode] = useState('');
  const [billingCycle, setBillingCycle] = useState<'monthly'|'annual'>('annual');

  const generatePix = async () => {
    // Simulando request pra API Node.js/Backend (nós criamos no server.ts)
    setPixStatus('generated');
    const res = await fetch('/api/pix/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: '123', planId: 'PRO' })
    });
    const data = await res.json();
    setPixCode(data.qrCodeString);
    
    // Simular pagamento automático após 5s
    setTimeout(() => {
      setPixStatus('paid');
    }, 5000);
  };

  const isAnnual = billingCycle === 'annual';
  const price = isAnnual ? '19' : '29';
  const oldPrice = isAnnual ? '29' : '';

  return (
    <div className="w-full max-w-[800px] mx-auto py-8 md:py-12 flex flex-col gap-8 pb-32">
      <div>
        <h2 className="font-display text-4xl font-extrabold text-brand-slate tracking-tight mb-2">Assinatura PRO</h2>
        <p className="font-sans text-lg text-gray-500">Faça upgrade e desbloqueie links ilimitados, analytics completo e domínio próprio.</p>
      </div>

      <div className="bg-white rounded-[24px] p-6 md:p-8 border-2 border-brand-lime relative overflow-hidden shadow-sm">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-lime rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        {/* Toggle Billing Cycle */}
        <div className="flex justify-center mb-8 relative z-10">
          <div className="bg-surface-high p-1 rounded-full inline-flex relative">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full font-display font-bold text-sm transition-all ${!isAnnual ? 'bg-white shadow-sm text-brand-slate' : 'text-gray-500 hover:text-brand-slate'}`}
            >
              Mensal
            </button>
            <button 
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full font-display font-bold text-sm transition-all flex items-center gap-2 ${isAnnual ? 'bg-white shadow-sm text-brand-slate' : 'text-gray-500 hover:text-brand-slate'}`}
            >
              Anual <span className="bg-brand-lime text-brand-slate text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest hidden sm:inline-block">Economize 35%</span>
            </button>
            
            {/* Flutuante de desconto para mobile */}
            <div className="absolute -top-3 -right-2 sm:hidden">
              <span className="bg-brand-lime text-brand-slate text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest block transform rotate-12">
                -35%
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 relative z-10">
          <div>
            <h3 className="font-display text-3xl font-bold flex items-center gap-2 text-brand-slate">
              LinkHub Pro <Zap size={24} className="text-brand-violet fill-brand-violet" />
            </h3>
            <p className="text-gray-500 mt-2 font-sans">{isAnnual ? 'Cobrado anualmente (R$ 228/ano). Cancele quando quiser.' : 'Cobrado mensalmente. Cancele quando quiser.'}</p>
          </div>
          <div className="text-left md:text-right flex flex-col items-start md:items-end">
            {isAnnual && <span className="text-sm text-gray-400 line-through font-bold mb-1">R$ {oldPrice}/mês</span>}
            <p className="font-display text-5xl font-black text-brand-slate">R$ {price}<span className="text-xl text-gray-500 font-medium">/mês</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <FeatureItem text="Links ilimitados e blocos avançados" />
          <FeatureItem text="Analytics detalhado (Globais e Referências)" />
          <FeatureItem text="Domínio personalizado (seu-nome.com)" />
          <FeatureItem text="Remover logo do LinkHub no rodapé" />
          <FeatureItem text="Banners, Capas e Animações de botões" />
          <FeatureItem text="Atendimento e Suporte prioritário" />
        </div>

        <div className="border-t border-brand-lavender pt-8 mt-4 relative z-10">
          <h4 className="font-display text-lg font-bold mb-4">Escolha a forma de pagamento</h4>
          
          <div className="flex gap-4 mb-6">
            <PaymentTab 
              active={method === 'stripe'} 
              onClick={() => setMethod('stripe')} 
              icon={<CreditCard size={20} />} 
              label="Cartão de Crédito"
            />
            <PaymentTab 
              active={method === 'pix'} 
              onClick={() => setMethod('pix')} 
              icon={<QrCode size={20} />} 
              label="Pix (Aprovação Rápida)"
            />
          </div>

          {method === 'stripe' && (
            <div className="bg-surface-low p-6 rounded-2xl flex flex-col items-center text-center">
              <Zap size={40} className="text-brand-violet mb-4" />
              <h5 className="font-display text-xl font-bold mb-2">Checkout Seguro via Stripe</h5>
              <p className="text-gray-500 text-sm max-w-sm mb-6">Ao prosseguir, você será redirecionado para a página de pagamento segura da Stripe para processar sua assinatura.</p>
              <button 
                onClick={() => { alert('Redirecionando para o Stripe Checkout (Simulação)') }}
                className="px-8 py-4 w-full md:w-auto rounded-full bg-brand-slate text-white font-display font-bold hover:scale-105 transition-transform flex justify-center items-center gap-2 shadow-lg"
              >
                <CreditCard size={18} /> Continuar para Pagamento
              </button>
            </div>
          )}

          {method === 'pix' && (
            <div className="bg-surface-low p-6 rounded-2xl flex flex-col items-center text-center border-2 border-[#32BCAD] bg-[#E8F8F6]">
              {pixStatus === 'idle' && (
                <>
                  <div className="w-16 h-16 rounded-full bg-[#32BCAD]/20 flex items-center justify-center text-[#32BCAD] mb-4">
                    <QrCode size={32} />
                  </div>
                  <h5 className="font-display text-xl font-bold mb-2 text-slate-800">Assinar com Pix</h5>
                  <p className="text-gray-600 text-sm max-w-sm mb-6">A liberação do seu acesso PRO será imediata após a confirmação do pagamento.</p>
                  <button onClick={generatePix} className="px-8 py-4 w-full md:w-auto rounded-full bg-[#32BCAD] text-white font-display font-bold hover:scale-105 transition-transform shadow-lg">
                    Gerar Pix Copia e Cola
                  </button>
                </>
              )}

              {pixStatus === 'generated' && (
                <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                  <div className="bg-white p-4 rounded-2xl shadow-sm mb-4 border border-gray-200">
                    <QRCodeSVG value={pixCode} size={200} />
                  </div>
                  <p className="font-display font-bold text-slate-800 mb-2">Escaneie o QR Code no seu banco</p>
                  <p className="text-sm text-gray-500 mb-4 max-w-xs">Aguardando pagamento... Não feche esta tela.</p>
                  <div className="w-full max-w-sm p-3 bg-white rounded-xl border-2 border-brand-lavender truncate select-all cursor-copy text-sm text-gray-600 font-mono text-center">
                    {pixCode}
                  </div>
                </div>
              )}

              {pixStatus === 'paid' && (
                <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500 text-[#32BCAD]">
                  <CheckCircle2 size={64} className="mb-4 text-[#32BCAD] animate-bounce" />
                  <h5 className="font-display text-2xl font-bold mb-2">Pagamento Confirmado!</h5>
                  <p className="text-gray-600 font-medium">Seu plano LinkHub Pro foi ativado com sucesso. Bem-vindo!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 bg-surface-low p-2 rounded-lg">
      <CheckCircle2 size={20} className="text-brand-violet shrink-0" />
      <span className="font-sans text-brand-slate text-sm font-medium">{text}</span>
    </div>
  );
}

function PaymentTab({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-2 py-4 px-4 rounded-xl font-display font-bold transition-all border-2 ${
        active 
          ? 'border-brand-violet bg-brand-violet/5 text-brand-violet shadow-sm' 
          : 'border-brand-lavender bg-white text-gray-500 hover:border-brand-lavender/80'
      }`}
    >
      {icon} <span className="text-xs sm:text-base text-center">{label}</span>
    </button>
  );
}

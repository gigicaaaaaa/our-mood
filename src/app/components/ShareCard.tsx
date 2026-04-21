import { motion } from 'motion/react';
import { GlassCard } from './GlassCard';
import { GlassButton } from './GlassButton';
import { Share2, Heart, Link2, Download } from 'lucide-react';
import { useState } from 'react';

export function ShareCard() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    // In a real app, this would copy the actual sharing link
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    // In a real app, this would export the stats as PDF or image
    alert('Funcionalidade de exportação em desenvolvimento! 💕');
  };

  return (
    <GlassCard hoverable={false}>
      <div className="text-center space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff006e] to-[#fb5607] mb-4 shadow-[0_0_40px_rgba(255,0,110,0.4)]">
            <Heart className="w-8 h-8 text-white" fill="currentColor" />
          </div>
        </motion.div>

        <div>
          <h3 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Compartilhe suas estatísticas 💕
          </h3>
          <p className="text-white/60 max-w-md mx-auto">
            Compartilhe este dashboard com seu namorado ou qualquer pessoa especial!
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <GlassButton variant="primary" onClick={handleCopyLink}>
            {copied ? (
              <>
                ✓ Link Copiado!
              </>
            ) : (
              <>
                <Link2 className="w-5 h-5 inline mr-2" />
                Copiar Link
              </>
            )}
          </GlassButton>

          <GlassButton variant="secondary" onClick={handleExport}>
            <Download className="w-5 h-5 inline mr-2" />
            Exportar PDF
          </GlassButton>

          <GlassButton variant="secondary">
            <Share2 className="w-5 h-5 inline mr-2" />
            Compartilhar
          </GlassButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-2xl mb-1">🔗</div>
            <p className="text-sm text-white/80 mb-1">Link Direto</p>
            <p className="text-xs text-white/50">Compartilhe o link desta página</p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-2xl mb-1">📸</div>
            <p className="text-sm text-white/80 mb-1">Screenshot</p>
            <p className="text-xs text-white/50">Tire prints das suas stats</p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-2xl mb-1">💾</div>
            <p className="text-sm text-white/80 mb-1">Exportar</p>
            <p className="text-xs text-white/50">Salve como PDF ou imagem</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#ff006e]/10 to-[#8338ec]/10 rounded-xl p-4 border border-white/10">
          <p className="text-sm text-white/70">
            <strong className="text-[#ff006e]">Dica:</strong> Seus dados são privados e só são visíveis para quem tem o link.
            Você pode atualizar suas estatísticas a qualquer momento fazendo upload de novos dados do Discord!
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

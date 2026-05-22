import { useEffect, useState } from 'react';
import './App.css';
import mayaraPhoto from './assets/img/Mayara.png';
import mayara01Photo from './assets/img/Mayara1.png';

/* ─── Constantes ─────────────────────────────────────── */
const WA_NUMBER = '557998043956';
const WA_MSG    = encodeURIComponent('Olá, Mayra! Vim pelo seu site e gostaria de falar sobre um projeto de arquitetura/interiores. Pode me ajudar?');
const WA_URL    = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;
const IG_URL    = 'https://www.instagram.com/mayralima.arq/';

/* ─── import.meta.glob: carrega Screenshot_*.png de assets/img ─ */
const imgModules = import.meta.glob('/src/assets/img/Screenshot_*.png', { eager: true });
const portfolioImages = Object.entries(imgModules)
  .sort(([a], [b]) => {
    const n = (s) => parseInt(s.match(/Screenshot_(\d+)/)?.[1] ?? '0', 10);
    return n(a) - n(b);
  })
  .map(([, m]) => m.default);

/* ─── Hook: reveal suave com stagger ao entrar na viewport ─ */
function useReveal() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const els = document.querySelectorAll('[data-reveal]');

      /* Stagger automático por grupo de irmãos */
      const groups = new Map();
      els.forEach(el => {
        const parent = el.parentElement;
        const idx = (groups.get(parent) ?? -1) + 1;
        groups.set(parent, idx);
        if (!el.style.transitionDelay) {
          el.style.transitionDelay = `${idx * 80}ms`;
        }
      });

      const io = new IntersectionObserver(
        (entries) => entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
            io.unobserve(e.target);
          }
        }),
        { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
      );
      els.forEach(el => io.observe(el));
      return () => io.disconnect();
    }, 100);
    return () => clearTimeout(timer);
  }, []);
}

/* ─── Ícone WhatsApp ─────────────────────────────────── */
function IconWA({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

/* ─── Ícone Instagram ────────────────────────────────── */
function IconIG({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
═══════════════════════════════════════════════════════ */
export default function LandingPage() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [lightbox, setLightbox]   = useState(null); // índice da imagem aberta

  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Fecha menu ao redimensionar para desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* Fecha lightbox com ESC */
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  /* ── RENDER ─────────────────────────────────────────── */
  return (
    <div className="lp">

      {/* ── NAV ──────────────────────────────────────── */}
      <nav className={`lp-nav ${scrolled ? 'lp-nav--scrolled' : ''}`} role="navigation">
        <div className="lp-nav__inner">
          <div className="lp-nav__logo" onClick={() => scrollTo('inicio')} aria-label="Início">
            <span className="lp-nav__logo-name">Mayra Lima</span>
            <span className="lp-nav__logo-sub">Arquitetura</span>
          </div>

          <div className={`lp-nav__links ${menuOpen ? 'lp-nav__links--open' : ''}`}>
            <button onClick={() => scrollTo('sobre')}>Sobre</button>
            <button onClick={() => scrollTo('projetos')}>Projetos</button>
            <button onClick={() => scrollTo('contato')}>Contato</button>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="lp-nav__mobile-cta">
              <IconWA size={16} /> Fale Conosco
            </a>
          </div>

          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="lp-nav__cta">
            <IconWA size={16} /> Fale Conosco
          </a>

          <button
            className={`lp-nav__hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────── */}
      <section id="inicio" className="lp-hero">
        <div className="lp-hero__grid-bg" aria-hidden="true" />
        <div className="lp-container lp-hero__inner">

          {/* Coluna de texto */}
          <div className="lp-hero__content">
            <p className="lp-hero__eyebrow" data-reveal>
              <span className="lp-gold-line" /> Arquitetura Autoral · Sergipe
            </p>
            <h1 className="lp-hero__title" data-reveal>
              Espaços que contam<br /><em>a sua história</em>
            </h1>
            <p className="lp-hero__desc" data-reveal>
              Design de interiores exclusivo que une beleza,<br className="lp-br-md" />
              funcionalidade e identidade própria.
            </p>
            <div className="lp-hero__actions" data-reveal>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="lp-btn lp-btn--gold">
                <IconWA /> Fale pelo WhatsApp
              </a>
              <button onClick={() => scrollTo('projetos')} className="lp-btn lp-btn--outline">
                Ver Projetos
              </button>
            </div>
          </div>

          {/* Foto da arquiteta */}
          <div className="lp-hero__photo-wrap" data-reveal>
            <div className="lp-hero__photo-frame">
              <img src={mayaraPhoto} alt="Mayra Lima — Arquiteta" className="lp-hero__photo" />
              <div className="lp-hero__photo-badge">
                <span className="lp-hero__photo-badge-name">Mayra Lima</span>
                <span className="lp-hero__photo-badge-role">Arquiteta &amp; Designer de Interiores</span>
              </div>
            </div>
            <div className="lp-hero__photo-deco" aria-hidden="true" />
          </div>

        </div>

        <div className="lp-hero__deco" aria-hidden="true">
          <div className="lp-hero__deco-line" />
          <p className="lp-hero__deco-text">Role para ver</p>
        </div>
      </section>

      {/* ── SOBRE ────────────────────────────────────── */}
      <section id="sobre" className="lp-about">
        <div className="lp-container lp-about__inner">

          <div className="lp-about__text" data-reveal>
            <span className="lp-label">Sobre a arquiteta</span>
            <h2 className="lp-title">Arquitetura com alma<br />e identidade</h2>
            <p>
              Mayra Lima é arquiteta especializada em design de interiores autoral,
              criando ambientes que refletem a personalidade e o estilo de vida de cada cliente.
              Com olhar apurado e sensibilidade estética, ela transforma espaços
              em experiências únicas e memoráveis.
            </p>
            <p>
              Com projetos que vão de residências sofisticadas a ambientes comerciais vibrantes,
              Mayra une técnica e criatividade para entregar resultados que surpreendem.
              Profissional reconhecida no cenário sergipano, participa da{' '}
              <strong>Casa Cor Sergipe</strong> — uma das mais importantes plataformas
              de arquitetura e design das Américas.
            </p>
            <div className="lp-about__highlights">
              {[
                { num: '+100',    label: 'Projetos entregues' },
                { num: 'Sergipe', label: 'e região' },
                { num: 'Casa Cor', label: 'Participante' },
              ].map(h => (
                <div key={h.num} className="lp-about__highlight">
                  <span className="lp-about__hl-num">{h.num}</span>
                  <span className="lp-about__hl-label">{h.label}</span>
                </div>
              ))}
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="lp-btn lp-btn--gold-sm">
              Iniciar meu projeto
            </a>
          </div>

          <div className="lp-about__quote-side" data-reveal>
            {/* Foto acima do quote */}
            <div className="lp-about__side-photo-wrap">
              <img src={mayara01Photo} alt="Mayra Lima" className="lp-about__side-photo" />
              <div className="lp-about__side-photo-deco" aria-hidden="true" />
            </div>

            <div className="lp-quote-card">
              <span className="lp-quote-mark">"</span>
              <p className="lp-quote-text">
                Cada espaço tem uma história a contar.<br />Meu trabalho é dar voz a ela com elegância e autenticidade.
              </p>
              <span className="lp-quote-author">— Mayra Lima</span>
            </div>

            {/* Caixa dourada do telefone */}
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="lp-about__phone-gold">
              <div className="lp-about__phone-gold-icon">
                <IconWA size={20} />
              </div>
              <div className="lp-about__phone-gold-text">
                <span className="lp-about__phone-gold-label">WhatsApp</span>
                <span className="lp-about__phone-gold-num">(79) 99804-3956</span>
              </div>
              <svg className="lp-about__phone-gold-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </a>
          </div>

        </div>
      </section>

      {/* ── ESPECIALIDADES ───────────────────────────── */}
      <section className="lp-services">
        <div className="lp-container">
          <span className="lp-label lp-label--light center" data-reveal>Especialidades</span>
          <h2 className="lp-title lp-title--light center" data-reveal>O que fazemos</h2>
          <div className="lp-services__grid">
            {[
              {
                symbol: '⌂',
                title: 'Projetos Residenciais',
                desc: 'Lares que acolhem e encantam. Criamos residências que refletem quem você é, com sofisticação e funcionalidade.',
                delay: '0ms',
              },
              {
                symbol: '◈',
                title: 'Ambientes Comerciais',
                desc: 'Restaurantes, clínicas, escritórios — cada espaço projetado para fortalecer a identidade da sua marca.',
                delay: '100ms',
              },
              {
                symbol: '✦',
                title: 'Design de Interiores',
                desc: 'Iluminação, mobiliário, materiais e texturas. Cada detalhe cuidadosamente curado para criar a atmosfera ideal.',
                delay: '200ms',
              },
            ].map(s => (
              <div
                key={s.title}
                className="lp-service-card"
                data-reveal
                style={{ transitionDelay: s.delay }}
              >
                <span className="lp-service-card__symbol">{s.symbol}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="lp-service-card__bar" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFÓLIO ────────────────────────────────── */}
      <section id="projetos" className="lp-portfolio">
        <div className="lp-container">
          <span className="lp-label center" data-reveal>Portfólio</span>
          <h2 className="lp-title center" data-reveal>Nossos Projetos</h2>
          <p className="lp-portfolio__sub" data-reveal>
            Uma seleção dos trabalhos que definem nossa identidade criativa.
          </p>
        </div>

        <div className="lp-portfolio__grid">
          {portfolioImages.length > 0
            ? portfolioImages.map((src, i) => (
                <button
                  key={i}
                  className={`lp-portfolio__item ${i % 7 === 0 ? 'wide' : ''} ${i % 9 === 3 ? 'tall' : ''}`}
                  data-reveal
                  onClick={() => setLightbox(i)}
                  aria-label={`Abrir projeto ${i + 1}`}
                  style={{ transitionDelay: `${(i % 4) * 60}ms` }}
                >
                  <img src={src} alt={`Projeto ${i + 1}`} loading="lazy" />
                  <div className="lp-portfolio__overlay">
                    <span>Ver projeto</span>
                  </div>
                </button>
              ))
            : /* Placeholders quando não há imagens */
              Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className={`lp-portfolio__item lp-portfolio__item--placeholder ${i % 7 === 0 ? 'wide' : ''}`}
                  data-reveal
                >
                  <div className="lp-portfolio__placeholder-inner">
                    <span>Projeto {i + 1}</span>
                  </div>
                </div>
              ))
          }
        </div>

        <div className="lp-portfolio__cta" data-reveal>
          <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="lp-btn lp-btn--ig">
            <IconIG /> Conheça mais projetos no Instagram
          </a>
        </div>
      </section>

      {/* ── CTA CONTATO ──────────────────────────────── */}
      <section id="contato" className="lp-cta">
        <div className="lp-cta__deco-line" aria-hidden="true" />
        <div className="lp-container lp-cta__inner" data-reveal>
          <span className="lp-label">Vamos conversar</span>
          <h2 className="lp-title">
            Pronto para transformar<br /><em>o seu espaço?</em>
          </h2>
          <p>
            Conte-nos sobre o seu projeto. Cada ideia é o ponto de partida
            para algo extraordinário.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="lp-btn lp-btn--gold lp-btn--lg">
            <IconWA size={24} /> Iniciar conversa agora
          </a>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer className="lp-footer">
        <div className="lp-container lp-footer__inner">
          <div className="lp-footer__brand">
            <p className="lp-footer__name">Mayra Lima Arquitetura</p>
            <p className="lp-footer__sub">Design de Interiores · Sergipe</p>
          </div>
          <div className="lp-footer__links">
            <a href={IG_URL} target="_blank" rel="noopener noreferrer">
              <IconIG size={18} /> Instagram
            </a>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer">
              <IconWA size={18} /> WhatsApp
            </a>
          </div>
          <p className="lp-footer__copy">
            © {new Date().getFullYear()} Mayra Lima Arquitetura. Todos os direitos reservados.
          </p>
          <p className="lp-footer__dev">
            Desenvolvido por{' '}
            <a
              href="https://heverecstudiocode.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="lp-footer__dev-link"
            >
              Heverec Studio Code
            </a>
          </p>
        </div>
      </footer>

      {/* ── WHATSAPP FAB ─────────────────────────────── */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="lp-wa-fab"
        aria-label="Conversar no WhatsApp"
      >
        <span className="lp-wa-fab__pulse" aria-hidden="true" />
        <IconWA size={28} />
        <span className="lp-wa-fab__label">Fale conosco</span>
      </a>

      {/* ── LIGHTBOX ─────────────────────────────────── */}
      {lightbox !== null && portfolioImages.length > 0 && (
        <div
          className="lp-lightbox"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Visualizar projeto"
        >
          <button
            className="lp-lightbox__close"
            onClick={() => setLightbox(null)}
            aria-label="Fechar"
          >✕</button>
          <button
            className="lp-lightbox__prev"
            onClick={(e) => { e.stopPropagation(); setLightbox(i => (i - 1 + portfolioImages.length) % portfolioImages.length); }}
            aria-label="Anterior"
          >‹</button>
          <img
            src={portfolioImages[lightbox]}
            alt={`Projeto ${lightbox + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lp-lightbox__next"
            onClick={(e) => { e.stopPropagation(); setLightbox(i => (i + 1) % portfolioImages.length); }}
            aria-label="Próximo"
          >›</button>
          <p className="lp-lightbox__counter">{lightbox + 1} / {portfolioImages.length}</p>
        </div>
      )}

    </div>
  );
}
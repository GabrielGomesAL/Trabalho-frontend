import { X } from "lucide-react";
import { useEffect, useRef } from "react";

const SELETOR_FOCO =
  'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

export default function Modal({ children, descricaoId, onClose, title, titleId }) {
  const painelRef = useRef(null);

  useEffect(() => {
    const focoAnterior = document.activeElement;
    const overflowAnterior = document.body.style.overflow;
    const painel = painelRef.current;

    document.body.style.overflow = "hidden";
    painel?.querySelector("[data-autofocus]")?.focus();

    function tratarTeclado(evento) {
      if (evento.key === "Escape") {
        evento.preventDefault();
        onClose();
        return;
      }

      if (evento.key !== "Tab" || !painel) {
        return;
      }

      const elementos = [...painel.querySelectorAll(SELETOR_FOCO)].filter(
        (elemento) => elemento.offsetParent !== null,
      );

      if (elementos.length === 0) {
        return;
      }

      const primeiro = elementos[0];
      const ultimo = elementos[elementos.length - 1];

      if (evento.shiftKey && document.activeElement === primeiro) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro.focus();
      }
    }

    document.addEventListener("keydown", tratarTeclado);

    return () => {
      document.removeEventListener("keydown", tratarTeclado);
      document.body.style.overflow = overflowAnterior;
      focoAnterior?.focus?.();
    };
  }, [onClose]);

  function fecharPeloFundo(evento) {
    if (evento.target === evento.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="modal-backdrop" onMouseDown={fecharPeloFundo}>
      <section
        ref={painelRef}
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descricaoId}
      >
        <header className="modal-header">
          <div>
            <span className="eyebrow">Cadastro local</span>
            <h2 id={titleId}>{title}</h2>
          </div>
          <button
            className="modal-close"
            type="button"
            onClick={onClose}
            aria-label="Fechar janela"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>
        {children}
      </section>
    </div>
  );
}

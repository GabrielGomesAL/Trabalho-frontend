import { AlertTriangle, Trash2 } from "lucide-react";
import Modal from "../common/Modal.jsx";

export default function ConfirmarExclusaoModal({ cliente, onClose, onConfirm }) {
  return (
    <Modal
      title="Excluir cliente"
      titleId="titulo-excluir-cliente"
      descricaoId="descricao-excluir-cliente"
      onClose={onClose}
    >
      <div className="delete-warning">
        <span className="delete-warning-icon" aria-hidden="true">
          <AlertTriangle size={24} />
        </span>
        <div>
          <p id="descricao-excluir-cliente">
            Tem certeza que deseja excluir <strong>{cliente.nome}</strong>?
          </p>
          <span>Esta ação remove o cadastro deste navegador e não pode ser desfeita.</span>
        </div>
      </div>

      <div className="modal-actions">
        <button
          data-autofocus
          className="secondary-button"
          type="button"
          onClick={onClose}
        >
          Cancelar
        </button>
        <button className="danger-button" type="button" onClick={() => onConfirm(cliente)}>
          <Trash2 size={18} aria-hidden="true" /> Excluir definitivamente
        </button>
      </div>
    </Modal>
  );
}

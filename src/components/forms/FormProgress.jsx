import { Check, Contact, Star, Target } from "lucide-react";

const camposObrigatorios = [
  "nome",
  "email",
  "telefone",
  "empresa",
  "cidade",
  "interesse",
];

const dicas = [
  {
    icon: Contact,
    title: "Dados de contato",
    text: "Nome, e-mail e telefone ajudam a manter o relacionamento próximo.",
    campos: ["nome", "email", "telefone"],
  },
  {
    icon: Target,
    title: "Interesse principal",
    text: "A área de interesse direciona o próximo atendimento.",
    campos: ["interesse"],
  },
  {
    icon: Star,
    title: "Prioridade correta",
    text: "Defina a urgência para facilitar a organização da equipe.",
    campos: ["prioridade"],
  },
];

function campoPreenchido(valor) {
  return typeof valor === "string" && valor.trim().length > 0;
}

export default function FormProgress({ valores }) {
  const preenchidos = camposObrigatorios.filter((campo) =>
    campoPreenchido(valores[campo]),
  ).length;
  const percentual = Math.round(
    (preenchidos / camposObrigatorios.length) * 100,
  );

  return (
    <aside className="form-guide" aria-label="Progresso do cadastro">
      <h2>Cadastro bem preenchido</h2>

      <div className="progress-summary">
        <div
          className="progress-ring"
          style={{ "--progress": `${percentual * 3.6}deg` }}
          aria-label={`${percentual}% dos campos obrigatórios preenchidos`}
          role="img"
        >
          <strong>{percentual}%</strong>
        </div>
        <div>
          <strong>Preenchimento</strong>
          <p>{preenchidos} de 6 campos obrigatórios</p>
        </div>
      </div>

      <div className="guide-list">
        {dicas.map(({ campos, icon: Icon, text, title }) => {
          const concluida = campos.every((campo) =>
            campoPreenchido(valores[campo]),
          );

          return (
            <div
              className={
                concluida ? "guide-item guide-item-done" : "guide-item"
              }
              key={title}
            >
              <span className="guide-icon" aria-hidden="true">
                {concluida ? <Check size={20} /> : <Icon size={21} />}
              </span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

import { FC, ReactNode, useEffect } from "react";
import { XIcon } from "../icons";

interface Props {
  title: string;
  id: string;
  children: ReactNode;
}

const Modal: FC<Props> = ({ title, id, children }: Props) => {
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal(id);
      }
    });
  }, [id]);

  return (
    <div id={`${id}-container`} className="modal-container">
      <div id={id} className="modal">
        <div className="modal-header">
          <h1>{title}</h1>

          <button onClick={() => closeModal(id)} className="close-btn">
            <XIcon />
          </button>
        </div>

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export function openModal(id: string) {
  document.querySelector(`#${id}`)?.classList.add("active");
  document.querySelector(`#${id}-container`)?.classList.remove("closed");
  document.querySelector(`#${id}-container`)?.classList.add("active");
}

export function closeModal(id: string) {
  document.querySelector(`#${id}`)?.classList.add("active");
  document.querySelector(`#${id}-container`)?.classList.replace("active", "closed");

  setTimeout(() => {
    document.querySelector(`#${id}`)?.classList.remove("active");
  });
}

export default Modal;

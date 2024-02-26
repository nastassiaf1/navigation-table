import ModalDialogPortal from "components/modalDialogPortal";

import tableStyle from './../styles/table.module.scss';

interface ConfirmationDialogProps {
    isOpen: boolean,
    onClose: () => void,
    onConfirm?: () => void,
    title?: string,
    description?: string,
}

export default function ConfirmationDialog({ isOpen, onClose, onConfirm, title, description}: ConfirmationDialogProps) {
    if (!isOpen) return null;

    return (
      <ModalDialogPortal>
        <div>
          {
            title ? <h2>{ title }</h2> : null
          }
          {
            description ? <p>{ description }</p> : null
          }
          <div>
            <button
                className={tableStyle.button}
                onClick={onClose}
            >
              Cancel
            </button>
            <button
                className={`${tableStyle.button} ${tableStyle.deletebutton}`}
                onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </ModalDialogPortal>
    );
}

import ModalDialogPortal from "components/modalDialogPortal";

import tableStyle from './../../styles/table.module.scss';

interface DeleteConfirmationDialogProps {
    isOpen: boolean,
    onClose: () => void,
    onConfirm: () => void
}

export default function DeleteConfirmationDialog({ isOpen, onClose, onConfirm }: DeleteConfirmationDialogProps) {
    if (!isOpen) return null;

    return (
      <ModalDialogPortal>
        <div>
          <h2>Are you sure?</h2>
          <p>This action cannot be undone. This will permanently delete the table and all its data.</p>
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
                Delete
            </button>
          </div>
        </div>
      </ModalDialogPortal>
    );
}

import ReactDOM from 'react-dom';

import dialogStyle from './../styles/dialog.module.scss';

interface ModalDialogProps {
    children: React.ReactNode;
}

const ModalDialogPortal: React.FC<ModalDialogProps> = ({ children }) => {
  return ReactDOM.createPortal(
    <div className={dialogStyle.wrapper}>
        <div className={dialogStyle.content}>
            { children }
        </div>
    </div>,
    document.body
  );
};

export default ModalDialogPortal;

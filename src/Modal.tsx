import './index.css';

import { ReactNode } from 'react';
import { observer } from 'mobx-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode[] | ReactNode
}
const Modal = observer(({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) { return null; }

  return (
    <div
      onClick={onClose}
      className='z-50 fixed top-0 left-0 flex w-full h-full bg-black/40'
    >
      <div
        className='bg-white m-auto border-2'
        style={{
          height: 350,
          width: 540,
          padding: '2%',
          boxShadow: '2px solid black',
        }}
      >
        {children}
      </div>
    </div>
  );
});

export default Modal;

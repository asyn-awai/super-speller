import React from 'react'
import MicroModal from 'react-micro-modal'
import "react-micro-modal/dist/index.css"
import { FaTimes } from 'react-icons/fa'

type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>

interface Props {
    children: React.ReactNode;
    open: boolean;
    setOpen: StateSetter<boolean>;
    setContent: StateSetter<React.ReactNode>
}

const Modal: React.FC<Props> = ({
    children,
    open,
    setOpen,
    setContent
}): JSX.Element => (
    <MicroModal 
        open={open}
        handleClose={() => setOpen(false)}
        closeOnOverlayClick
        closeOnEscapePress
        // closeOnAnimationEnd 
    >
        {close => (
            <div>
                <div className='float-right relative t-2 r-2'>
                    <strong 
                        className='text-2xl cursor-pointer'
                        onClick={close}
                    >
                        <FaTimes size={25} color="#3b82f6" />
                    </strong>
                </div>
                <div className='p-3'>
                    {children}
                </div>
            </div>
        )}
    </MicroModal>
)

export default Modal;
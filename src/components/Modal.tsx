import { PropsWithChildren, useEffect, useRef } from "react";
import "../assets/modal.scss";

interface Props {
    visible: boolean;
    onHide: () => void;
    title: string;
    footer: JSX.Element;
}

function Modal(props: PropsWithChildren<Props>) {
    const { children, visible, onHide, title, footer } = props;
    const dialogRef = useRef(null);

    useEffect(() => {
        if (dialogRef.current) {
            if (visible) {
                (dialogRef.current as any).showModal();
            } else {
                (dialogRef.current as any).close();
            }
        }
    }, [visible]);
    return (
        <dialog ref={dialogRef} className="form-modal" data-testid="modal">
            <h2>{title}</h2>
            {children}
            {footer || <button onClick={onHide}>Close</button>}
        </dialog>
    );
}

export default Modal;

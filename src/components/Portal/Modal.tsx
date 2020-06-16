import * as React from 'react';
import PortalContainer from './Portal';

interface IProps {
    show: boolean,
    title: any,
    onOpen: any,
    onClose: any,
    backgroundDismiss?: boolean,
    closeButton?: any,
    styles?: any,
    class?: string,
}

const Modal = (props: React.PropsWithChildren<IProps>) => {

    // states
    const [show, setShow] = React.useState(props.show);

    // ref 
    const ModalBackdrop = React.useRef(null);

    // callback on change show state
    React.useEffect(() => {
        show ? onOpen() : onClose()
    }, [show])


    //on modal toggle
    // open
    const onOpen = () => {
        if (typeof props.onOpen === "function") {
            props.onOpen();
        }
    }

    // close
    const onClose = () => {
        if (typeof props.onClose === "function") {
            props.onClose();
        }
    }

    // on click modal or backdrop 
    const handleClick = (e: React.MouseEvent) => {
        if (props.backgroundDismiss != undefined && props.backgroundDismiss) {
            if (e.target == ModalBackdrop.current) {
                setShow(false);
            }
        }
    }

    const renderModal = () => {
        return (<>
            <PortalContainer>

                <div className="modal-backdrop" ref={ModalBackdrop} onClick={(e) => handleClick(e)} >

                    <div className={`modal-panel ${props.class || ""}`}
                        style={...props.styles || {}}>

                        <div className="modal-header">
                            <div className="modal-title"> {props.title}</div>
                            <div className="modal-close" onClick={() => setShow(false)}>
                                {
                                    props.closeButton !== undefined ?
                                        <>
                                            {props.closeButton}
                                        </>
                                        :
                                        <div className="close-btn"></div>
                                }
                            </div>
                        </div>

                        <div className="modal-body">
                            {props.children}
                        </div>

                    </div>

                </div>

            </PortalContainer>
        </>);
    }

    return (<>
        {
            show ? renderModal()
                : null
        }

    </>)
}

Modal.defaultProps = {
    backgroundDismiss: true
}

export default Modal;

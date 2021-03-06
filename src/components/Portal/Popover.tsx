import * as React from 'react';
import PortalContainer from './Portal';

type IPosition = "top" | "bottom" | "left" | "right";

interface IProps {
    title: string | HTMLElement,
    content: string | HTMLElement,
    position?: IPosition
}

interface ICoords {
    top?: number,
    bottom?: number,
    left?: number,
    right?: number,
}

const Popover = (props: React.PropsWithChildren<IProps>) => {

    // state 
    const [show, setShow] = React.useState(false)
    const [coords, setCoords] = React.useState<ICoords | {}>({})

    const popoverButtonRef = React.useRef(null);
    const popoverRef = React.useRef(null);

    // toggle tooltip
    const toggleTooltip = (button: HTMLButtonElement) => {
        const buttonDetails = button.getBoundingClientRect();

        let position = props.position || "top";
        let _coords: ICoords = {}

        switch (position) {
            case "top":
                _coords = {
                    left: buttonDetails.x + buttonDetails.width / 2,
                    top: buttonDetails.top - 15
                }
                break;

            case "bottom":
                _coords = {
                    left: buttonDetails.x + buttonDetails.width / 2,
                    top: buttonDetails.bottom + 15
                }
                break;

            case "right":
                _coords = {
                    left: buttonDetails.x + buttonDetails.width + 15,
                    top: buttonDetails.y + buttonDetails.height / 2
                }
                break;

            case "left":
                _coords = {
                    left: buttonDetails.x - 15,
                    top: buttonDetails.y + buttonDetails.height / 2
                }
                break;

        }

        setCoords(_coords);
        setShow(!show);
    }

    // on click modal or backdrop 
    const handleClick = (e: MouseEvent) => {
        if (e.target != popoverButtonRef.current && !popoverButtonRef.current?.contains(e.target) && e.target != popoverRef.current && !popoverRef.current?.contains(e.target)) {
            setShow(false)
        }
    }

    document.addEventListener("click", (e) => handleClick(e))
    // render tooltip
    const renderTooltip = () => {
        return (<PortalContainer>

            <div className={`popover-content ${props.position || "top"} `} style={coords} 
                ref={popoverRef}
            >
                <div className="title">{props.title}</div>
                <div className="content">
                    {props.content}
                </div>
            </div>

        </PortalContainer>)
    }

    return (<>
        <span className="popover"
            onClick={(e) => toggleTooltip(e.target as HTMLButtonElement)}
            ref={popoverButtonRef}
        >
            {props.children}
        </span>

        {
            show ?
                renderTooltip()
                : null
        }
    </>);

}

export default Popover;
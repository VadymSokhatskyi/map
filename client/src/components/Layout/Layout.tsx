import React, {useEffect, useRef, useState} from 'react';

import Map from "../Map/Map";

import './Layout.css';

const Layout = () => {

    const [isMapInit, setIsMapInit] = useState(false);

    const leftRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mainRef.current && !isMapInit) setIsMapInit(true);
    }, [mainRef]);

    return(
        <div className="layout">
            <div className="header">map 0.0.1</div>

            <div className="content">
                <div className="left" ref={leftRef}></div>

                <div
                    className="main"
                    style={leftRef.current && rightRef.current ?
                        { width: window.innerWidth - leftRef.current.clientWidth - rightRef.current.clientWidth }
                        : undefined
                    }
                    ref={mainRef}
                >
                    {isMapInit && <Map wrapRef={mainRef} />}
                </div>
                <div className="right" ref={rightRef}></div>
            </div>

            <div className="footer"></div>
        </div>
    )
}

export default Layout;
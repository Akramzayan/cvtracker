"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const ToolTip = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipPos, setToolTipPos] = useState({ top: 0, left: 0 });

  const [show, setShow] = useState(false);

  const showToolTip = () => setShow(true);

  const hideToolTip = () => setShow(false);

  useEffect(() => {
    const span = spanRef.current;
    const tooltip = tooltipRef.current;
    if(span && tooltip){
        const rect=span.getBoundingClientRect() // making it rectangle
        const TOP_OFFSET = 6;
        const newTop  =rect.top +rect.height + TOP_OFFSET;
        const NewLeft = rect.left - tooltip.offsetWidth/2 + rect.width/2;
        setToolTipPos({
            top:newTop,
            left:NewLeft
        })

    }
  },[show])

  return (
    <span
      ref={spanRef}
      onMouseEnter={showToolTip}
      onMouseLeave={hideToolTip}
      onFocus={showToolTip}
      onBlur={hideToolTip}
      onClick={hideToolTip}
    >
      {children}
      {show &&
        createPortal(
          <div
            ref={tooltipRef}
            role="tooltip"
            className="absolute left-0 top-0 z-10 w-max rounded-md bg-gray-600 px-2 py-0.5 text-sm text-white"
            style={{left:`${tooltipPos.left}px`,
                    top:`${tooltipPos.top}px`}}
          >
            {text}
          </div>,
          document.body
        )}
    </span>
  );
};

import type { Options } from "./types";

export const defaultSize: number = 400;

export const initialOptions: Required<Options> = {
    closeableCloseBtn: true,
    showCloseBtn: true,
    closeableMask: true,
    zIndex: 9999999, 
    closeOnEsc: true,
    size: `${defaultSize}px`,
    maxSize: '95%',
    minSize: '10%',
    maskColor: 'rgba(0, 0, 0, .5)', 
    contentColor: 'white', 
    resizable: true, 
    mask: true, 
    placement: 'right', 
    renderOnShow: false, 
    padding: 20, 
    hideOnDesktop: false
}


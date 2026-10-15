import type { ComputedRef, EmitFn, Ref } from 'vue';

export type Placement = 'top' | 'bottom' | 'right' | 'left';

export interface Options {
    closeableCloseBtn?: boolean;
    showCloseBtn?: boolean;
    zIndex?: number;
    closeOnEsc?: boolean;
    size?: string;
    maxSize?: string | null;
    minSize?: string | null;
    maskColor?: string;
    contentColor?: string;
    closeableMask?: boolean;
    resizable?: boolean;
    mask?: boolean;
    placement?: Placement;
    renderOnShow?: boolean;
    padding?: number;
    hideOnDesktop?: boolean;
}

export type AllOptions = Required<Options>;

export interface Props {
    options?: Options;
    show: boolean;
}

export type Emits = {
    onClose: [];
    onResize: [size: number];
    onResizeStart: [];
    onResizeEnd: [];
};

export interface ModelReturn {
    placementPos: ComputedRef<PlacementPos>;
    handleClosebtnClose: () => void;
    handleMaskClose: () => void;
    headerWidth: ComputedRef<string>;
    bodyWidth: ComputedRef<string>;
    slotsCheck: ComputedRef<SlotsCheck>;
    allOptions: ComputedRef<AllOptions>;
    controlledSize: ComputedRef<boolean>;
    size: Ref<number>;
}

export interface ModelProps {
    options: Options;
    emits: EmitFn<Emits>;
}

export interface PlacementPos {
    isRight: boolean;
    isTop: boolean;
    isLeft: boolean;
    isBottom: boolean;
    isY: boolean;
    isX: boolean;
    property: 'width' | 'height';
}

export interface SlotsCheck {
    hasHeader: boolean;
    hasBody: boolean;
    hasFooter: boolean;
}
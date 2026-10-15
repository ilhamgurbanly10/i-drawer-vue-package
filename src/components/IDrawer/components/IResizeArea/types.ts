import type { EmitFn } from 'vue';
import type { PlacementPos } from '../../types';

export interface Props {
    pos: PlacementPos;
    size: number;
}

export type Emits = {
    onClose: [];
    onResize: [size: number];
    onResizeStart: [];
    onResizeEnd: [];
};

export interface ModelReturn {
    onPointerMove: (event: PointerEvent, pos: PlacementPos) => void;
    onPointerUp: (event: PointerEvent) => void;
    onPointerDown: (event: PointerEvent) => void;

}

export interface ModelProps {
    size: number;
    emits: EmitFn<Emits>;
    
}

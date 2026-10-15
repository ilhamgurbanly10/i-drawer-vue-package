import { ref } from "vue";
import type { ModelReturn, ModelProps } from "./types";
import type { PlacementPos } from "../../types";

const useModel = ({
    emits,
    size
}: ModelProps): ModelReturn => {

    const resizing = ref<boolean>(false);

    // pointer-events
    const onPointerDown = (event: PointerEvent) => {
        event.preventDefault();
        resizing.value = true;
        emits('onResizeStart');
        (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
        document.body.style.userSelect = 'none';
        document.body.style.webkitUserSelect = 'none';
         window.getSelection()?.removeAllRanges();
    };

    const handleRightPosResize = (event: PointerEvent): void => {

        let _size = size;
        const xPos = event.clientX;
        const restWidth = window.innerWidth - _size;
        const type = xPos > restWidth ? 'decreasing' : 'increasing';

        const actions = {
            'increasing': () => {
                const plusWidth = restWidth - xPos;
                _size += plusWidth;
            },
            'decreasing': () => {
                const minusWidth = xPos - restWidth;
                _size -= minusWidth;
            }
        }

        actions[type]();

        emits('onResize', _size);
    }

    const handleLeftPosResize = (event: PointerEvent): void => {

        let _size = size;
        const posX = event.clientX;
        const type = posX < _size ? 'decreasing' : 'increasing';

        const actions = {
            'increasing': () => {
                const plusWidth = posX - _size;
                _size += plusWidth;
            },
            'decreasing': () => {
                const minusWidth = _size - posX;
                _size -= minusWidth;
            }
        }

        actions[type]();

        emits('onResize', _size);

    }

    const handleTopPosResize = (event: PointerEvent): void => {

        let _size = size;
        const yPos = event.clientY;
        const type = yPos < _size ? 'decreasing' : 'increasing';

        const actions = {
            'increasing': () => {
                const plusWidth = yPos - _size;
                _size += plusWidth;
            },
            'decreasing': () => {
                const minusWidth = _size - yPos;
                _size -= minusWidth;
            }
        }

        actions[type]();

        emits('onResize', _size);

    }

    const handleBottomPosResize = (event: PointerEvent): void => {

        let _size = size;
        const yPos = event.clientY;

        const windowHeight = window.innerHeight;
        const restHeight = windowHeight - _size;
        const type = yPos > restHeight ? 'decreasing' : 'increasing';

        const actions = {
            'increasing': () => {
                const plusWidth = restHeight - yPos;
                _size += plusWidth;
            },
            'decreasing': () => {
                const minusWidth = yPos - restHeight;
                _size -= minusWidth;
            }
        }

        actions[type]();

        emits('onResize', _size);

    }

    const onPointerMove = (event: PointerEvent, pos: PlacementPos) => {
        if (!resizing.value) return;

        if (pos.isRight) handleRightPosResize(event); 
        else if (pos.isLeft) handleLeftPosResize(event);
        else if (pos.isTop) handleTopPosResize(event); 
        else if (pos.isBottom) handleBottomPosResize(event);
    };

    const onPointerUp = (event: PointerEvent) => {

        if (!resizing.value) return;
        emits('onResizeEnd');
        resizing.value = false;
        const target = event.currentTarget as HTMLElement;

        if (target.hasPointerCapture(event.pointerId)) {
            target.releasePointerCapture(event.pointerId);
        }

        document.body.style.userSelect = '';
    };
    // end-pointer-events

    return {
        onPointerDown,
        onPointerUp,
        onPointerMove
    }

}

export default useModel;
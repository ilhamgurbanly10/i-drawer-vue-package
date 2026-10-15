import { computed, onUnmounted, ref, useSlots, watch } from "vue";
import type { ModelReturn, ModelProps, PlacementPos, SlotsCheck, AllOptions } from "./types";
import { getPlacement } from "./utils/placement";
import { defaultSize, initialOptions } from "./data";

const useModel = ({
    options,
    emits
}: ModelProps): ModelReturn => {

    const allOptions = computed<AllOptions>(() => {
        return { ...initialOptions, ...options }
    });

    // slots
    const slots = useSlots();

    const slotsCheck = computed<SlotsCheck>(() => {
        return {
            hasHeader: !!slots?.header,
            hasBody: !!slots?.body,
            hasFooter: !!slots?.footer
        }
    })
    // end-slots

    // positions
    const placementPos = computed<PlacementPos>(() => getPlacement(allOptions.value.placement));
    // end-positions

    // calculate-sizes
    const headerWidth = computed<string>(() => allOptions.value.showCloseBtn ? '94%' : '100%');
    const bodyWidth = computed<string>(() => allOptions.value.showCloseBtn && !slotsCheck.value.hasHeader ? '94%' : '100%');
    const controlledSize = computed<boolean>(() => options?.size !== undefined);
    const size = ref<number>(defaultSize);
    watch(
       [
         () => allOptions.value.placement, 
         controlledSize.value
       ],
        (_placement) => {
           if (controlledSize.value) size.value = defaultSize;
        },
        { immediate: false }
    )
    // end-calculate-sizes

    // close-handlers
    const handleClosebtnClose = (): void => { allOptions.value.closeableCloseBtn ? emits('onClose') : null; }
    const handleMaskClose = (): void => { allOptions.value.closeableMask ? emits('onClose') : null; }
    const handleEscClose = (): void => { emits('onClose'); }
    // end-close-handlers

    // esc
    watch(
        () => allOptions.value.closeOnEsc,
        (closeOnEsc) => {
            closeOnEsc ? window.addEventListener('keydown', handleEscClose) : window.removeEventListener('keydown', handleEscClose);
        },
        { immediate: true }
    )

    onUnmounted(() => {
        if (allOptions.value.closeOnEsc) { window.removeEventListener('keydown', handleEscClose); }
    });
    // end-esc

    return {
        placementPos,
        handleClosebtnClose,
        handleMaskClose,
        headerWidth,
        bodyWidth,
        slotsCheck,
        allOptions,
        controlledSize, 
        size
    }

}

export default useModel;
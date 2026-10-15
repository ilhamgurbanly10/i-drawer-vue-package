<script lang="ts" setup>
import type { Props, Emits } from './types';
import useModel from './model';
import { defineAsyncComponent } from 'vue'
import CloseIcon from "./components/CloseIcon";
import { getSizeInPixels, toPxString } from './utils/size';
import { getPlacement } from './utils/placement';

const IResizeArea = defineAsyncComponent(() =>
    import('./components/IResizeArea')
);

const {
    show,
    options = {}
} = defineProps<Props>();
const emits = defineEmits<Emits>();

const {
    placementPos,
    handleClosebtnClose,
    handleMaskClose,
    headerWidth,
    bodyWidth,
    slotsCheck, 
    allOptions, 
    controlledSize, 
    size
} = useModel({ options: options, emits });

</script>

<template>
    <Transition name="i-drawer">
    <div @click="handleMaskClose()" v-if="allOptions.renderOnShow ? show : true" class="i-drawer-container"
        :class="{ 'i-drawer-mask': allOptions.mask, 'i-drawer-show': show, 'i-drawer-hide-on-desktop': allOptions.hideOnDesktop }"
        :style="{ backgroundColor: allOptions.maskColor, zIndex: allOptions.zIndex }">

        <div @click.stop aria-modal="true" class="i-drawer-content" :class="{
            'i-drawer-right': placementPos.isRight,
            'i-drawer-left': placementPos.isLeft,
            'i-drawer-top': placementPos.isTop,
            'i-drawer-bottom': placementPos.isBottom,
            'i-drawer-content-show': show
        }" :style="{
            backgroundColor: allOptions.contentColor,
            zIndex: allOptions.zIndex + 1,
            width: placementPos.isY ? '100vw' : controlledSize ? allOptions.size : toPxString(size),
            minWidth: placementPos.isY ? '100vw' : allOptions.minSize ?? 'auto',
            maxWidth: placementPos.isY ? '100vw' : allOptions.maxSize ?? '100vw',
            height: placementPos.isX ? '100vh' : controlledSize ? allOptions.size : toPxString(size),
            maxHeight: placementPos.isX ? '100vh' : allOptions.maxSize ?? '100vh',
            minHeight: placementPos.isX ? '100vh' : allOptions.minSize ?? 'auto',
            padding: `${allOptions.padding}px`
        }">

            <IResizeArea @on-resize="(data) => { if (!controlledSize) { size = data; }; emits('onResize', data); }"
                @on-resize-end="() => { emits('onResizeEnd'); }"
                @on-resize-start="() => { emits('onResizeStart'); }" :size="controlledSize ? getSizeInPixels(allOptions.size, getPlacement(allOptions.placement).property) : size" :pos="placementPos" v-if="allOptions.resizable" />

            <button v-if="allOptions.showCloseBtn" :class="{ 'i-drawer-close-disabled': !allOptions.closeableCloseBtn }"
                class="i-drawer-close" aria-label="Close" type="button" @click="handleClosebtnClose()"
                :style="{ top: `${allOptions.padding}px`, right: `${allOptions.padding}px` }">
                <CloseIcon />
            </button>

            <div v-if="slotsCheck.hasHeader" class="i-drawer-header" :style="{ width: headerWidth }">
                <slot name="header" />
            </div>
            <div v-if="slotsCheck.hasBody" class="i-drawer-body"
                :style="{ width: bodyWidth, marginTop: slotsCheck.hasHeader ? `${allOptions.padding}px` : '0px' }">
                <slot name="body" />
            </div>
            <div v-if="slotsCheck.hasFooter" class="i-drawer-footer" :style="{ paddingTop: `${allOptions.padding}px` }">
                <slot name="footer" />
            </div>
        </div>

    </div>
    </Transition>
</template>

<style scoped>
@import "./styles.css";
</style>
<script lang="ts" setup>
import type { Props, Emits } from './types';
import useModel from './model';

const { pos, size } = defineProps<Props>();
const emits = defineEmits<Emits>();

const {
    onPointerDown, 
    onPointerMove, 
    onPointerUp
} = useModel({emits, size});

</script>

<template>
    <div class="i-drawer-resize-area" aria-label="Resize" :class="{
        'i-drawer-r-right': pos.isRight,
        'i-drawer-r-left': pos.isLeft,
        'i-drawer-r-top': pos.isTop,
        'i-drawer-r-bottom': pos.isBottom
    }" @pointerdown="onPointerDown" @pointermove="onPointerMove($event, pos)" @pointerup="onPointerUp"
        @pointercancel="onPointerUp" />
</template>

<style scoped>
@import "./styles.css";
</style>
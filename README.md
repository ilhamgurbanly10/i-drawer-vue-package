###  Vue Drawer Package by Ilham Gurbanly.

Drawer Package for Vue 3.

### Installation

```sh
$ npm install i-drawer-vue
```

### Usage

main.ts: If you wish use it as plugin, import and use it in main.ts file. And do not forget to import css file. This is global import.

```js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import IDrawer from "i-drawer-vue";
import "i-drawer-vue/dist/style.css";

createApp(App).use(IDrawer).mount('#app');
```

Local import as package in components:

```js
<script setup lang="ts">
    import { reactive, ref } from "vue";
    import { IDrawer, type IDrawerOptions } from "i-drawer-vue";
    import "i-drawer-vue/dist/style.css";
</script>
```

App.vue:

```js
<script setup lang="ts">

import { reactive, ref } from 'vue';
import { IDrawer, type IDrawerOptions } from 'i-drawer-vue';
import "i-drawer-vue/dist/style.css";

const show = ref<boolean>(false);

const options = reactive<IDrawerOptions>({
  closeableMask: true,
  mask: true,
  contentColor: 'white',
  placement: 'top',
  renderOnShow: false,
  maskColor: 'rgba(0, 0, 0, .5)',
  hideOnDesktop: false,
  resizable: true, 
  closeOnEsc: true, 
  padding: 20
})

</script>

<template>


  <IDrawer 
    :show="show" 
    :options="options" 
    @on-close="show = false"
    @on-resize="(data) => { console.log('new-size', data) }"
    @on-resize-start="() => { console.log('resizing_started'); }" 
    @on-resize-end="() => { console.log('resizing_ended'); }"
  >

    <template #header>

      <img src="./assets/user.avif" class="profile-img" />
      <h2 class="profile-name">Emily Smith</h2>
      <p class="profile-desc">Front-End Developer</p>

    </template>

    <template #body>
      <p class="profile-txt">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the
        librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy
        text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic
        typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with
        desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.</p>
    </template>

    <template #footer>
      <div class="profile-footer">
        <button class="btn btn-primary">Follow</button>
        <button class="btn btn-primary">Share Profile</button>
      </div>
    </template>

  </IDrawer>

</template>
```

### Props and named slots

 <section>
   <ul class="doc-list">
      <li><strong>show: boolean (Required)</strong> - controls whether the drawer is visible.</li>
      <li><strong>onClose: event (Required)</strong> - Emitted when the user requests to close the drawer (e.g. by
        pressing the ESC key, clicking the mask, or clicking the close icon). The parent is responsible for setting
        show to false.</li>
         <li><strong>onResizeStart: event (Optional)</strong> - Emitted when the user starts resize the drawer.</li>
          <li><strong>onResizeEnd: event (Optional)</strong> - Emitted when resizing gets stopped.</li>
          <li><strong>onResize: event(size) (Optional)</strong> - Emitted when the user resizes, and returns size as props.</li>
      <li><strong>options: options object (Optional)</strong>
        <ul>
          <li><strong>closeableCloseBtn: boolean (Optional)</strong> - whether close button can close the drawer, default
            value is true.</li>
          <li><strong>showCloseBtn: boolean (Optional)</strong> - whether to show close button, default value is true.
          </li>
          <li><strong>zIndex: number (Optional)</strong> - z-index value of drawer, default value is 9999999.</li>
          <li><strong>closeOnEsc: boolean (Optional)</strong> - whether ESC button can close the drawer, default value is
            true.</li>
          <li><strong>maskColor: string (Optional)</strong> - mask color of drawer, default value is rgba(0, 0, 0, .5).
          </li>
          <li><strong>contentColor: string (Optional)</strong> - content background color of drawer, default value is
            white.</li>
          <li><strong>closeableMask: boolean (Optional)</strong> - whether clicking on mask can close the drawer, default
            value is true.</li>
          <li><strong>padding: number (Optional)</strong> - padding of the drawer content, default value is 20.</li>
           <li><strong>hideOnDesktop: boolean (Optional)</strong> - whether hide drawer on desktop screens, default
            value is false.</li>
             <li><strong>renderOnShow: boolean (Optional)</strong> - whether render drawer if show is true, default
            value is false, it hides it via CSS by default.</li>
             <li><strong>resizable: boolean (Optional)</strong> - whether drawer content is resizable, default
            value is true.</li>
             <li><strong>placement: 'top' | 'right' | 'bottom' | 'left' (Optional)</strong> - placement of drawer content, default
            value is 'right'.</li>
             <li><strong>minSize: string | null (Optional)</strong> - minimum size of drawer content, due to placement position 
              it can be height or width, default value is '10%'.
          </li>
           <li><strong>maxSize: string | null (Optional)</strong> - maximum size of drawer content, due to placement position 
              it can be height or width, default value is '95%'.
          </li>
           <li><strong>size: string (Optional)</strong> - size of content. Important note here, 
            if you define size manually, then to resize you should use onResize event to change your content 
            size state, otherwise it will not work. If size is not defined it will work fine on resize, so you do not need 
            listen onResize event to resize content. 
            Default value is '400px'.
          </li>
        </ul>
      </li>
      <li><strong>header</strong> - named slot for providing custom header content.</li>
      <li><strong>body</strong> - named slot for providing custom body content.</li>
      <li><strong>footer</strong> - named slot for providing custom footer content.</li>
    </ul>
  </section>







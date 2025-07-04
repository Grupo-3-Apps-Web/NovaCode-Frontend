import {createApp} from 'vue'
import './style.css'
import { createPinia } from "pinia";
import i18n from "./i18n.js";
import {PrimeVue} from "@primevue/core";
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import Aura from '@primevue/themes/aura';
import {
    Button,
    Card,
    Checkbox,
    Column,
    ConfirmationService,
    ConfirmDialog,
    DataTable,
    Dialog,
    DialogService,
    Drawer,
    FileUpload,
    FloatLabel,
    IconField,
    InputIcon,
    InputNumber,
    InputText,
    Menu, Password,
    Rating,
    Row,
    Select,
    SelectButton,
    Tag,
    Textarea,
    Toast,
    ToastService,
    Toolbar
} from "primevue";
import router from "./router/index.js";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia)
app.use(PrimeVue, {
    ripple: true,
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: 'light'
        }
    }
})
app.use(ConfirmationService)
    .use(DialogService)
    .use(ToastService);

app.component('pv-button', Button)
    .component('pv-card', Card)
    .component('pv-column', Column)
    .component('pv-confirm-dialog', ConfirmDialog)
    .component('pv-checkbox', Checkbox)
    .component('pv-data-table', DataTable)
    .component('pv-dialog', Dialog)
    .component('pv-select', Select)
    .component('pv-select-button', SelectButton)
    .component('pv-file-upload', FileUpload)
    .component('pv-float-label', FloatLabel)
    .component('pv-icon-field', IconField)
    .component('pv-input-icon', InputIcon)
    .component('pv-input-text', InputText)
    .component('pv-input-number', InputNumber)
    .component('pv-menu', Menu)
    .component('pv-rating', Rating)
    .component('pv-row', Row)
    .component('pv-tag', Tag)
    .component('pv-drawer', Drawer)
    .component('pv-textarea', Textarea)
    .component('pv-toolbar', Toolbar)
    .component('pv-toast', Toast)
    .component('pv-password', Password)
    .component('pv-data-view', DataView)


app.use(i18n);
app.use(router);


app.mount('#app');

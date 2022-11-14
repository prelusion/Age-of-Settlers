import {createApp} from 'vue'
import './assets/styles/style.scss'
import App from './App.vue'
import {store} from './store'
import {ImageFactory} from "./util/ImageFactory";

createApp(App)
    .use(store)
    .mount('#app')

ImageFactory.singleton().initialize();



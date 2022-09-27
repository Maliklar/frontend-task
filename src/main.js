import { createApp } from 'vue'
import App from './App.vue'
import "./assets/styles.css"
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {library} from "@fortawesome/fontawesome-svg-core"
library.add(fas);
createApp(App)
.component("FontAwesomeIcon", FontAwesomeIcon)
  .mount('#app');

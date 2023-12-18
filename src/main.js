import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons Solid */
import { faUtensils, faBowlFood, faHeart as faHeartSolid, faMortarPestle, faFireFlameCurved, faPepperHot, faCircleXmark, faPlus, faCubesStacked, faCakeCandles, faBowlRice, faUser, faCaretRight } from '@fortawesome/free-solid-svg-icons'

/* import specific icons Regular */
import { faClock, faCalendar, faHeart as faHeartRegular, faEdit, faFaceSmile, faCircleUser } from '@fortawesome/free-regular-svg-icons'

/* import brand icons regular */
import { faGithub, faLinkedin, faHashnode, faGoogle } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(faClock, faCalendar, faUtensils, faBowlFood, faHeartSolid, faHeartRegular, faMortarPestle, faFireFlameCurved, faPepperHot, faEdit, faCircleXmark, faPlus, faCubesStacked, faCakeCandles, faFaceSmile, faBowlRice, faUser, faCaretRight, faLinkedin, faGithub, faHashnode, faGoogle, faCircleUser)

/* import vue-toastificaiton */
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css";

const app = createApp(App);
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Toast)
app.component('font-awesome-icon', FontAwesomeIcon).mount('#app');


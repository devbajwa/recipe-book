import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons Solid*/
import { faUtensils, faBowlFood, faHeart as faHeartSolid, faMortarPestle, faFireFlameCurved, faPepperHot, faCircleXmark, faPlus, faCubesStacked, faCakeCandles, faBowlRice, faUser, faCaretRight } from '@fortawesome/free-solid-svg-icons'

/* import specific icons Regular*/
import { faClock, faCalendar, faHeart as faHeartRegular, faEdit, faFaceSmile } from '@fortawesome/free-regular-svg-icons'

/* import brand icons regular */
import { faGithub, faLinkedin, faHashnode } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(faClock, faCalendar, faUtensils, faBowlFood, faHeartSolid, faHeartRegular, faMortarPestle, faFireFlameCurved, faPepperHot, faEdit, faCircleXmark, faPlus, faCubesStacked, faCakeCandles, faFaceSmile, faBowlRice, faUser, faCaretRight, faLinkedin, faGithub, faHashnode)

/* import vue-toastificaiton */
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css";

const app = createApp(App);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon).mount('#app');
app.use(Toast)

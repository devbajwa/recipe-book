import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons Solid*/
import { faUtensils, faBowlFood, faHeart as faHeartSolid, faMortarPestle, faFireFlameCurved, faPepperHot } from '@fortawesome/free-solid-svg-icons'

/* import specific icons Regular*/
import { faClock, faCalendar, faHeart as faHeartRegular} from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(faClock, faCalendar, faUtensils, faBowlFood, faHeartSolid, faHeartRegular, faMortarPestle, faFireFlameCurved, faPepperHot)

const app = createApp(App);
app.use(router);

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app');

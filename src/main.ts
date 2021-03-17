import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Form, Field, NavBar, Uploader, DatetimePicker, Popup, Toast } from 'vant'

import 'normalize.css'
import 'vant/lib/index.css'

const app = createApp(App)

app
  .use(store)
  .use(router)
  .use(Button)
  .use(Form)
  .use(Field)
  .use(NavBar)
  .use(Uploader)
  .use(DatetimePicker)
  .use(Popup)
  .use(Toast)
  .mount('#app')

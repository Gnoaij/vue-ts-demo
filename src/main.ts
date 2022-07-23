import { createApp } from 'vue'
import { store, key } from './store'
import router from './router'
import App from './App.vue'
import registerGlobal from './global'

const app = createApp(App)
app.use(store, key)
app.use(router)
app.use(registerGlobal)
app.mount('#app')

// handle global error
// eslint-disable-next-line
app.config.errorHandler = (err, vm, info) => {}

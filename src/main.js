import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "@/assets/main.pcss"
import * as Sentry from "@sentry/vue"
import { BrowserTracing } from "@sentry/tracing"

const app = createApp(App)

Sentry.init({
  app,
  dsn: "https://540074ede64644988bb53c0d3b324bea@o1165525.ingest.sentry.io/4503915571904512",
  logErrors: true,
  release: __SENTRY_RELEASE__,
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ["localhost", "my-site-url.com", /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

app.use(router).mount('#app')

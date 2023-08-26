import {createRoot} from 'react-dom/client'
import {registerLicense, validateLicense} from "@syncfusion/ej2-base";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// Axios
import axios from 'axios'
import {Chart, registerables} from 'chart.js'
// Apps
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/
import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/plugins.scss'
import './_metronic/assets/sass/style.react.scss'
import {AppRoutes} from './app/routing/AppRoutes'
import {AuthProvider, setupAxios} from './app/modules/auth'
import {QueryClient, QueryClientProvider} from "react-query";

/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */
/**
 * Inject Metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
// Registering Syncfusion license key
registerLicense('ORg4AjUWIQA/Gnt2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5WdkZiXXpadHRWQ2ha')
validateLicense()
setupAxios(axios)
Chart.register(...registerables)

const container = document.getElementById('root')
const queryClient = new QueryClient()
if (container) {
    createRoot(container).render(
      <QueryClientProvider client={queryClient}>
          <AuthProvider>
              <AppRoutes/>
          </AuthProvider>
      </QueryClientProvider>
    )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorkerRegistration.register()

import {createRoot} from 'react-dom/client'
import {registerLicense} from '@syncfusion/ej2-base'

// Axios
import axios from 'axios'
import {Chart, registerables} from 'chart.js'
// Apps
import {MetronicI18nProvider} from './_metronic/i18n/Metronici18n'
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
registerLicense('Mgo+DSMBaFt/QHRqVVhkVFpFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF5jSn9Rd0JhWn5eeXdQRQ==;Mgo+DSMBPh8sVXJ0S0J+XE9AflRDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS31TdURhWHhcc3VVT2RbUg==;ORg4AjUWIQA/Gnt2VVhkQlFacldJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkZiW35ZcndURmlaUUc=;MTMwNzMwM0AzMjMwMmUzNDJlMzBRdmcvUTNDWDJXSTRXZVM0WDA2NHNJZGRFV0ZoQVpoTDF0UnJsOVFnS0hFPQ==;MTMwNzMwNEAzMjMwMmUzNDJlMzBmMFpxaFBJdnoxYVEybUVvZ3dTOVpheERNa2tmbm5za1p6YjhqeW5YRWtrPQ==;NRAiBiAaIQQuGjN/V0Z+WE9EaFtKVmJLYVB3WmpQdldgdVRMZVVbQX9PIiBoS35RdUVgWH1fd3ZWR2FcU0J1;MTMwNzMwNkAzMjMwMmUzNDJlMzBRMG5hMy9ZVWRUUmdnNkF3aDUveEE3R2dZeDhoNUZXamFpZ1ZFdzRJWGlnPQ==;MTMwNzMwN0AzMjMwMmUzNDJlMzBnOG53NTkxY1IwWVNSOFd0MU5MVXJVa3hrU2JYR2wyc1hob3FJMHo0NkVnPQ==;Mgo+DSMBMAY9C3t2VVhkQlFacldJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkZiW35ZcndUR2BVWEc=;MTMwNzMwOUAzMjMwMmUzNDJlMzBMS3p1bUovTjBIbnJnWDM0ZDF2dWlnbUtjSG41REhSQWtKQThhMnJKMHIwPQ==;MTMwNzMxMEAzMjMwMmUzNDJlMzBVc2tGNzJMaVlYS2UxYW1ITHRQbSt5cDZwLzIyc1F2aUxmdWhrSElSSGcwPQ==;MTMwNzMxMUAzMjMwMmUzNDJlMzBRMG5hMy9ZVWRUUmdnNkF3aDUveEE3R2dZeDhoNUZXamFpZ1ZFdzRJWGlnPQ==')
setupAxios(axios)
Chart.register(...registerables)

const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <MetronicI18nProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </MetronicI18nProvider>
  )
}

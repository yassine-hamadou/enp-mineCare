import {AuthModel} from './_models'
import {QueryClient} from 'react-query'

const AUTH_LOCAL_STORAGE_KEY: string = 'token'
const TENANT_KEY: string = 'tenant'
const queryClient = new QueryClient()
const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    return
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel
    if (auth) {
      // You can easily check auth_token expiration also
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

const getTenant = (): any | undefined => {
  if (!localStorage) {
    return
  }

  const lsValue: string | null = localStorage.getItem(TENANT_KEY)
  if (!lsValue) {
    return
  }

  try {
    const tenant: any = lsValue
    if (tenant) {
      return tenant
    }
  } catch (error) {
    console.error('TENANT LOCAL STORAGE PARSE ERROR', error)
  }
}

const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return
  }

  try {
    const lsValue: string = JSON.stringify(auth)
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
    // localStorage.setItem(TENANT_KEY, tenant)
    console.log('auth', auth)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}
const setTenant = (tenant: any) => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.setItem(TENANT_KEY, tenant)
    console.log('tenant', tenant)
  } catch (error) {
    console.error('TENANT LOCAL STORAGE SAVE ERROR', error)
  }
}

const removeAuth = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
    localStorage.removeItem(TENANT_KEY)
    queryClient.resetQueries()
    queryClient.invalidateQueries()
    queryClient.removeQueries()
    queryClient.clear()
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(
    (config: {headers: {Authorization: string}}) => {
      const auth = getAuth()
      if (auth && auth.jwtToken) {
        config.headers.Authorization = `${auth.jwtToken}`
      }

      return config
    },
    (err: any) => Promise.reject(err)
  )
}

export {getAuth, getTenant, setAuth, setTenant, removeAuth, AUTH_LOCAL_STORAGE_KEY, TENANT_KEY}

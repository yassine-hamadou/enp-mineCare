import {createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState,} from 'react'
import TopBarProgress from 'react-topbar-progress-indicator'
import {AuthModel, UserModel} from './_models'
import * as authHelper from './AuthHelpers'
import {setTenant} from './AuthHelpers'
import {parseJwt} from './_requests'
import {WithChildren} from '../../../../_metronic/helpers'

type AuthContextProps = {
    auth: AuthModel | undefined
    saveAuth: (auth: AuthModel | undefined) => void
    currentUser: UserModel | undefined
    setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
    logout: () => void
    tenant: any
    saveTenant: (tenant: any) => void
    // setTenant: Dispatch<SetStateAction<any>>
}

const initAuthContextPropsState = {
    auth: authHelper.getAuth(),
    saveAuth: () => {
    },
    currentUser: undefined,
    setCurrentUser: () => {
    },
    logout: () => {
    },
    tenant: undefined,
    saveTenant: () => {
    },
    // setTenant: () => {
    // }
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({children}) => {
    const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
    const [currentUser, setCurrentUser] = useState<UserModel | undefined>()
    const [tenant, setTenant] = useState<string | undefined>(authHelper.getTenant())
    const saveAuth = (auth: AuthModel | undefined) => {
        setAuth(auth)
        if (auth) {
            authHelper.setAuth(auth) // save auth  into local storage
        } else {
            authHelper.removeAuth()
        }
    }

    const saveTenant = (tenant: any) => {
        setTenant(tenant)
        if (tenant) {
            authHelper.setTenant(tenant) // save tenant  into local storage
        } else {
            authHelper.removeAuth()
        }
    }

    const logout = () => {
        saveAuth(undefined)
        saveTenant(undefined)
        setCurrentUser(undefined)
    }

    return (
      <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, tenant, saveTenant, logout}}>
          {children}
      </AuthContext.Provider>
    )
}

const AuthInit: FC<WithChildren> = ({children}) => {
    const {auth, logout, setCurrentUser, tenant} = useAuth()
    console.log("auth", tenant)
    const didRequest = useRef(false)
    const [showSplashScreen, setShowSplashScreen] = useState(true)
    // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
    useEffect(() => {
        const requestUser = async (apiToken: string) => {
            try {
                if (!didRequest.current) {
                    const data: any = parseJwt(apiToken)
                    if (data.payload && tenant) {
                        setCurrentUser(data.payload) // save user info into context
                        setTenant(tenant)
                    } else {
                        logout()
                    }
                }
            } catch (error) {
                console.error(error)
                if (!didRequest.current) {
                    logout()
                }
            } finally {
                setShowSplashScreen(false)
            }

            return () => (didRequest.current = true)
        }

        if (auth && auth.jwtToken) {
            requestUser(auth.jwtToken)
        } else {
            logout()
            setShowSplashScreen(false)
        }
        // eslint-disable-next-line
    }, [])

    return showSplashScreen ? <TopBarProgress/> : <>{children}</>
}

export {AuthProvider, AuthInit, useAuth}

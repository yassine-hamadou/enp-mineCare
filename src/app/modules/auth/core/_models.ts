export interface AuthModel {
    jwtToken: string
    refreshToken?: string
}

export interface UserModel {
    id: string
    aud: string
    exp: number
    email: string
    firstName: string
    surname: string
    username: string
    gender: string
}

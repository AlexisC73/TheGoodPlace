import { useState } from "react"
import { SignupClientUseCase } from "../../../domain/auth/usecases/signup-client.usecase"
import { Dependencies } from "../../../config/dependencies"

export enum State {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS'
}

export const useSignup = () => {
    const [state, setState] = useState<State>(State.IDLE)
    const {userRepository} = Dependencies()

    const signupClientUseCase = new SignupClientUseCase(userRepository)

    function signupUser ({email, name, password, passwordConfirmation}: {email: string, name: string, password:string, passwordConfirmation:string}) {
        setState(State.LOADING)
        signupClientUseCase.handle({
            email,
            name,
            password,
            passwordConfirmation
        })
        .then(() => {
            setState(State.SUCCESS)
        })
        .catch(() => {
            setState(State.ERROR)
        })
    }
    return {state, signupUser}
}



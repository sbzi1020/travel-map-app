import { BehaviorSubject } from 'rxjs'
import { User } from '../pages/Register'

export interface AppState {
    user: User
}

const initState: AppState = {
    user: {
        username: ''
    },
}

let latestState: AppState = initState

const stateSource: BehaviorSubject<AppState> = new BehaviorSubject(initState)

const emitNextState = (nextState: AppState) => {
    latestState = nextState
    stateSource.next(nextState)
}

export const AppStateService = {
    // -------------------- $: stream
    $state: stateSource.asObservable(),

    // --------------------
    getLatest: (): AppState => latestState,

    // --------------------
    setUser: (username: string) => {

        console.log(`AppStateService: getUser: ${username}`)
        emitNextState({ ...stateSource.value, user: { username }})
    }
}

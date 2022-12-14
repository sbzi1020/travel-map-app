import { Button } from "@mui/material"
import { Dispatch } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AppStateService } from "../states/state_service"
import Notify from "./Notify"

interface IAuth {
    currentUser: string
    // setCurrentUser: Dispatch<React.SetStateAction<any>>
}
const Auth = (props: IAuth) => {
    const { currentUser } = props

    const navigate = useNavigate()

    return (
        <div>
            {currentUser ? (
                <Button variant='contained' style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'blue',
                }}
                    onClick={() => {
                        navigate('/', { replace: true })
                        AppStateService.setUser('')
                        toast.success(`Logout user`)
                        return (
                            <Notify />
                        )
                    }}
                >Logout</Button>
            ) : (
                <div className='accessButtonContainer'>
                    <Button
                        variant='contained'
                        style={{ backgroundColor: 'tomato', marginRight: '1rem' }}
                        onClick={() => navigate('/login', { replace: true })}
                    >
                        Login
                    </Button>

                    <Button
                        variant='contained'
                        style={{ backgroundColor: 'tomato' }}
                        onClick={() => navigate('/register', { replace: true })}
                    >
                        Register</Button>
                </div>
            )
            }
        </div>
    )
}
export default Auth

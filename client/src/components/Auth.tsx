import { Button, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AppStateService } from "../states/state_service"
import Notify from "./Notify"
import PersonPinIcon from '@mui/icons-material/PersonPin';
import Logo from "./Logo"
import { Dispatch } from "react"

interface Props {
    currentUser: string
    setShowPop: Dispatch<React.SetStateAction<boolean>>
    // setCurrentUser: Dispatch<React.SetStateAction<string>>
}
const Auth = (props: Props) => {
    const { currentUser, setShowPop } = props

    const navigate = useNavigate()


    return (
        <div>
            <Logo
                sx={{
                    position: 'absolute',
                    top: '1rem',
                    left: '2rem',
                    border: '3px solid tomato',
                    padding: '0.2rem',
                    backgroundColor: 'white',
                    borderRadius: '5px'

                }}
            />
            {currentUser ? (
                <div className='accessButtonContainer'>
                    <Stack direction='column' sx={{ marginRight: '7rem !important', alignItems: 'center' }}>
                        <PersonPinIcon sx={{ color: 'tomato' }} />
                        <Typography sx={{ fontWeight: 'bold' }}>
                            {`Welcome, ${currentUser}`}
                        </Typography>
                    </Stack>
                    <Button variant='contained' style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: 'tomato',
                        textTransform: 'capitalize'
                    }}
                        onClick={() => {
                            navigate('/', { replace: true })
                            AppStateService.setUser('')
                            toast.success(`Logout user`)
                            localStorage.removeItem('user')
                            setShowPop(false)
                            return (
                                <Notify />
                            )
                        }}
                    >Logout</Button>
                </div>
            ) : (
                <div className='accessButtonContainer'>
                    <Button
                        variant='contained'
                        style={{
                            backgroundColor: 'tomato',
                            marginRight: '1rem',
                            textTransform: 'capitalize'
                        }}
                        onClick={() => {
                            setShowPop(false)
                            navigate('/login', { replace: true })
                        }}
                    >
                        Login
                    </Button>

                    <Button
                        variant='contained'
                        style={{ backgroundColor: 'tomato', textTransform: 'capitalize' }}
                        onClick={() => {
                            setShowPop(false)
                            navigate('/register', { replace: true })
                        }}
                    >
                        Register</Button>
                </div>
            )
            }
        </div >
    )
}
export default Auth

import { Button, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AppStateService } from "../states/state_service"
import Notify from "./Notify"
import PersonPinIcon from '@mui/icons-material/PersonPin';

interface Props {
    currentUser: string
    // setCurrentUser: Dispatch<React.SetStateAction<string>>
}
const Auth = (props: Props) => {
    const { currentUser } = props

    const navigate = useNavigate()


    return (
        <div>
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
                        onClick={() => navigate('/login', { replace: true })}
                    >
                        Login
                    </Button>

                    <Button
                        variant='contained'
                        style={{ backgroundColor: 'tomato', textTransform: 'capitalize' }}
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

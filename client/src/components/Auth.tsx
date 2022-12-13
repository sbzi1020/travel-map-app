import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

interface IAuth {
    currentUser: string
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
                    backgroundColor: 'tomato',
                }}
                    onClick={() => navigate('/', { replace: true })}
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

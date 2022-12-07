import { Button } from "@mui/material"

interface IAuth {
    currentUser: string
}
const Auth = (props: IAuth) => {
    const { currentUser } = props
    return (
        <div>
            {currentUser ? (
                <Button variant='contained' style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'tomato'
                }}>Logout</Button>
            ) : (
                <div className='accessButtonContainer'>
                    <Button variant='contained' style={{ backgroundColor: 'tomato', marginRight: '1rem' }}>Login</Button>

                    <Button variant='contained' style={{ backgroundColor: 'tomato' }}>Register</Button>
                </div>
            )
            }
        </div>
    )
}
export default Auth

import { Button, Card, IconButton, InputAdornment, Typography } from "@mui/material"
import { styled } from '@mui/material/styles'
import { Field, Form, Formik } from "formik"
import { Stack } from "@mui/system"
import * as Yup from 'yup'
import { useEffect, useState } from "react"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios"
import Notify from "../components/Notify"
import { toast } from "react-toastify"
import { AppStateService } from "../states/state_service"
import { User } from "./Register"
import { useNavigate } from "react-router-dom"


const FormContainer = styled(Card)({
    width: '300px',
    maxHeight: '360px',
    padding: '20px',
    borderRadius: '10px',
    color: 'red',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    bgcolor: 'white'
})


const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [currentUser, setCurrentUser] = useState<string>('')
    // const [appState, setAppState] = useState(AppStateService.getLatest())

    // console.log(`appState: ${JSON.stringify(appState, null, 4)}`)
    // useEffect(() => {
    //     AppStateService.getUser(currentUser)
    //     console.log(`latest currentUser: ${JSON.stringify(currentUser, null, 4)}`)
    //     console.log(`latest appState: ${JSON.stringify(appState, null, 4)}`)
    // }, [currentUser])


    // useEffect(() => {
    //     let subscription = AppStateService.$state.subscribe((latestState) => {
    //         setAppState(latestState)
    //     })

    //     console.log(`subscription`)
    //     return () => {
    //         subscription.unsubscribe()
    //     }
    // }, [])
    //
    // Register validate schema=====================
    //
    const loginSchema = Yup.object().shape({
        username: Yup.string().required('Username required'),
        password: Yup.string().min(8, 'Password at least 8 characters').required('Password is required')
    })
    //
    // handle Password=====================
    //
    const handleShowPassword = () => {
        setShowPassword((show) => !show)
    }
    // , e: React.MouseEvent<HTMLButtonElement, MouseEvent>

    const navigate = useNavigate()
    const handleOnClickSubmit = async (values: User) => {
        // e.preventDefault()

        // // save form values
        const user: User = {
            username: values.username,
            password: values.password
        }

        console.log(`click onSubmit: ${JSON.stringify(user, null, 4)}`)
        // post values to DB
        try {
            const res = await axios.post('http://localhost:3001/api/user/login', user)
            // console.log(`post user: ${JSON.stringify(res, null, 4)}`)
            setCurrentUser(res.data.username)

            console.log(`res data: ${JSON.stringify(res.data.username, null, 4)}`)
            console.log(`setCurrentUser: ${JSON.stringify(currentUser, null, 4)}`)
            toast.success(`Welcome back! ${user.username}`)
            navigate('/', { replace: true })

        } catch (err: any) {
            console.log(err.massage)

            toast.error(`Login fail: ${err.massage}`)
        }
    }

    return (
        <FormContainer>
            <Typography variant='h5' sx={{ color: 'tomato', textAlign: 'center', fontWeight: 'bold' }}>Trama</Typography>

            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                validationSchema={loginSchema}
                onSubmit={handleOnClickSubmit}
            >
                {({ errors, touched, getFieldProps, validateForm, handleChange }: any) => (
                    <Form>
                        <Stack direction='column' spacing={1} sx={{ color: 'black' }}>
                            <Stack>
                                <Typography>username</Typography>
                                <Field
                                    autoComplete="username"
                                    variant='outlined'
                                    {...getFieldProps('username')}
                                    error={Boolean(touched.username && errors.username)}
                                    onChange={handleChange}
                                    style={{
                                        border: '1px solid lightgray',
                                        borderRadius: '4px',
                                        height: '1.5rem',
                                        padding: '0.5rem',
                                    }}
                                />
                                <span style={{ fontSize: '0.8rem', color: 'red' }}>{touched.username && errors.username}</span>
                            </Stack>
                            <Stack>
                                <Typography>password</Typography>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    position: 'relative'
                                }}>
                                    <Field
                                        autoComplete="current-password"
                                        type={
                                            showPassword ? 'text' : 'password'}
                                        {...getFieldProps('password')}
                                        error={Boolean(touched.password && errors.password)}
                                        onChange={handleChange}
                                        style={{
                                            border: '1px solid lightgray',
                                            borderRadius: '4px',
                                            height: '1.5rem',
                                            width: '20rem',
                                            padding: '0.5rem',
                                        }}
                                    />
                                    <span style={{ position: 'absolute', right: '0.5rem' }}>
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={
                                                    handleShowPassword
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    </span>
                                </div>
                                <span style={{ fontSize: '0.8rem', color: 'red' }}>{touched.password && errors.password}</span>
                            </Stack>
                            <Button variant='contained'
                                sx={{
                                    backgroundColor: 'tomato',
                                    textTransform: 'none',
                                    boxShadow: 0,
                                    '&:hover': {
                                        backgroundColor: 'white',
                                        border: '1px solid tomato',
                                        color: 'tomato',
                                        boxShadow: 0,
                                    }
                                }}
                                type="submit"
                                onClick={() => validateForm().then(() => console.log('onClick'))}
                            >Login</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>

            <Notify />
        </FormContainer >
    )
}

// </FormikProvider>
export default Login

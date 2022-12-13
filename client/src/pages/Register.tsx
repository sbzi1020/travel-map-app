import { Button, Card, IconButton, InputAdornment, Typography } from "@mui/material"
import { styled } from '@mui/material/styles'
import { Field, Form, Formik } from "formik"
import { Stack } from "@mui/system"
import * as Yup from 'yup'
import { useState } from "react"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios"
import { useNavigate } from "react-router-dom"

interface FormValue {
    username: string
    email?: string
    password: string
}

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


const Register = () => {
    const [showPassword, setShowPassword] = useState(false)

    //
    // Register validate schema=====================
    //
    const RegisterSchema = Yup.object().shape({
        username: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('Username required'),
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
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
    const handleOnClickSubmit = async (values: FormValue) => {
        // e.preventDefault()

        // // save form values
        const newUser: FormValue = {
            username: values.username,
            email: values.email?.toLowerCase(),
            password: values.password
        }
        // post values to DB
        try {
            const res = await axios.post('http://localhost:3001/api/user/register', newUser)
            console.log(`post user: ${JSON.stringify(res, null, 4)}`)
            navigate('/', { replace: true })

        } catch (err: any) {
            console.log(err.massage)
        }


    }
    //
    // validate username is in use==================
    // 
    const validateUsername = async (value: string) => {
        try {
            let errMsg

            const res = await axios.get(`http://localhost:3001/api/user/is_valid_username?username=${value}`)

            // console.log(`validateUsername: ${JSON.stringify(res.data, null, 4)}`)
            if (res.data.length > 0) {
                errMsg = res.data
            }
            return errMsg

        } catch (err: any) {
            console.log(err.massage)
        }
    }

    return (
        <FormContainer>
            <Typography variant='h5' sx={{ color: 'tomato', textAlign: 'center', fontWeight: 'bold' }}>Trama</Typography>

            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: ''
                }}
                validationSchema={RegisterSchema}
                onSubmit={handleOnClickSubmit}
            >
                {({ values, errors, touched, getFieldProps, handleChange }: any) => (
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
                                    validate={validateUsername}
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
                                <Typography>email</Typography>
                                <Field
                                    autoComplete="email"
                                    type="email"
                                    variant='outlined'
                                    {...getFieldProps('email')}
                                    error={Boolean(touched.email && errors.email)}
                                    onChange={handleChange}
                                    style={{
                                        border: '1px solid lightgray',
                                        borderRadius: '4px',
                                        height: '1.5rem',
                                        padding: '0.5rem',
                                    }}
                                />
                                <span style={{ fontSize: '0.8rem', color: 'red' }}>{touched.email && errors.email}</span>
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
                                disabled={values.username === '' || values.email === '' || values.password === ''}
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
                            >Register</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </FormContainer >
    )
}

export default Register

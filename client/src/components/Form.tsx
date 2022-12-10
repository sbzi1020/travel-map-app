import { Card, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { styled } from '@mui/material/styles'
import { Form, FormikProps, FormikProvider, useFormik } from "formik"
import { redirect } from "react-router-dom"
import { Stack } from "@mui/system"
import * as Yup from 'yup'
import { useState } from "react"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface Props {
    type: string
}
interface FormValue {
    username: string
    email?: string
    password: string
}

const FormContainer = styled(Card)({
    width: '300px',
    height: '400px',
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
const FormComponent = ({ type }: Props) => {
    const [showPassword, setShowPassword] = useState(false)

    const RegisterSchema = Yup.object().shape({
        username: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('Username required'),
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required')
    })

    const formik: FormikProps<FormValue> = useFormik<FormValue>({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        validationSchema: RegisterSchema,
        onSubmit: () => { redirect(`/`) }
    })
    const { getFieldProps, touched, values, handleSubmit, errors } = formik

        const handleShowPassword = () => {
            setShowPassword((show) => !show)
        }

    return (
        <FormContainer>
            <Typography variant='h5' sx={{ color: 'tomato', textAlign: 'center', fontWeight: 'bold' }}>Trama</Typography>
            <FormikProvider value={formik}>
                <Form
                    autoComplete="false"
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <Stack spacing={2} sx={{ color: 'black' }}>

                        <Stack direction='column' spacing={1}>
                            <Stack>
                                <Typography>username</Typography>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    {...getFieldProps('username')}
                                    error={Boolean(touched.username && errors.username)}
                                    helperText={touched.username && errors.username}
                                />
                            </Stack>
                            <Stack>
                                <Typography>email</Typography>
                                <TextField
                                    fullWidth
                                    autoComplete="username"
                                    type="email"
                                    variant='outlined'
                                    {...getFieldProps('email')}
                                    error={Boolean(touched.email && errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                            </Stack>
                            <Stack>
                                <Typography>password</Typography>
                                <TextField
                                    fullWidth
                                    autoComplete="current-password"
                                    type={
                                        showPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    {...getFieldProps('password')}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {/* <IconButton onClick={() => setShowPassword(show => !show)} edge='end'> */}
                                                <IconButton
                                                    onClick={
                                                        handleShowPassword
                                                    }
                                                    edge="end"
                                                >
                                                {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon /> }
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    error={Boolean(
                                        touched.password &&
                                        errors.password
                                    )}
                                    helperText={
                                        touched.password &&
                                        errors.password
                                    }
                                />
                            </Stack>
                        </Stack>
                        <Stack></Stack>
                    </Stack>
                </Form>
            </FormikProvider>
        </FormContainer >
    )
}
export default FormComponent

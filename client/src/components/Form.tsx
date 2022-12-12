import { Button, Card, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { styled } from '@mui/material/styles'
import { Form, FormikHelpers, FormikProps, FormikProvider, useFormik } from "formik"
import { redirect } from "react-router-dom"
import { Stack } from "@mui/system"
import * as Yup from 'yup'
import { useState } from "react"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios"

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
        password: Yup.string().min(8, 'Password at least 8 characters').required('Password is required')
    })

    const formik: FormikProps<FormValue> = useFormik<FormValue>({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        validationSchema: RegisterSchema,
        onSubmit: async (values: FormValue, submitForm: FormikHelpers<FormValue>) => {
            // redirect(`/`) 

            console.log(`======submit: ${JSON.stringify(values, null, 4)}`)
            // save form values
            const newUser = {
                username: values.username,
                email: values.email?.toLowerCase(),
                password: values.password
            }

            console.log(`click onSubmit: ${JSON.stringify(newUser, null, 4)}`)
            // // post values to DB
            // try{
            //     const res =  axios.post('/api/user/register', newUser)
            //     console.log(`post user: ${JSON.stringify(res,null, 4)}`)
            // }catch(err: any) {
            //     console.log(err.massage)
            // }


        }
    })
    const { handleChange, getFieldProps, touched, values, handleSubmit, errors, isSubmitting } = formik

    // console.log(`values: ${JSON.stringify(values, null, 4)}`)

    const handleShowPassword = () => {
        setShowPassword((show) => !show)
    }
    const handleOnClickSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        // save form values
        const newUser = {
            username: values.username,
            email: values.email?.toLowerCase(),
            password: values.password
        }

        console.log(`click onSubmit: ${JSON.stringify(newUser, null, 4)}`)
        // // post values to DB
        try{
            const res =  await axios.post('http://localhost:3001/api/user/register', newUser)
            console.log(`post user: ${JSON.stringify(res,null, 4)}`)
        }catch(err: any) {
            console.log(err.massage)
        }
    }

    return (
        <FormContainer>
            <Typography variant='h5' sx={{ color: 'tomato', textAlign: 'center', fontWeight: 'bold' }}>Trama</Typography>
            <FormikProvider value={formik}>
                <Form
                    autoComplete="false"
                    noValidate
                    onSubmit={() => console.log('submit===========================')}
                >
                    <Stack direction='column' spacing={1} sx={{ color: 'black' }}>
                        <Stack>
                            <Typography>username</Typography>
                            <TextField
                                fullWidth
                                variant='outlined'
                                {...getFieldProps('username')}
                                error={Boolean(touched.username && errors.username)}
                                helperText={touched.username && errors.username}
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                            <IconButton
                                                onClick={
                                                    handleShowPassword
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
                                onChange={handleChange}
                            />
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

                            onClick={handleOnClickSubmit}
                        >Register</Button>
                    </Stack>
                </Form>
            </FormikProvider>
        </FormContainer >
    )
}
export default FormComponent

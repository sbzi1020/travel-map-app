import { Card, Box, TextField } from "@mui/material"
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import { Form, FormikProps, FormikProvider, useFormik } from "formik"
import { redirect } from "react-router-dom"
import { Stack } from "@mui/system"

interface IFormComponent {
    type: string
}
interface FormValue {
    username: string
    email?: string
    password: string
}

const CustomButton = styled(`div`)({
    color: 'red'
})
const FormComponent = ({ type }: IFormComponent) => {
    const formik: FormikProps<FormValue> = useFormik<FormValue>({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        onSubmit: () => { redirect(`/`) }
    })
    const { getFieldProps, touched, values, handleSubmit } = formik

    return (
        <Card sx={{ width: { md: '28rem', sm: '20rem' }, bgcolor: 'lightcyan', padding: '2rem' }}>
            <div>Trama</div>
            <FormikProvider value={formik}>
                <Form
                    autoComplete="false"
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <Stack spacing={3}>
                        <Stack direction='column' spacing={2}>
                            <TextField
                                fullWidth
                                label='username'
                                {...getFieldProps('username' as any)}
                            />
                        </Stack>
                        <Stack></Stack>
                    </Stack>
                </Form>
            </FormikProvider>
        </Card >
    )
}
export default FormComponent

import {
    FormItem,
    Button,
    Switcher,
    Input,
    FormContainer,
    Select,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Postftpsetting, Putftpsetting } from 'services/MasterService'
import { useSelector } from 'react-redux'


const validationSchema = Yup.object().shape({
    SettingDesc: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('SettingDesc Name Required'),
        FTPLocation: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('FTP Location Required'),
    IsActive: Yup.string().required('IsActives Required'),
    rememberMe: Yup.bool(),
})
const options = [
    { value: 'foo', label: 'Foo' },
    { value: 'bar', label: 'Bar' },
]
const FtpSettingEdit = ({
    onDrawerClose,
    editData,
    setMessage,
    setlog,
    
}) => {
    const token = useSelector((state) => state.auth.session.token)
    //console.log(currency)

    const AddFtpSetting = async (values, token) => {
       // console.log(values)
        try {

            const resp = await Postftpsetting(values, token)
            if (resp.data.msg === 'success') {
                setlog('success')
                setMessage('Data Inserted Successfully')
                return
            } else if (resp.data.msg === 'Server Error') {
                setlog('error')
                setMessage('Server Error')
                return
            }
        } catch (errors) {
            return {}
        }
    }
    const EditFtpSetting = async (values, token) => {
        try {
            const resp = await Putftpsetting(values, token)
            console.log(resp)
            if (resp.data.msg === 'Updated') {
                setlog('success')
                setMessage('Data Updated Successfully')
                return
            } else if (resp.data.msg === 'FTP setting is Already Exists') {
                setlog('warning')
                setMessage(resp.data.msg)
                return
            }
        } catch (errors) {
            return {}
        }
    }

    return (
        <div>
            <Formik
                initialValues={{
                    FTPSettingCode: editData.FTPSettingCode || '',
                    SettingDesc: editData.SettingDesc || '',
                    FTPLocation: editData.FTPLocation || '',
                    FTP_UserID: editData.FTP_UserID || '',
                    FTP_PWD: editData.FTP_PWD || '',
                    FTP_Port: editData.FTP_Port || '',
                    IsActive: editData.IsActive === 1 ? true : false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    setTimeout(() => {
                        if (!editData.FTPSettingCode) {
                            new Promise((resolve, reject) => {
                                AddFtpSetting(values, token)
                                    .then((response) => {
                                        onDrawerClose(0, 0)
                                        resolve(response)
                                    })
                                    .catch((errors) => {
                                        reject(errors)
                                    })
                            })
                        } else {
                            new Promise((resolve, reject) => {
                                setSubmitting(false)
                                EditFtpSetting(values, token)
                                    .then((response) => {
                                        onDrawerClose(0, 0)
                                        resolve(response)
                                    })
                                    .catch((errors) => {
                                        reject(errors)
                                    })
                            })
                        }

                        resetForm()
                    }, 400)
                }}
            >
                {({ values, touched, errors }) => (
                    <Form>
                        <FormContainer>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <Field
                                    size="sm"
                                    type="FTPSettingCode"
                                    autoComplete="off"
                                    name="FTPSettingCode"
                                    placeholder="FTPSettingCode"
                                    component={Input}
                                    hidden
                                />
                                <FormItem
                                    asterisk
                                    label="FTP Setting Name"
                                    invalid={
                                        errors.SettingDesc &&
                                        touched.SettingDesc
                                    }
                                    errorMessage={errors.SettingDesc}
                                >
                                    <Field
                                        size="sm"
                                        type="FTP Setting Name "
                                        autoComplete="on"
                                        name="SettingDesc"
                                        placeholder="FTP Setting  Name"
                                        component={Input}
                                    />
                                </FormItem>

                                <FormItem
                                    asterisk
                                    label="FTPLocation"
                                    invalid={
                                        errors.FTPLocation && touched.FTPLocation
                                    }
                                    errorMessage={errors.FTPLocation}
                                >
                                    <Field
                                        size="sm"
                                        type="FTPLocation"
                                        // maxlength=""
                                        autoComplete="off"
                                        name="FTPLocation"
                                        placeholder="FTPLocation Name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    asterisk
                                    label="FTP_UserID"
                                    invalid={
                                        errors.FTP_UserID && touched.FTP_UserID
                                    }
                                    errorMessage={errors.FTP_UserID}
                                >
                                    <Field
                                        size="sm"
                                        type="FTP_UserID"
                                        maxlength="4"
                                        autoComplete="off"
                                        name="FTP_UserID"
                                        placeholder="FTP_UserID Name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    asterisk
                                    label="FTP_PWD"
                                    invalid={
                                        errors.FTP_PWD && touched.FTP_PWD
                                    }
                                    errorMessage={errors.FTP_UserID}
                                >
                                    <Field
                                        size="sm"
                                        type="FTP_PWD"
                                        maxlength="4"
                                        autoComplete="off"
                                        name="FTP_PWD"
                                        placeholder="FTP_PWD Name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    asterisk
                                    label="FTP_Port"
                                    invalid={
                                        errors.FTP_Port && touched.FTP_Port
                                    }
                                    errorMessage={errors.FTP_Port}
                                >
                                    <Field
                                        size="sm"
                                        type="FTP_Port"
                                        maxlength="4"
                                        autoComplete="off"
                                        name="FTP_Port"
                                        placeholder="FTP_Port Name"
                                        component={Input}
                                    />
                                </FormItem>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <FormItem
                                    label="Status"
                                    invalid={
                                        errors.IsActive && touched.IsActive
                                    }
                                    errorMessage={errors.IsActive}
                                >
                                    <div>
                                        <Field
                                            size="sm"
                                            name="IsActive"
                                            component={Switcher}
                                        />
                                    </div>
                                </FormItem>
                            </div>
                            <FormItem>
                                <Button variant="solid" type="submit">
                                    Submit
                                </Button>
                            </FormItem>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default FtpSettingEdit

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
import { Postchannel, Putchannel } from 'services/MasterService'
import { useSelector } from 'react-redux'

const validationSchema = Yup.object().shape({
    ChannelName: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('ChannelName Required'),
    ShortName: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('ShortName Required'),
    ChannelGenre: Yup.string()
        .min(3, 'Too Short!')
        .max(200, 'Too Long!')
        .required('ChannelGenre Required'),
    ChannelContentType: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('ChannelContentType Required'),
    SACCode: Yup.string()
        .min(3, 'Too Short!')
        .max(10, 'Too Long!')
        .required('SACCode Required'),
    GSTN_id: Yup.string()
        .min(3, 'Too Short!')
        .max(10, 'Too Long!')
        .required('GSTN_id Required'),

    rememberMe: Yup.bool(),
})

const ChannelEdit = ({
    onDrawerClose,
    editData,
    setMessage,
    setlog,
    State,
}) => {
    const token = useSelector((state) => state.auth.session.token)

    const AddChannel = async (values, token) => {
        try {
            const resp = await Postchannel(values, token)
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
    const EditChannel = async (values, token) => {
        try {
            const resp = await Putchannel(values, token)
            console.log(resp)
            if (resp.data.msg === 'Updated') {
                setlog('success')
                setMessage('Data Updated Successfully')
                return
            } else if (resp.data.msg === 'Channel is Already Exists') {
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
                    ChannelCode: editData.ChannelCode,
                    ChannelName: editData.ChannelName,
                    ShortName: editData.ShortName,
                    ChannelGenre: editData.ChannelGenre,
                    ChannelContentType: editData.ChannelContentType,
                    SACCode: editData.SACCode,
                    GSTN_id: editData.GSTN_id,
                    State: editData.State,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    setTimeout(() => {
                        if (!editData.EntityCode) {
                            new Promise((resolve, reject) => {
                                AddChannel(values, token)
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
                                EditChannel(values, token)
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
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Field
                                    size="sm"
                                    type="ChannelCode"
                                    autoComplete="off"
                                    name="ChannelCode"
                                    placeholder="ChannelCode name"
                                    component={Input}
                                    hidden
                                />
                                <FormItem
                                    label="ChannelName"
                                    invalid={
                                        errors.ChannelName &&
                                        touched.ChannelName
                                    }
                                    errorMessage={errors.ChannelName}
                                >
                                    <Field
                                        size="sm"
                                        type="ChannelName"
                                        autoComplete="off"
                                        name="ChannelName"
                                        placeholder="Channel Name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="ShortName"
                                    invalid={
                                        errors.ShortName && touched.ShortName
                                    }
                                    errorMessage={errors.ShortName}
                                >
                                    <Field
                                        size="sm"
                                        type="ShortName"
                                        autoComplete="off"
                                        name="ShortName"
                                        placeholder="Short Name"
                                        component={Input}
                                    />
                                </FormItem>

                                <FormItem
                                    label="ChannelGenre"
                                    invalid={
                                        errors.ChannelGenre &&
                                        touched.ChannelGenre
                                    }
                                    errorMessage={errors.ChannelGenre}
                                >
                                    <Field
                                        size="sm"
                                        type="ChannelGenre"
                                        autoComplete="off"
                                        name="ChannelGenre"
                                        placeholder="ChannelGenre Name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="ChannelContentType"
                                    invalid={
                                        errors.ChannelContentType &&
                                        touched.ChannelContentType
                                    }
                                    errorMessage={errors.ChannelContentType}
                                >
                                    <Field
                                        size="sm"
                                        type="ChannelContentType"
                                        autoComplete="off"
                                        name="ChannelContentType"
                                        placeholder="ChannelContentType Name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    asterisk
                                    label="State"
                                    invalid={errors.State && touched.State}
                                    errorMessage={errors.State}
                                    style={{ width: '250px' }}
                                >
                                    <Field
                                        size="sm"
                                        name="State"
                                        style={{ width: '250px' }}
                                    >
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: '250px' }}
                                                field={field}
                                                form={form}
                                                className="mb-4 w-50"
                                                options={State}
                                                value={State.filter(
                                                    (option) =>
                                                        option.value ===
                                                        values.State
                                                )}
                                                onChange={(option) =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        option?.value
                                                    )
                                                }
                                            />
                                        )}
                                    </Field>
                                </FormItem>
                                <FormItem
                                    label="SACCode"
                                    invalid={errors.SACCode && touched.SACCode}
                                    errorMessage={errors.SACCode}
                                >
                                    <Field
                                        size="sm"
                                        type="SACCode"
                                        autoComplete="off"
                                        name="SACCode"
                                        placeholder="SACCode Name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="GSTN_id"
                                    invalid={errors.GSTN_id && touched.GSTN_id}
                                    errorMessage={errors.GSTN_id}
                                >
                                    <Field
                                        size="sm"
                                        type="GSTN_id"
                                        autoComplete="off"
                                        name="GSTN_id"
                                        placeholder="GSTN_id Name"
                                        component={Input}
                                    />
                                </FormItem>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <FormItem
                                    asterisk
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

export default ChannelEdit

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
import { Postcontenttype, Putcontenttype } from 'services/ProgrammingService'
import { useSelector } from 'react-redux'

const validationSchema = Yup.object().shape({
    ContentTypeName: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    rememberMe: Yup.bool(),
})
const options = [
    { value: 'foo', label: 'Foo' },
    { value: 'bar', label: 'Bar' },
]
const ContentTypeEdit = ({
    onDrawerClose,
    editData,
    setMessage,
    setlog,
    // currency,
}) => {
    const token = useSelector((state) => state.auth.session.token)
    //console.log(currency)

    const AddContentType = async (values, token) => {
        try {
            const resp = await Postcontenttype(values, token)
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
    const EditContentType = async (values, token) => {
        try {
            const resp = await Putcontenttype(values, token)
            console.log(resp)
            if (resp.data.msg === 'Updated') {
                setlog('success')
                setMessage('Data Updated Successfully')
                return
            } else if (resp.data.msg === 'ContentType Already Exists') {
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
                    ContentTypeCode: editData.ContentTypeCode || '',
                    ContentTypeName: editData.ContentTypeName || '',
                    MultiPart: editData.MultiPart === 1 ? true : false,
                    EpisodeSpecific:
                        editData.EpisodeSpecific === 1 ? true : false,
                    LiveEvent: editData.LiveEvent === 1 ? true : false,
                    SportEvent: editData.SportEvent === 1 ? true : false,
                    IsActive: editData.IsActive === 1 ? true : false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    setTimeout(() => {
                        if (!editData.ContentTypeCode) {
                            new Promise((resolve, reject) => {
                                AddContentType(values, token)
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
                                EditContentType(values, token)
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
                                    type="ContentTypeCode"
                                    autoComplete="off"
                                    name="ContentTypeCode"
                                    placeholder="ContentTypeCode"
                                    component={Input}
                                    hidden
                                />
                                <FormItem
                                    asterisk
                                    label="Content Type Name"
                                    invalid={
                                        errors.ContentTypeName &&
                                        touched.ContentTypeName
                                    }
                                    errorMessage={errors.ContentTypeName}
                                >
                                    <Field
                                        type="ContentTypeName"
                                        autoComplete="off"
                                        name="ContentTypeName"
                                        placeholder="ContentType Name"
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
                                    label="MultiPart"
                                    invalid={
                                        errors.MultiPart && touched.MultiPart
                                    }
                                    errorMessage={errors.MultiPart}
                                >
                                    <div>
                                        <Field
                                            name="MultiPart"
                                            component={Switcher}
                                        />
                                    </div>
                                </FormItem>

                                <FormItem
                                    asterisk
                                    label="EpisodeSpecific"
                                    invalid={
                                        errors.EpisodeSpecific &&
                                        touched.EpisodeSpecific
                                    }
                                    errorMessage={errors.EpisodeSpecific}
                                >
                                    <div>
                                        <Field
                                            name="EpisodeSpecific"
                                            component={Switcher}
                                        />
                                    </div>
                                </FormItem>
                                <FormItem
                                    asterisk
                                    label="LiveEvent"
                                    invalid={
                                        errors.LiveEvent && touched.LiveEvent
                                    }
                                    errorMessage={errors.LiveEvent}
                                >
                                    <div>
                                        <Field
                                            name="LiveEvent"
                                            component={Switcher}
                                        />
                                    </div>
                                </FormItem>
                                <FormItem
                                    asterisk
                                    label="SportEvent"
                                    invalid={
                                        errors.SportEvent && touched.SportEvent
                                    }
                                    errorMessage={errors.SportEvent}
                                >
                                    <div>
                                        <Field
                                            name="SportEvent"
                                            component={Switcher}
                                        />
                                    </div>
                                </FormItem>
                            </div>
                            <br></br>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <FormItem
                                    asterisk
                                    label="Active"
                                    invalid={
                                        errors.IsActive && touched.IsActive
                                    }
                                    errorMessage={errors.IsActive}
                                >
                                    <div>
                                        <Field
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

export default ContentTypeEdit

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
import { PostContent, PutContent } from 'services/ProgrammingService'
import { useSelector } from 'react-redux'

const validationSchema = Yup.object().shape({
    ContentName: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('ContentName Required'),
    ShortName: Yup.string()
        .min(6, 'Too Short!')
        .max(200, 'Too Long!')
        .required('ShortName Required'),
    ERPCode: Yup.string()
        .min(3, 'Too Short!')
        .max(200, 'Too Long!')
        .required('ERPCode Required'),
    ContentTypeCode: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('ContentType Required'),
    Audience: Yup.string().required('Audience Required'),
    ClassificationCode: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('ClassificationCode Required'),
    LanguageCode: Yup.string()
        .min(6, 'Too Short!')
        .max(200, 'Too Long!')
        .required('LanguageCode Required'),
    CensorshipCode: Yup.string()
        .min(3, 'Too Short!')
        .max(200, 'Too Long!')
        .required('CensorshipCode Required'),
    FPCReleaseDate: Yup.string()
        .min(3, 'Too Short!')
        .max(200, 'Too Long!')
        .required('FPCReleaseDate Required'),
    SlotDuration: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('SlotDuration Required'),
    GenreCode: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('GenreCode Required'),
    SubGenreCode: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('SubGenreCode Required'),
    TxMasterCode: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('TxMasterCode Required'),

    IsActive: Yup.string().required('IsActives Required'),
    rememberMe: Yup.bool(),
})

const options2 = [
    { value: 'EPISODIC', label: 'EPISODIC' },
    { value: 'NONEPISODIC', label: 'NONEPISODIC' },
]
const options3 = [
    { value: 'GENERAL', label: 'GENERAL' },
    { value: 'ADULTS', label: 'ADULTS' },
    { value: 'FEMALES', label: 'FEMALES' },
    { value: 'MALES', label: 'MALES' },
    { value: 'KIDS', label: 'KIDS' },
    { value: 'FAMILY', label: 'FAMILY' },
]

const ContentEdit = ({
    onDrawerClose,
    editData,
    setMessage,
    setlog,
    ContentType,
    Language,
    Censorship,
    Genre,
    SubGenre,
}) => {
    const token = useSelector((state) => state.auth.session.token)

    const AddContent = async (values, token) => {
        try {
            const resp = await PostContent(values, token)
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
    const EditContent = async (values, token) => {
        try {
            const resp = await PutContent(values, token)
            console.log(resp)
            if (resp.data.msg === 'Updated') {
                setlog('success')
                setMessage('Data Updated Successfully')
                return
            } else if (resp.data.msg === 'Entity is Already Exists') {
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
                    ContentCode: editData.ContentCode,
                    ContentName: editData.ContentName,
                    ShortName: editData.ShortName,
                    ERPCode: editData.ERPCode,
                    ContentTypeCode:
                        editData.ContentType?.ContentTypeCode || '',
                    LanguageCode: editData.Language?.LanguageCode || '',
                    CensorshipCode: editData.Censorship?.CensorshipCode || '',
                    FPCReleaseDate:
                        editData.FPCReleaseDate?.FPCReleaseDate || '',
                    SlotDuration: editData.SlotDuration,
                    GenreCode: editData.Genre?.GenreCode || '',
                    SubGenreCode: editData.SubGenre?.SubGenreCode || '',
                    TxMasterCode: editData.TxMasterCode,

                    IsActive: editData.IsActive === 1 ? true : false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    setTimeout(() => {
                        alert('hh')
                        if (!editData.ContentCode) {
                            new Promise((resolve, reject) => {
                                AddContent(values, token)
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
                                EditContent(values, token)
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
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                <Field
                                    size="sm"
                                    type="ContentCode"
                                    autoComplete="off"
                                    name="ContentCode"
                                    placeholder="ContentCode name"
                                    component={Input}
                                    hidden
                                />
                                <FormItem
                                    asterisk
                                    label="ContentName"
                                    invalid={
                                        errors.ContentName &&
                                        touched.ContentName
                                    }
                                    errorMessage={errors.ContentName}
                                >
                                    <Field
                                        type="ContentName"
                                        autoComplete="off"
                                        name="ContentName"
                                        placeholder="Content Name"
                                        component={Input}
                                    />
                                </FormItem>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormItem
                                    asterisk
                                    label="ShortName"
                                    invalid={
                                        errors.ShortName && touched.ShortName
                                    }
                                    errorMessage={errors.ShortName}
                                >
                                    <Field
                                        type="ShortName"
                                        autoComplete="off"
                                        name="ShortName"
                                        placeholder="Short Name"
                                        component={Input}
                                    />
                                </FormItem>

                                <FormItem
                                    asterisk
                                    label="ERPCode"
                                    invalid={errors.ERPCode && touched.ERPCode}
                                    errorMessage={errors.ERPCode}
                                >
                                    <Field
                                        type="ERPCode"
                                        autoComplete="off"
                                        name="ERPCode"
                                        placeholder="ERPCode"
                                        component={Input}
                                    />
                                </FormItem>

                                <FormItem
                                    asterisk
                                    label="ContentType"
                                    invalid={
                                        errors.ContentTypeCode &&
                                        touched.ContentTypeCode
                                    }
                                    errorMessage={errors.ContentTypeCode}
                                    style={{ width: '250px' }}
                                >
                                    <Field
                                        size="sm"
                                        name="ContentTypeCode"
                                        style={{ width: '250px' }}
                                    >
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: '250px' }}
                                                field={field}
                                                form={form}
                                                className="mb-4 w-50"
                                                options={ContentType}
                                                value={ContentType.filter(
                                                    (option) =>
                                                        option.value ===
                                                        values.ContentTypeCode
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
                                    asterisk
                                    label="ContentClassification"
                                    invalid={
                                        errors.ClassificationCode &&
                                        touched.ClassificationCode
                                    }
                                    errorMessage={errors.ClassificationCode}
                                    style={{ width: '250px' }}
                                >
                                    <Field
                                        name="ContentClassification"
                                        style={{ width: '250px' }}
                                    >
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: '250px' }}
                                                field={field}
                                                form={form}
                                                className="mb-4 w-50"
                                                options={options2}
                                                value={options2.filter(
                                                    (option) =>
                                                        option.value ===
                                                        values.ClassificationCode
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
                                    asterisk
                                    label="Audience"
                                    invalid={
                                        errors.Audience && touched.Audience
                                    }
                                    errorMessage={errors.Audience}
                                    style={{ width: '250px' }}
                                >
                                    <Field
                                        name="Audience"
                                        style={{ width: '250px' }}
                                    >
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: '250px' }}
                                                field={field}
                                                form={form}
                                                className="mb-4 w-50"
                                                options={options3}
                                                value={options3.filter(
                                                    (option) =>
                                                        option.value ===
                                                        values.Audience
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
                                    asterisk
                                    label="Language"
                                    invalid={
                                        errors.LanguageCode &&
                                        touched.LanguageCode
                                    }
                                    errorMessage={errors.LanguageCode}
                                    style={{ width: '250px' }}
                                >
                                    <Field
                                        size="sm"
                                        name="Language"
                                        style={{ width: '250px' }}
                                    >
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: '250px' }}
                                                field={field}
                                                form={form}
                                                className="mb-4 w-50"
                                                options={Language}
                                                value={Language.filter(
                                                    (option) =>
                                                        option.value ===
                                                        values.LanguageCode
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
                                    asterisk
                                    label="Censorship"
                                    invalid={
                                        errors.CensorshipCode &&
                                        touched.CensorshipCode
                                    }
                                    errorMessage={errors.CensorshipCode}
                                    style={{ width: '250px' }}
                                >
                                    <Field
                                        size="sm"
                                        name="Censorship"
                                        style={{ width: '250px' }}
                                    >
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: '250px' }}
                                                field={field}
                                                form={form}
                                                className="mb-4 w-50"
                                                options={Censorship}
                                                value={Censorship.filter(
                                                    (option) =>
                                                        option.value ===
                                                        values.CensorshipCode
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

export default ContentEdit
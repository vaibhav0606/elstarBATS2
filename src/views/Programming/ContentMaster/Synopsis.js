import {
    FormItem,
    Button,
    Switcher,
    Input,
    FormContainer,
    Select,
    DatePicker,
    FormItemcompact,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { PostContent, PutContent } from 'services/ProgrammingService'
import { useSelector } from 'react-redux'
import { HiCake } from 'react-icons/hi'
import Checkbox from 'components/ui/Checkbox'

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

const VideoTypePara = [
    { value: 'HD', label: 'HD' },
    { value: 'SD', label: 'SD' },
]

const AspectRatioPara = [
    { value: '16:9', label: '16:9' },
    { value: '4:3', label: '4:3' },
]

const Synopsis = ({ onDrawerClose, editData, setMessage, setlog }) => {
    const token = useSelector((state) => state.auth.session.token)

    const onCheck = (value, e) => {
        console.log(value, e)
    }

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

                                <FormItemcompact
                                    label="Synopsis"
                                    invalid={
                                        errors.Synopsis && touched.Synopsis
                                    }
                                    errorMessage={errors.Synopsis}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="Synopsis"
                                        placeholder="Synopsis"
                                        component={Input}
                                        textArea
                                    />
                                </FormItemcompact>
                                <FormItemcompact
                                    label="Generic Synopsis"
                                    invalid={
                                        errors.GenericSynopsis &&
                                        touched.GenericSynopsis
                                    }
                                    errorMessage={errors.GenericSynopsis}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="GenericSynopsis"
                                        placeholder="Generic Synopsis"
                                        component={Input}
                                        textArea
                                    />
                                </FormItemcompact>

                                <FormItemcompact
                                    label="EPG Content Name"
                                    invalid={
                                        errors.EPGContentName &&
                                        touched.EPGContentName
                                    }
                                    errorMessage={errors.EPGContentName}
                                >
                                    <Field
                                        type="EPGContentName"
                                        autoComplete="off"
                                        name="EPGContentName"
                                        placeholder="EPG Content Name"
                                        component={Input}
                                    />
                                </FormItemcompact>

                                <FormItemcompact
                                    label="Meta Data"
                                    invalid={
                                        errors.MetaData && touched.MetaData
                                    }
                                    errorMessage={errors.MetaData}
                                >
                                    <Field
                                        type="MetaData"
                                        autoComplete="off"
                                        name="MetaData"
                                        placeholder="Meta Data"
                                        component={Input}
                                    />
                                </FormItemcompact>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormItemcompact
                                    asterisk
                                    label="InHouse/OutHouse"
                                    invalid={
                                        errors.InHouseOutHouse &&
                                        touched.InHouseOutHouse
                                    }
                                    errorMessage={errors.InHouseOutHouse}
                                >
                                    <div>
                                        <Field
                                            name="InHouseOutHouse"
                                            component={Switcher}
                                        />
                                    </div>
                                </FormItemcompact>

                                <FormItemcompact
                                    //asterisk
                                    label=" "
                                    invalid={
                                        errors.GroupName && touched.GroupName
                                    }
                                    errorMessage={errors.GroupName}
                                >
                                    <div>
                                        <Checkbox
                                            defaultChecked
                                            onChange={onCheck}
                                        >
                                            Is Group Name
                                        </Checkbox>
                                    </div>
                                </FormItemcompact>

                                <FormItemcompact
                                    asterisk
                                    label="Video Type"
                                    invalid={
                                        errors.VideoTypeCode &&
                                        touched.VideoTypeCode
                                    }
                                    errorMessage={errors.VideoTypeCode}
                                    style={{ width: '250px' }}
                                >
                                    <Field
                                        size="sm"
                                        name="VideoTypeCode"
                                        style={{ width: '250px' }}
                                    >
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: '250px' }}
                                                field={field}
                                                form={form}
                                                options={VideoTypePara}
                                                value={VideoTypePara.filter(
                                                    (option) =>
                                                        option.value ===
                                                        values.VideoTypeCode
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
                                </FormItemcompact>

                                <FormItemcompact
                                    asterisk
                                    label="Colored/B&W"
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
                                </FormItemcompact>

                                <FormItemcompact
                                    //asterisk
                                    label=" "
                                    invalid={
                                        errors.IgnoreRODPSpots &&
                                        touched.IgnoreRODPSpots
                                    }
                                    errorMessage={errors.IgnoreRODPSpots}
                                >
                                    <div>
                                        <Checkbox
                                            defaultChecked
                                            onChange={onCheck}
                                        >
                                            Is Ignore RODP Spots
                                        </Checkbox>
                                    </div>
                                </FormItemcompact>

                                <FormItemcompact
                                    asterisk
                                    label="Aspect Radio"
                                    invalid={
                                        errors.AspectRatio &&
                                        touched.AspectRatio
                                    }
                                    errorMessage={errors.AspectRatio}
                                    style={{ width: '250px' }}
                                >
                                    <Field
                                        size="sm"
                                        name="AspectRatio"
                                        style={{ width: '250px' }}
                                    >
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: '250px' }}
                                                field={field}
                                                form={form}
                                                options={AspectRatioPara}
                                                value={AspectRatioPara.filter(
                                                    (option) =>
                                                        option.value ===
                                                        values.AspectRatio
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
                                </FormItemcompact>

                                <FormItemcompact
                                    asterisk
                                    label="Recoreded/Live"
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
                                </FormItemcompact>

                                <FormItemcompact
                                    asterisk
                                    label="Default Seg#"
                                    invalid={
                                        errors.SlotDuration &&
                                        touched.SlotDuration
                                    }
                                    errorMessage={errors.SlotDuration}
                                >
                                    <Field
                                        type="SlotDuration"
                                        autoComplete="off"
                                        name="SlotDuration"
                                        placeholder="Default Seg"
                                        component={Input}
                                    />
                                </FormItemcompact>

                                <FormItemcompact
                                    asterisk
                                    label="Default Seg Duration"
                                    invalid={
                                        errors.SlotDuration &&
                                        touched.SlotDuration
                                    }
                                    errorMessage={errors.SlotDuration}
                                >
                                    <Field
                                        type="SlotDuration"
                                        autoComplete="off"
                                        name="SlotDuration"
                                        placeholder="Default Seg Duration"
                                        component={Input}
                                    />
                                </FormItemcompact>
                            </div>

                            <FormItemcompact>
                                <Button variant="solid" type="submit">
                                    Submit
                                </Button>
                            </FormItemcompact>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Synopsis

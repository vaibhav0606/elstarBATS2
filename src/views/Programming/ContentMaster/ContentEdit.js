import {
    FormItem,
    Button,
    Switcher,
    Input,
    FormContainer,
    Select,
    DatePicker,
    FormItemcompact,
    Card,
} from 'components/ui'
import { apiGetLanguagemaster } from 'services/MasterService'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import {
    PostContent,
    PutContent,
    apiGetContentmaster,
    apiGetContentTypemaster,
    apiGetCensorshipmaster,
    apiGetGenremaster,
    apiGetSubGenremaster,
} from 'services/ProgrammingService'

import { useSelector } from 'react-redux'
import { HiCake, HiOutlineSearch } from 'react-icons/hi'
import React, { useState, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Imgimdb from '../../../assets/img/imdb.png'
import './img.css'
import { Container } from 'components/shared'
import HeaderExtra from 'views/Controls/HeaderExtra'
import { headerExtraContent } from 'views/Controls/HeaderBox'
import SeasonMapping from './SeasonMapping'
import MapChannel from './MapChannel'

const validationSchema = Yup.object().shape({
    ContentName: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('ContentName Required'),
    ShortName: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('ShortName Required'),
    // ERPCode: Yup.string()
    //     .min(3, 'Too Short!')
    //     .max(200, 'Too Long!')
    //     .required('ERPCode Required'),
    ContentTypeCode: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('ContentType Required'),
    Audience: Yup.string().required('Audience Required'),
    ClassificationCode: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('ClassificationCode Required'),
    LanguageCode: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('LanguageCode Required'),
    FPCReleaseDate: Yup.string()
        .min(3, 'Too Short!')
        .max(200, 'Too Long!')
        .required('FPCReleaseDate Required'),
    SlotDuration: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('SlotDuration Required'),
    // GenreCode: Yup.string()
    //     .min(3, 'Too Short!')
    //     .max(50, 'Too Long!')
    //     .required('GenreCode Required'),
    // SubGenreCode: Yup.string()
    //     .min(3, 'Too Short!')
    //     .max(50, 'Too Long!')
    //     .required('SubGenreCode Required'),
    CensorshipCode: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('CensorshipCode Required'),
    // TxMasterCode: Yup.string()
    //     .min(3, 'Too Short!')
    //     .max(50, 'Too Long!')
    //     .required('TxMasterCode Required'),

    IsActive: Yup.string().required('IsActives Required'),
    rememberMe: Yup.bool(),
})

const options2 = [
    { value: 0, label: 'EPISODIC' },
    { value: 1, label: 'NONEPISODIC' },
]
const options3 = [
    { value: 'GENERAL', label: 'GENERAL' },
    { value: 'ADULTS', label: 'ADULTS' },
    { value: 'FEMALES', label: 'FEMALES' },
    { value: 'MALES', label: 'MALES' },
    { value: 'KIDS', label: 'KIDS' },
    { value: 'FAMILY', label: 'FAMILY' },
]

const TxTypeName = [
    { value: 'CENSORED', label: 'CENSORED' },
    { value: 'DUBBED', label: 'DUBBED' },
    { value: 'LIVE', label: 'LIVE' },
    { value: 'NORMAL', label: 'NORMAL' },
    { value: 'SUBTITLE', label: 'SUBTITLE' },
]

const ContentDemo = [{ value: '', label: 'Data Not Found' }]

const ContentEdit = (
    {
        // onDrawerClose,
        // editData,
        // setMessage,
        // setlog,
        //ContentType,
        // Language,
        // Censorship,
        // Genre,
        // SubGenre,
    }
) => {
    const token = useSelector((state) => state.auth.session.token)
    const { state } = useLocation()

    const AddContent = async (values, token) => {
        try {
            const resp = await PostContent(values, token)
            if (resp.data.msg === 'success') {
                // setlog('success')
                // setMessage('Data Inserted Successfully')
                return
            } else if (resp.data.msg === 'Server Error') {
                // setlog('error')
                // setMessage('Server Error')
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
                // setlog('success')
                // setMessage('Data Updated Successfully')
                return
            } else if (resp.data.msg === 'Entity is Already Exists') {
                // setlog('warning')
                // setMessage(resp.data.msg)
                return
            }
        } catch (errors) {
            return {}
        }
    }

    const [data, setdata] = useState([''])
    const [ContentType, setContentType] = useState({ value: '', label: '' })
    const [Language, setLanguage] = useState({ value: '', label: '' })
    const [Genre, setGenre] = useState({ value: '', label: '' })
    const [SubGenre, setSubGenre] = useState({ value: '', label: '' })
    const [Censorship, setCensorship] = useState({ value: '', label: '' })
    const [editData, seteditData] = useState([''])
    const [globalFilter, setGlobalFilter] = useState('')

    useEffect(() => {
        ;(async (values) => {
            const Currency = await apiGetContentTypemaster(values)
            const formattedOptions = Currency.data.map((option) => ({
                value: option.ContentTypeCode,
                label: option.ContentTypeName,
            }))
            setContentType(formattedOptions)
        })()
        ;(async (values) => {
            const Language = await apiGetLanguagemaster(values)
            const formattedOptions = Language.data.map((option) => ({
                value: option.LanguageCode,
                label: option.LanguageName,
            }))
            setLanguage(formattedOptions)
        })()
        ;(async (values) => {
            const Censorship = await apiGetCensorshipmaster(values)
            const formattedOptions = Censorship.data.map((option) => ({
                value: option.CensorshipCode,
                label: option.CensorshipName,
            }))
            setCensorship(formattedOptions)
        })()
        ;(async (values) => {
            const Genre = await apiGetGenremaster(values)
            const formattedOptions = Genre.data.map((option) => ({
                value: option.GenreCode,
                label: option.GenreName,
            }))
            setGenre(formattedOptions)
        })()
        ;(async (values) => {
            const SubGenre = await apiGetSubGenremaster(values)
            const formattedOptions = SubGenre.data.map((option) => ({
                value: option.SubGenreCode,
                label: option.SubGenreName,
            }))
            setSubGenre(formattedOptions)
        })()
    }, [])

    return (
        <div>
            <Formik
                initialValues={{
                    ContentCode: state?.editData.ContentCode || '',
                    ContentName: state?.editData.ContentName || '',
                    ShortName: state?.editData.ShortName || '',
                    ERPCode: state?.editData.ERPCode || '',
                    ContentTypeCode:
                        state?.editData.ContentType?.ContentTypeCode || '',
                    LanguageCode: state?.editData.Language?.LanguageCode || '',
                    ClassificationCode:
                        state?.editData.Classification?.ClassificationCode ||
                        '',
                    FPCReleaseDate:
                        state?.editData.FPCReleaseDate?.FPCReleaseDate || '',
                    SlotDuration: state?.editData.SlotDuration || '',
                    GenreCode: state?.editData.Genre?.GenreCode || '',
                    SubGenreCode: state?.editData.SubGenre?.SubGenreCode || '',

                    CensorshipCode:
                        state?.editData.Censorship?.CensorshipCode || '',
                    TxMasterCode: state?.editData.TxMasterCode || '',

                    IsActive: state?.editData.IsActive === 1 ? true : false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    setTimeout(() => {
                        alert('hh')
                        if (!state?.editData.ContentCode) {
                            new Promise((resolve, reject) => {
                                AddContent(values, token)
                                    .then((response) => {
                                        // onDrawerClose(0, 0)
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
                                        // onDrawerClose(0, 0)
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
                        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4"> */}
                        <Card
                            headerExtra={headerExtraContent(
                                globalFilter,
                                setGlobalFilter,
                                Navigate,
                                editData
                            )}
                        >
                            <div className="inline-flex flex-wrap xl:flex gap-2">
                                
                                <FormContainer>
                                    
                                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4 ">
                                        <Card>
                                            <div className="grid grid-cols-4 md:grid-cols-4 gap-2">
                                                <div className="col-span-2">
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
                                                        asterisk
                                                        label="ContentName"
                                                        invalid={
                                                            errors.ContentName &&
                                                            touched.ContentName
                                                        }
                                                        errorMessage={
                                                            errors.ContentName
                                                        }
                                                    >
                                                        <Field
                                                            type="ContentName"
                                                            autoComplete="off"
                                                            name="ContentName"
                                                            placeholder="Content Name"
                                                            component={Input}
                                                        />
                                                    </FormItemcompact>
                                                </div>
                                                {/* loading={loading} onClick={onClick} */}
                                                <div className="col-span-2">
                                                    {/* <Button
                                                variant="solid"
                                                className="custom-button_img"
                                            >
                                                <img
                                                    src={Imgimdb}
                                                    alt="Button Icon"
                                                />
                                            </Button> */}
                                                    <FormItemcompact
                                                        label=""
                                                        invalid={
                                                            errors.ContentName &&
                                                            touched.ContentName
                                                        }
                                                        errorMessage={
                                                            errors.ContentName
                                                        }
                                                    >
                                                        <Button
                                                            className="mr-2 custom-button_img"
                                                            variant="solid"
                                                            icon={
                                                                <HiOutlineSearch />
                                                            }
                                                        >
                                                            <span>
                                                                <span>
                                                                    Search In IMDb
                                                                </span>
                                                            </span>
                                                        </Button>
                                                    </FormItemcompact>
                                                </div>

                                                <div className="col-span-2">
                                                    <FormItemcompact
                                                        asterisk
                                                        label="ShortName"
                                                        invalid={
                                                            errors.ShortName &&
                                                            touched.ShortName
                                                        }
                                                        errorMessage={
                                                            errors.ShortName
                                                        }
                                                    >
                                                        <Field
                                                            type="ShortName"
                                                            autoComplete="off"
                                                            name="ShortName"
                                                            placeholder="Short Name"
                                                            component={Input}
                                                        />
                                                    </FormItemcompact>

                                                    <FormItemcompact
                                                        asterisk
                                                        label="ContentType"
                                                        invalid={
                                                            errors.ContentTypeCode &&
                                                            touched.ContentTypeCode
                                                        }
                                                        errorMessage={
                                                            errors.ContentTypeCode
                                                        }
                                                        style={{
                                                            width: '250px',
                                                        }}
                                                    >
                                                        <Field
                                                            size="sm"
                                                            name="ContentTypeCode"
                                                            style={{
                                                                width: '250px',
                                                            }}
                                                        >
                                                            {({ field, form }) => (
                                                                <Select
                                                                    style={{
                                                                        width: '250px',
                                                                    }}
                                                                    field={field}
                                                                    form={form}
                                                                    options={
                                                                        ContentType
                                                                    }
                                                                    value={
                                                                        ContentType.length >
                                                                            0
                                                                            ? ContentType.filter(
                                                                                (
                                                                                    option
                                                                                ) =>
                                                                                    option.value ===
                                                                                    values.ContentTypeCode
                                                                            )
                                                                            : ContentDemo.filter(
                                                                                (
                                                                                    option
                                                                                ) =>
                                                                                    option.value ===
                                                                                    values.ReportingTo
                                                                            )
                                                                    }
                                                                    onChange={(
                                                                        option
                                                                    ) =>
                                                                        form.setFieldValue(
                                                                            field.name,
                                                                            option?.value
                                                                        )
                                                                    }
                                                                />
                                                            )}
                                                        </Field>
                                                    </FormItemcompact>
                                                </div>

                                                <div className="col-span-2">
                                                    <FormItemcompact
                                                        label="ERP Code"
                                                        invalid={
                                                            errors.ERPCode &&
                                                            touched.ERPCode
                                                        }
                                                        errorMessage={
                                                            errors.ERPCode
                                                        }
                                                    >
                                                        <Field
                                                            type="ERPCode"
                                                            autoComplete="off"
                                                            name="ERPCode"
                                                            placeholder="ERPCode"
                                                            component={Input}
                                                        />
                                                    </FormItemcompact>
                                                    <FormItemcompact
                                                        asterisk
                                                        label="Classification"
                                                        invalid={
                                                            errors.ClassificationCode &&
                                                            touched.ClassificationCode
                                                        }
                                                        errorMessage={
                                                            errors.ClassificationCode
                                                        }
                                                        style={{
                                                            width: '250px',
                                                        }}
                                                    >
                                                        <Field
                                                            name="ClassificationCode"
                                                            style={{
                                                                width: '250px',
                                                            }}
                                                        >
                                                            {({ field, form }) => (
                                                                <Select
                                                                    style={{
                                                                        width: '250px',
                                                                    }}
                                                                    field={field}
                                                                    form={form}
                                                                    options={
                                                                        options2
                                                                    }
                                                                    value={options2.filter(
                                                                        (option) =>
                                                                            option.value ===
                                                                            values.ClassificationCode
                                                                    )}
                                                                    onChange={(
                                                                        option
                                                                    ) =>
                                                                        form.setFieldValue(
                                                                            field.name,
                                                                            option?.value
                                                                        )
                                                                    }
                                                                />
                                                            )}
                                                        </Field>
                                                    </FormItemcompact>
                                                </div>

                                                <div className="col-span-2">
                                                    <FormItemcompact
                                                        asterisk
                                                        label="Audience"
                                                        invalid={
                                                            errors.Audience &&
                                                            touched.Audience
                                                        }
                                                        errorMessage={
                                                            errors.Audience
                                                        }
                                                        style={{
                                                            width: '250px',
                                                        }}
                                                    >
                                                        <Field
                                                            name="Audience"
                                                            style={{
                                                                width: '250px',
                                                            }}
                                                        >
                                                            {({ field, form }) => (
                                                                <Select
                                                                    style={{
                                                                        width: '250px',
                                                                    }}
                                                                    field={field}
                                                                    form={form}
                                                                    options={
                                                                        options3
                                                                    }
                                                                    value={options3.filter(
                                                                        (option) =>
                                                                            option.value ===
                                                                            values.Audience
                                                                    )}
                                                                    onChange={(
                                                                        option
                                                                    ) =>
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
                                                        label="Dur In Mins."
                                                        invalid={
                                                            errors.SlotDuration &&
                                                            touched.SlotDuration
                                                        }
                                                        errorMessage={
                                                            errors.SlotDuration
                                                        }
                                                    >
                                                        <Field
                                                            type="SlotDuration"
                                                            autoComplete="off"
                                                            name="SlotDuration"
                                                            placeholder="Slot Duration"
                                                            component={Input}
                                                        />
                                                    </FormItemcompact>
                                                </div>
                                                <div className="col-span-2">
                                                    <FormItemcompact
                                                        asterisk
                                                        label="Censorship"
                                                        invalid={
                                                            errors.CensorshipCode &&
                                                            touched.CensorshipCode
                                                        }
                                                        errorMessage={
                                                            errors.CensorshipCode
                                                        }
                                                        style={{
                                                            width: '250px',
                                                        }}
                                                    >
                                                        <Field
                                                            size="sm"
                                                            name="CensorshipCode"
                                                            style={{
                                                                width: '250px',
                                                            }}
                                                        >
                                                            {({ field, form }) => (
                                                                <Select
                                                                    style={{
                                                                        width: '250px',
                                                                    }}
                                                                    field={field}
                                                                    form={form}
                                                                    options={
                                                                        Censorship
                                                                    }
                                                                    value={
                                                                        ContentType.length >
                                                                            0
                                                                            ? ContentType.filter(
                                                                                (
                                                                                    option
                                                                                ) =>
                                                                                    option.value ===
                                                                                    values.CensorshipCode
                                                                            )
                                                                            : ContentDemo.filter(
                                                                                (
                                                                                    option
                                                                                ) =>
                                                                                    option.value ===
                                                                                    values.ReportingTo
                                                                            )
                                                                    }
                                                                    onChange={(
                                                                        option
                                                                    ) =>
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
                                                        label="Release Date"
                                                        invalid={
                                                            errors.FPCReleaseDate &&
                                                            touched.FPCReleaseDate
                                                        }
                                                        errorMessage={
                                                            errors.FPCReleaseDate
                                                        }
                                                    >
                                                        <Field
                                                            name="FPCReleaseDate"
                                                            placeholder="Date"
                                                        >
                                                            {({ field, form }) => (
                                                                <DatePicker
                                                                    field={field}
                                                                    form={form}
                                                                    value={
                                                                        field.value
                                                                    }
                                                                    prefix={
                                                                        <HiCake className="text-xl" />
                                                                    }
                                                                    onChange={(
                                                                        date
                                                                    ) => {
                                                                        form.setFieldValue(
                                                                            field.name,
                                                                            date
                                                                        )
                                                                    }}
                                                                />
                                                            )}
                                                        </Field>
                                                    </FormItemcompact>
                                                </div>

                                                <div className="col-span-2">
                                                    <FormItemcompact
                                                        label="Genre"
                                                        invalid={
                                                            errors.GenreCode &&
                                                            touched.GenreCode
                                                        }
                                                        errorMessage={
                                                            errors.GenreCode
                                                        }
                                                        style={{
                                                            width: '250px',
                                                        }}
                                                    >
                                                        <Field
                                                            size="sm"
                                                            name="GenreCode"
                                                            style={{
                                                                width: '250px',
                                                            }}
                                                        >
                                                            {({ field, form }) => (
                                                                <Select
                                                                    style={{
                                                                        width: '250px',
                                                                    }}
                                                                    field={field}
                                                                    form={form}
                                                                    options={Genre}
                                                                    value={
                                                                        ContentType.length >
                                                                            0
                                                                            ? ContentType.filter(
                                                                                (
                                                                                    option
                                                                                ) =>
                                                                                    option.value ===
                                                                                    values.GenreCode
                                                                            )
                                                                            : ContentDemo.filter(
                                                                                (
                                                                                    option
                                                                                ) =>
                                                                                    option.value ===
                                                                                    values.ReportingTo
                                                                            )
                                                                    }
                                                                    onChange={(
                                                                        option
                                                                    ) =>
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
                                                        label="Language"
                                                        invalid={
                                                            errors.LanguageCode &&
                                                            touched.LanguageCode
                                                        }
                                                        errorMessage={
                                                            errors.LanguageCode
                                                        }
                                                        style={{
                                                            width: '250px',
                                                        }}
                                                    >
                                                        <Field
                                                            size="sm"
                                                            name="LanguageCode"
                                                            style={{
                                                                width: '250px',
                                                            }}
                                                        >
                                                            {({ field, form }) => (
                                                                <Select
                                                                    style={{
                                                                        width: '250px',
                                                                    }}
                                                                    field={field}
                                                                    form={form}
                                                                    options={
                                                                        Language
                                                                    }
                                                                    value={
                                                                        ContentType.length >
                                                                            0
                                                                            ? ContentType.filter(
                                                                                (
                                                                                    option
                                                                                ) =>
                                                                                    option.value ===
                                                                                    values.LanguageCode
                                                                            )
                                                                            : ContentDemo.filter(
                                                                                (
                                                                                    option
                                                                                ) =>
                                                                                    option.value ===
                                                                                    values.ReportingTo
                                                                            )
                                                                    }
                                                                    onChange={(
                                                                        option
                                                                    ) =>
                                                                        form.setFieldValue(
                                                                            field.name,
                                                                            option?.value
                                                                        )
                                                                    }
                                                                />
                                                            )}
                                                        </Field>
                                                    </FormItemcompact>
                                                </div>
                                                <div className="col-span-2">
                                                    <FormItemcompact
                                                        label="SubGenre"
                                                        invalid={
                                                            errors.SubGenreCode &&
                                                            touched.SubGenreCode
                                                        }
                                                        errorMessage={
                                                            errors.SubGenreCode
                                                        }
                                                        style={{
                                                            width: '250px',
                                                        }}
                                                    >
                                                        <Field
                                                            size="sm"
                                                            name="SubGenreCode"
                                                            style={{
                                                                width: '250px',
                                                            }}
                                                        >
                                                            {({ field, form }) => (
                                                                <Select
                                                                    style={{
                                                                        width: '250px',
                                                                    }}
                                                                    field={field}
                                                                    form={form}
                                                                    options={
                                                                        SubGenre
                                                                    }
                                                                    value={
                                                                        ContentType.length >
                                                                            0
                                                                            ? ContentType.filter(
                                                                                (
                                                                                    option
                                                                                ) =>
                                                                                    option.value ===
                                                                                    values.SubGenreCode
                                                                            )
                                                                            : ContentDemo.filter(
                                                                                (
                                                                                    option
                                                                                ) =>
                                                                                    option.value ===
                                                                                    values.ReportingTo
                                                                            )
                                                                    }
                                                                    onChange={(
                                                                        option
                                                                    ) =>
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
                                                        label="TX Type name"
                                                        invalid={
                                                            errors.TxMasterCode &&
                                                            touched.TxMasterCode
                                                        }
                                                        errorMessage={
                                                            errors.TxMasterCode
                                                        }
                                                        style={{
                                                            width: '250px',
                                                        }}
                                                    >
                                                        <Select
                                                            isMulti
                                                            placeholder="Please Select"
                                                            options={TxTypeName}
                                                        />
                                                    </FormItemcompact>
                                                </div>
                                            </div>
                                        </Card>
                                       
                                        
                                        <Card>
                                      
                                            <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                                                <div className="col-span-2">
                                                    <MapChannel>

                                                    </MapChannel>
                                                </div>
                                                <div className="col-span-2">
                                                    <SeasonMapping>

                                                    </SeasonMapping>
                                                </div>
                                                
                                            </div>
                                        </Card>
                                        
                                        
                                    </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <FormItemcompact
                                                asterisk
                                                label="IsActive"
                                                invalid={
                                                    errors.IsActive &&
                                                    touched.IsActive
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
                                        </div>

                                        <br></br>
                                        <FormItemcompact>
                                            <Button variant="solid" type="submit">
                                                Submit
                                            </Button>
                                        </FormItemcompact>

                                        <div className="grid grid-cols-4 md:grid-cols-4 gap-2"></div>
                                   
                                </FormContainer>
                            
                            </div>
                        </Card>
                        {/* </div> */}
                    </Form>
                )}
            </Formik>
        </div>
    )

    
}

export default ContentEdit

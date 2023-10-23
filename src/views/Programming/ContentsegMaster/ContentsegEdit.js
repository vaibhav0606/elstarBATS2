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
import { Postcontentseg, Putcontentseg } from 'services/ProgrammingService'
import { useSelector } from 'react-redux'
import { HiCake } from 'react-icons/hi'

const validationSchema = Yup.object().shape({
    ContentCode: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('ContentCode Required'),
    OriginalRepeatCode: Yup.string()
        .min(6, 'Too Short!')
        .max(200, 'Too Long!')
        .required('OriginalRepeatCode Required'),
    SeasonNo: Yup.string()
        .min(3, 'Too Short!')
        .max(200, 'Too Long!')
        .required('SeasonNo Required'),
    EpisodeNo: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('EpisodeNo Required'),
    TapeID: Yup.string()
        .min(3, 'Too Short!')
        .max(200, 'Too Long!')
        .required('TapeID Required'),
    MaximumSegments: Yup.string()
        .min(3, 'Too Short!')
        .max(200, 'Too Long!')
        .required('MaximumSegments Required'),
    EpisodeCaption: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('EpisodeCaption Required'),
    Remarks: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Remarks Required'),
    VideoFormatTypeCode: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('VideoFormatTypeCode Required'),

    TXVersionCode: Yup.string()
        .min(3, 'Too Short!')
        .max(200, 'Too Long!')
        .required('TXVersionCode Required'),

    // PartNumber: Yup.string()
    //     .min(3, 'Too Short!')
    //     .max(50, 'Too Long!')
    //     .required('PartNumber Required'),
    // SubContentCode: Yup.string()
    //     .min(6, 'Too Short!')
    //     .max(200, 'Too Long!')
    //     .required('SubContentCode Required'),
    EpisodeDuration: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('EpisodeDuration Required'),
    // EpisodeDurationinMin: Yup.string()
    //     .min(3, 'Too Short!')
    //     .max(50, 'Too Long!')
    //     .required('EpisodeDurationinMin Required'),
    // VideoTypeCode: Yup.string()
    //     .min(3, 'Too Short!')
    //     .max(200, 'Too Long!')
    //     .required('VideoTypeCode Required'),
    // AspectRatioCode: Yup.string()
    //     .min(3, 'Too Short!')
    //     .max(50, 'Too Long!')
    //     .required('AspectRatioCode Required'),
    // AssetTypeCode: Yup.string()
    //     .min(3, 'Too Short!')
    //     .max(50, 'Too Long!')
    //     .required('AssetTypeCode Required'),
    // VideoSizeCode: Yup.string()
    //     .min(3, 'Too Short!')
    //     .max(50, 'Too Long!')
    //     .required('VideoSizeCode Required'),
    // ShortSynopsis: Yup.string()
    //     .min(3, 'Too Short!')
    //     .max(50, 'Too Long!')
    //     .required('ShortSynopsis Required'),
    // LongSynopsis: Yup.string()
    //     .min(3, 'Too Short!')
    //     .max(50, 'Too Long!')
    //     .required('LongSynopsis Required'),
    // IsReadyToBroadCast: Yup.string()
    //     .min(3, 'Too Short!')
    //     .max(50, 'Too Long!')
    //     .required('IsReadyToBroadCast Required'),

    IsActive: Yup.string().required('IsActives Required'),
    rememberMe: Yup.bool(),
})

const TapeTypePara = [
    { value: 'CD', label: 'CD' },
    { value: 'DV-60', label: 'DV-60' },
    { value: 'DVD', label: 'DVD' },
    { value: 'HARD DISK DRIVE', label: 'HARD DISK DRIVE' },
    { value: 'BETA', label: 'BETA' },
    { value: 'LTO', label: 'LTO' },
]
const ResolutionPara = [
    { value: '16:9', label: '16:9' },
    { value: '4:3', label: '4:3' },
]
const VideoFormateTypePara = [
    { value: '.mp3', label: '.mp3' },
    { value: '.mov', label: '.mov' },
    { value: '.mp4', label: '.mp4' },
]

const SegmentDemo = [{ value: '', label: 'Data Not Found' }]

const ContentsegEdit = ({
    onDrawerClose,
    editData,
    setMessage,
    setlog,
    ContentType,
    ContentName,
    ORGRep,
    SeasonNo,
    EpisodNo,
    TapeType,
    TXVersion,
}) => {
    const token = useSelector((state) => state.auth.session.token)

    const AddContentSeg = async (values, token) => {
        try {
            const resp = await Postcontentseg(values, token)
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
    const EditContentSeg = async (values, token) => {
        try {
            const resp = await Putcontentseg(values, token)
            console.log(resp)
            if (resp.data.msg === 'Updated') {
                setlog('success')
                setMessage('Data Updated Successfully')
                return
            } else if (resp.data.msg === 'Segment is Already Exists') {
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
                    SegmentCode: editData.SegmentCode,
                    ContentCode: editData.ContentCode || '',
                    OriginalRepeatCode: editData.OriginalRepeatCode || '',
                    SeasonNo: editData.SeasonNo || '',
                    EpisodeNo: editData.EpisodeNo || '',
                    HouseID: editData.HouseID || '',
                    //TapeType
                    MaximumSegments: editData.MaximumSegments,
                    TapeID: editData.TapeID || '',
                    TXVersionCode: editData.TXVersionCode || '',
                    // Resolution Type.
                    VideoFormatTypeCode: editData.VideoFormatTypeCode || '',
                    //Video Formate Type
                    EpisodeDuration: editData.EpisodeDuration,
                    EpisodeCaption: editData.EpisodeCaption,
                    Remarks: editData.Remarks,
                    IsActive: editData.IsActive === 1 ? true : false,

                    // PartNumber: editData.PartNumber,
                    // SubContentCode: editData.SubContentCode,
                    // AspectRatioCode: editData.AspectRatioCode,
                    // AssetTypeCode: editData.AssetTypeCode,
                    // VideoSizeCode: editData.VideoSizeCode,
                    // VideoTypeCode: editData.VideoTypeCode || '',
                    // ShortSynopsis: editData.ShortSynopsis,
                    // LongSynopsis: editData.LongSynopsis,
                    // IsReadyToBroadCast: editData.IsReadyToBroadCast,
                    // EpisodeDurationinMin: editData.EpisodeDurationinMin,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    setTimeout(() => {
                        alert('hh')
                        if (!editData.ContentCode) {
                            new Promise((resolve, reject) => {
                                AddContentSeg(values, token)
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
                                EditContentSeg(values, token)
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        name="ContentCode"
                                        style={{ width: '250px' }}
                                    >
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: '250px' }}
                                                field={field}
                                                form={form}
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
                                </FormItemcompact>

                                <FormItemcompact
                                    asterisk
                                    label="ContentName"
                                    invalid={
                                        errors.ContentCode &&
                                        touched.ContentCode
                                    }
                                    errorMessage={errors.ContentCode}
                                    style={{ width: '250px' }}
                                >
                                    <Field
                                        size="sm"
                                        name="ContentName"
                                        style={{ width: '250px' }}
                                    >
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: '250px' }}
                                                field={field}
                                                form={form}
                                                options={
                                                    ContentName.length > 0
                                                        ? ContentName
                                                        : SegmentDemo
                                                }
                                                value={
                                                    ContentName.length > 0
                                                        ? ContentName.filter(
                                                              (option) =>
                                                                  option.value ===
                                                                  values.ContentCode
                                                          )
                                                        : SegmentDemo.filter(
                                                              (option) =>
                                                                  option.value ===
                                                                  values.ReportingTo
                                                          )
                                                }
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

                                {/* OriginalRepeatName */}
                                <FormItemcompact
                                    asterisk
                                    label="Original/Repeat"
                                    invalid={
                                        errors.OriginalRepeatCode &&
                                        touched.OriginalRepeatCode
                                    }
                                    errorMessage={errors.OriginalRepeatCode}
                                    style={{ width: '250px' }}
                                >
                                    <Field
                                        size="sm"
                                        name="OriginalRepeatName"
                                        style={{ width: '250px' }}
                                    >
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: '250px' }}
                                                field={field}
                                                form={form}
                                                options={
                                                    ORGRep.length > 0
                                                        ? ORGRep
                                                        : SegmentDemo
                                                }
                                                value={
                                                    ORGRep.length > 0
                                                        ? ORGRep.filter(
                                                              (option) =>
                                                                  option.value ===
                                                                  values.OriginalRepeatCode
                                                          )
                                                        : SegmentDemo.filter(
                                                              (option) =>
                                                                  option.value ===
                                                                  values.ReportingTo
                                                          )
                                                }
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

                                {/* SeasonNo */}
                                {/* <FormItemcompact
                                    asterisk
                                    label="ContentName"
                                    invalid={
                                        errors.ContentCode &&
                                        touched.ContentCode
                                    }
                                    errorMessage={errors.ContentCode}
                                    style={{ width: '250px' }}
                                >
                                    <Field
                                        size="sm"
                                        name="ContentName"
                                        style={{ width: '250px' }}
                                    >
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: '250px' }}
                                                field={field}
                                                form={form}
                                                options={
                                                    ContentName.length > 0
                                                        ? ContentName
                                                        : SegmentDemo
                                                }
                                                value={
                                                    ContentName.length > 0
                                                        ? ContentName.filter(
                                                              (option) =>
                                                                  option.value ===
                                                                  values.ContentCode
                                                          )
                                                        : SegmentDemo.filter(
                                                              (option) =>
                                                                  option.value ===
                                                                  values.ReportingTo
                                                          )
                                                }
                                                onChange={(option) =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        option?.value
                                                    )
                                                }
                                            />
                                        )}
                                    </Field>
                                </FormItemcompact> */}

                                {/* EpisodNo */}
                                {/* <FormItemcompact
                                    asterisk
                                    label="ContentName"
                                    invalid={
                                        errors.ContentCode &&
                                        touched.ContentCode
                                    }
                                    errorMessage={errors.ContentCode}
                                    style={{ width: '250px' }}
                                >
                                    <Field
                                        size="sm"
                                        name="ContentName"
                                        style={{ width: '250px' }}
                                    >
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: '250px' }}
                                                field={field}
                                                form={form}
                                                options={
                                                    ContentName.length > 0
                                                        ? ContentName
                                                        : SegmentDemo
                                                }
                                                value={
                                                    ContentName.length > 0
                                                        ? ContentName.filter(
                                                              (option) =>
                                                                  option.value ===
                                                                  values.ContentCode
                                                          )
                                                        : SegmentDemo.filter(
                                                              (option) =>
                                                                  option.value ===
                                                                  values.ReportingTo
                                                          )
                                                }
                                                onChange={(option) =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        option?.value
                                                    )
                                                }
                                            />
                                        )}
                                    </Field>
                                </FormItemcompact> */}

                                <FormItemcompact
                                    asterisk
                                    label="Tape Type"
                                    invalid={
                                        errors.TapeTypePara &&
                                        touched.TapeTypePara
                                    }
                                    errorMessage={errors.TapeTypePara}
                                    style={{ width: '250px' }}
                                >
                                    <Field
                                        name="Tape Type"
                                        style={{ width: '250px' }}
                                    >
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: '250px' }}
                                                field={field}
                                                form={form}
                                                options={TapeTypePara}
                                                value={TapeTypePara.filter(
                                                    (option) =>
                                                        option.value ===
                                                        values.TapeTypePara
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
                                    label="MaxSegment"
                                    invalid={
                                        errors.MaximumSegments &&
                                        touched.MaximumSegments
                                    }
                                    errorMessage={errors.ShortName}
                                >
                                    <Field
                                        type="MaximumSegments"
                                        autoComplete="off"
                                        name="Maximum Segments"
                                        placeholder="Maximum Segments"
                                        component={Input}
                                    />
                                </FormItemcompact>

                                <FormItemcompact
                                    asterisk
                                    label="HouseID"
                                    invalid={errors.HouseID && touched.HouseID}
                                    errorMessage={errors.HouseID}
                                >
                                    <Field
                                        type="HouseID"
                                        autoComplete="off"
                                        name="HouseID"
                                        placeholder="HouseID"
                                        component={Input}
                                    />
                                </FormItemcompact>

                                <FormItemcompact
                                    asterisk
                                    label="Tape ID"
                                    invalid={errors.TapeID && touched.TapeID}
                                    errorMessage={errors.TapeID}
                                >
                                    <Field
                                        type="TapeID"
                                        autoComplete="off"
                                        name="TapeID"
                                        placeholder="Tape ID"
                                        component={Input}
                                    />
                                </FormItemcompact>

                                <FormItemcompact
                                    asterisk
                                    label="TXVersionCode"
                                    invalid={
                                        errors.TXVersionCode &&
                                        touched.TXVersionCode
                                    }
                                    errorMessage={errors.TXVersionCode}
                                    style={{ width: '250px' }}
                                >
                                    <Field
                                        size="sm"
                                        name="ContentCode"
                                        style={{ width: '250px' }}
                                    >
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: '250px' }}
                                                field={field}
                                                form={form}
                                                options={TXVersion}
                                                value={TXVersion.filter(
                                                    (option) =>
                                                        option.value ===
                                                        values.TXVersionCode
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
                                    label="Resolution"
                                    invalid={
                                        errors.ResolutionPara &&
                                        touched.ResolutionPara
                                    }
                                    errorMessage={errors.ResolutionPara}
                                    style={{ width: '250px' }}
                                >
                                    <Field
                                        name="Resolution"
                                        style={{ width: '250px' }}
                                    >
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: '250px' }}
                                                field={field}
                                                form={form}
                                                options={ResolutionPara}
                                                value={ResolutionPara.filter(
                                                    (option) =>
                                                        option.value ===
                                                        values.ResolutionPara
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
                                    label="Video Formate Type"
                                    invalid={
                                        errors.VideoFormateTypePara &&
                                        touched.VideoFormateTypePara
                                    }
                                    errorMessage={errors.VideoFormateTypePara}
                                    style={{ width: '250px' }}
                                >
                                    <Field
                                        name="Resolution"
                                        style={{ width: '250px' }}
                                    >
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: '250px' }}
                                                field={field}
                                                form={form}
                                                options={VideoFormateTypePara}
                                                value={VideoFormateTypePara.filter(
                                                    (option) =>
                                                        option.value ===
                                                        values.VideoFormateTypePara
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
                                    label="Slot Duration"
                                    invalid={
                                        errors.EpisodeDuration &&
                                        touched.EpisodeDuration
                                    }
                                    errorMessage={errors.EpisodeDuration}
                                >
                                    <Field
                                        type="EpisodeDuration"
                                        autoComplete="off"
                                        name="EpisodeDuration"
                                        placeholder="Slot Duration"
                                        component={Input}
                                    />
                                </FormItemcompact>

                                <FormItemcompact
                                    asterisk
                                    label="Episode Caption"
                                    invalid={
                                        errors.EpisodeCaption &&
                                        touched.EpisodeCaption
                                    }
                                    errorMessage={errors.EpisodeCaption}
                                >
                                    <Field
                                        type="EpisodeCaption"
                                        autoComplete="off"
                                        name="EpisodeCaption"
                                        placeholder="Episode Caption"
                                        component={Input}
                                    />
                                </FormItemcompact>

                                <FormItemcompact
                                    asterisk
                                    label="Remarks"
                                    invalid={errors.Remarks && touched.Remarks}
                                    errorMessage={errors.Remarks}
                                >
                                    <Field
                                        type="Remarks"
                                        autoComplete="off"
                                        name="Remarks"
                                        placeholder="Remarks"
                                        component={Input}
                                    />
                                </FormItemcompact>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <FormItemcompact
                                    asterisk
                                    label="Ready To BroadCast"
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
                            </div>
                            <br></br>
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

export default ContentsegEdit

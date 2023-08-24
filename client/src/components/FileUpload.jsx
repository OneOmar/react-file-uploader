import { useState } from 'react'
import axios from 'axios'
import Message from './Message'
import ProgressBar from './ProgressBar'

export const FileUpload = () => {

    const [file, setFile] = useState('')
    const [fileName, setFileName] = useState('Choose file')
    const [uploadedFile, setUploadedFile] = useState({})
    const [message, setMessage] = useState({ type: '', content: '' })
    const [uploadPercentage, setUploadPercentage] = useState(0)


    const onChange = e => {
        // console.log(e.target.files)
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
    }

    const onSubmit = async e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(
                        parseInt(
                            Math.round((progressEvent.loaded / progressEvent.total) * 100)
                        )
                    )
                }
            })

            // Clear percentage
            setTimeout(() => setUploadPercentage(0), 10000)

            const { fileName, filePath } = res.data
            setUploadedFile({ fileName, filePath })
            setMessage({
                type: 'success',
                content: 'File Uploaded'
            })

        } catch (err) {
            if (err.response.status === 500) {
                setMessage({
                    type: 'danger',
                    content: 'Server Error'
                })
            } else {
                setMessage({
                    type: 'danger',
                    content: err.response.data.msg
                })
            }
            setUploadPercentage(0)
        }
    }

    return <>
        {message.content ? <Message msg={message} /> : null}
        <form onSubmit={onSubmit}>
            <div className='mb-4'>
                <label htmlFor='formFile' className='form-label'>{fileName}</label>
                <input className='form-control' type='file' id='formFile' onChange={onChange} />
            </div>
            <input type='submit' value='Upload' className='btn btn-primary' />
        </form>

        <ProgressBar percentage={uploadPercentage} />

        {uploadedFile ? (
            <div className='mt-4'>
                <h3 className='text-center'>{uploadedFile.fileName}</h3>
                <img style={{ width: '100%' }} src={uploadedFile.filePath} alt={uploadedFile.fileName} />
            </div>
        ) : null}
    </>
}

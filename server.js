import express from 'express'
import fileUpload from 'express-fileupload'

import { fileURLToPath } from 'url'
import path from 'path'

//  returns the absolute path
const __filename = fileURLToPath(import.meta.url)
// remove the file name from the path
const __dirname = path.dirname(__filename)

const app = express()

app.use(fileUpload())

// Upload Endpoint
app.post('/upload', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' })
    }

    const file = req.files.file

    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if (err) {
            console.error(err)
            return res.status(500).send(err)
        }

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
    })
})

app.listen(5000, () => console.log('Server Started...'))

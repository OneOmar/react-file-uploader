import './App.css'
import { FileUpload } from './components/FileUpload'

function App() {
  return (
    <div className='App container mt-4' style={{ maxWidth: '600px' }}>
      <h1 className='text-center mb-4'>React File Upload</h1>
      <FileUpload />
    </div>
  )
}

export default App

import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ReactQuillEditor = ({ text, changeText }) => {
  return (
    <ReactQuill theme="snow" value={text} onChange={changeText} className='max-w-3xl' />
  )
}

export default ReactQuillEditor
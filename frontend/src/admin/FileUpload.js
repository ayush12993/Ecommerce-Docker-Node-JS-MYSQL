import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(res.data);
      // You can handle the response here, e.g., display uploaded file information
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  return (
    <div>
      <h3>Upload File</h3>
      <form onSubmit={onSubmit}>
        <div>
          <input type="file" onChange={onChange} />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default FileUpload;

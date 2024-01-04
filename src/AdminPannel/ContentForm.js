// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from "react-toastify";
// import "../styles/Contentform.css";
// function ContentForm() {
//   const navigate = useNavigate();
//   const [category, setCategory] = useState('');
//   const [title, setTitle] = useState('');
//   const [video, setVideo] = useState('');
//   const [editor, setEditor] = useState('');
//   const [file, setFile] = useState('');
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!category || !['Assignments', 'Theory Topics', 'Interview questions', 'Recent trends'].includes(category)) {
//       alert('Please select a valid category.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('category', category);
//     formData.append('title', title);
//     formData.append('video', video);
//     formData.append('editor', editor);
//     formData.append('file', file);

//     try {
//       const response = await axios.post('http://localhost:8080/api/assignment/addContent', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       console.log(response);

//       if (response.data.message === 'Data Added successfully') {
//         toast.success("Data Added Successfully", {
//           position: toast.POSITION.TOP_CENTER,
//         });

//         // Clear form fields by resetting the state
//         setCategory('');
//         setTitle('');
//         setVideo('');
//         setEditor('');
//         setFile('');
//       }
//     } catch (error) {
//       // Handle errors here
//       console.error("Error occurred while adding data:", error);
//       toast.error("Failed to add data. Please try again later.", {
//         position: toast.POSITION.TOP_CENTER,
//       });
//     }
//   };

//   const DashBoradHandler = () => {
//     navigate("/AdminPanel/user-profile");
//   };

//   return (
//     <div className='form-main'>
//       <h2>Add Content</h2>
//       <form className='form' onSubmit={handleSubmit}>
//         <div className='row_input'>
//           <label><p>Category: <sup className='star'>*</sup> </p></label>
//           <select value={category} required onChange={(e) => setCategory(e.target.value)}>
//             <option value="">Select Category</option>
//             <option value="Assignments">Assignments</option>
//             <option value="Theory Topics">Theory Topics</option>
//             <option value="Interview questions">Interview questions</option>
//             <option value="Recent trends">Recent trends</option>
//           </select>
//         </div>
//         <div className='row_input'>
//           <label>Title :</label>
//           <input  placeholder='Enter the title'  type="text" value={title} required onChange={(e) => setTitle(e.target.value)} />
//         </div>
//         <div className='row_input'>
//           <label>Video:</label>
//           <input  placeholder='Video link' type="text" value={video} onChange={(e) => setVideo(e.target.value)} />
//         </div>

//         {
//   category === "Assignments" && (
//     <div className='row_input'>
//       <label>Editor:</label>
//       <select value={editor} onChange={(e) => setEditor(e.target.value)}>
//         <option value="">Select Editor</option>
//         <option value="https://www.onlinegdb.com/">Shell</option>
//         <option value="https://www.onlinegdb.com/">C Compiler</option>
//       </select>
      
//     </div>
//   )
// }

//         <div className='choose-file'>
//           <label>Notes (File):</label>
//           <input className='fille' type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//       <div>
//         <div><button className='Dashborad' onClick={DashBoradHandler}> DashBoard</button></div>
//       </div>
//     </div>
//   );
// }

// export default ContentForm;














import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/Contentform.css';

function ContentForm() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [videos, setVideos] = useState([]);
  const [editor, setEditor] = useState('');
  const [files, setFiles] = useState([]);
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !['Assignments', 'Theory Topics', 'Interview questions', 'Recent trends'].includes(category)) {
      alert('Please select a valid category.');
      return;
    }

    const formData = new FormData();
    formData.append('category', category);
    formData.append('title', title);
    formData.append('editor', editor);

   //     // Append multiple videos as a comma-separated string
    formData.append('videos', videos.join(','));


    // Append each file to the formData
    const filesArray = [...files];
    
       filesArray.forEach((file) => formData.append('files', file));

    try {
      const response = await axios.post('https://osl-backend.onrender.com/api/assignment/addContent', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      

      console.log(response);

      if (response.data.message === 'Data Added successfully') {
        Swal.fire({
          icon: 'success',
          title: 'Data Added Successfully',
          position: 'top-center',
        });

        // Clear form fields by resetting the state
         setCategory('');
         setTitle('');
         setVideos([]);
         setEditor('');
         setFiles([]);
        
      }
    } catch (error) {
      // Handle errors here
      console.error('Error occurred while adding data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to add data. Please try again later.',
        position: 'top-center',
      });
    }
  };

  const DashBoradHandler = () => {
    navigate('/AdminPanel/user-profile');
  };

  return (
    <div className='form-main'>
      <h2>Add Content</h2>
      <form className='form' onSubmit={handleSubmit}>
        <div className='row_input'>
          <label>
            <p>
              Category: <sup className='star'>*</sup>{' '}
            </p>
          </label>
          <select value={category} required onChange={(e) => setCategory(e.target.value)}>
            <option value=''>Select Category</option>
            <option value='Assignments'>Assignments</option>
            <option value='Theory Topics'>Theory Topics</option>
            <option value='Interview questions'>Interview questions</option>
            <option value='Recent trends'>Recent trends</option>
          </select>
        </div>
        <div className='row_input'>
          <label>Title :</label>
          <input placeholder='Enter the title' type='text' value={title} required onChange={(e) => setTitle(e.target.value)} />
        </div>
        

        {category === 'Assignments' && (
          <div className='row_input editor'>
            <label>Editor:</label>
            <select value={editor} onChange={(e) => setEditor(e.target.value)}>
              <option value=''>Select Editor</option>
              <option value='https://www.onlinegdb.com/online_bash_shell'>Shell</option>
              <option value='https://www.onlinegdb.com/online_c_compiler'>C Compiler</option>
            </select>
          </div>
        )}

        <div className='row_input'>
           <label>Video Links:</label>
          <input
               type="text"
               placeholder="Enter video links separated by commas"
               value={videos.join(',')}
               onChange={(e) => setVideos(e.target.value.split(','))}
           />
         </div>
         <div className='row_input'>
           <label>Notes (Files):</label>
           <input type="file" accept="application/pdf" multiple onChange={(e) => setFiles(e.target.files)} />
         </div>

        <button className='submit' type='submit'>
          Submit
        </button>
      </form>
      <div>
        <div>
          <button className='Dashborad' onClick={DashBoradHandler}>
            DashBoard
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContentForm;






// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function ContentForm() {
//   const navigate = useNavigate();
//   const [category, setCategory] = useState('');
//   const [title, setTitle] = useState('');
//   const [videos, setVideos] = useState([]); // Change from array to string for multiple links
//   const [editor, setEditor] = useState('');
//   const [files, setFiles] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!category || !['Assignments', 'Theory Topics', 'Interview questions', 'Recent trends'].includes(category)) {
//       alert('Please select a valid category.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('category', category);
//     formData.append('title', title);

//     // Append multiple videos as a comma-separated string
//     formData.append('videos', videos.join(','));

//     formData.append('editor', editor);

//     const filesArray = [...files];
    
//     filesArray.forEach((file) => formData.append('files', file));

//     try {
//       const response = await axios.post('http://localhost:8080/api/assignment/addContent', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       console.log(response);

//       if (response.data.message === 'Data Added successfully') {
//         alert('Uploaded Successfully!');
//         navigate('/assignments');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Add Content</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Category:</label>
//           <select value={category} onChange={(e) => setCategory(e.target.value)}>
//             <option value="">Select Category</option>
//             <option value="Assignments">Assignments</option>
//             <option value="Theory Topics">Theory Topics</option>
//             <option value="Interview questions">Interview questions</option>
//             <option value="Recent trends">Recent trends</option>
//           </select>
//         </div>
//         <div>
//           <label>Title:</label>
//           <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
//         </div>
//         <div>
//           <label>Editor:</label>
//           <input type="text" value={editor} onChange={(e) => setEditor(e.target.value)} />
//         </div>
//         <div>
//           <label>Video Links:</label>
//           <input
//               type="text"
//               placeholder="Enter video links separated by commas"
//               value={videos.join(',')}
//               onChange={(e) => setVideos(e.target.value.split(','))}
//           />
//         </div>
//         <div>
//           <label>Notes (Files):</label>
//           <input type="file" accept="application/pdf" multiple onChange={(e) => setFiles(e.target.files)} />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default ContentForm;





import axios from 'axios';
import React, { useState } from 'react';
import { FaRegFilePdf } from "react-icons/fa6";
import { GrYoutube } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { SiCompilerexplorer } from "react-icons/si";
import ReactPlayer from 'react-player';
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import PdfView from '../components/PdfView';
import "../styles/ContentTable.css";

import { useNavigate } from 'react-router-dom';

const ContentTable = (props) => {

  const navigate = useNavigate();

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedPdfFile, setSelectedPdfFile] = useState(null);
  const { setfeaturedata, featuredata, category } = props;
  const filteredData = featuredata ? featuredata.filter((data) => data.category === category) : [];

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const videoHandler = (data) => {
    setSelectedVideo(data);
  };

  const displayToast = () => {
    toast.error(`${category} is Empty`);
  };

  const showPdf = (file) => {
    // const pdf = `http://localhost:8080/files/${encodeURIComponent(file)}`;
    // console.log("pdf path", pdf)

    // setSelectedPdfFile(pdf);

    navigate(`/file/${file}`);
  };
  const handleDelete = async (id) => {
    try {
      const confirmed = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this data!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (confirmed.isConfirmed) {
        await axios.delete(`https://osl-backend.onrender.com/api/assignment/deleteAssignment/${id}`);
        toast.success('Deleted Successfully');

        // Update state to trigger re-render
        // Example: Assuming you have a state setter function setFeatureData
        setfeaturedata((updatedData) => updatedData.filter((data) => data._id !== id));
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error Occurred');
    }
  };

  return (
    <div className="content-table-main">
      {filteredData.length > 0 ? (
        <div className="header_fixed">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                {category === 'Assignments' && <th>Editor</th>}
                <th>Videos</th>
                <th>Pdfs</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data, index) => (
                <tr key={data._id}>
                  <td>{`${index + 1}.${data.title}`}</td>

                  {data.category === 'Assignments' && (
                    <td>
                      <a className="video" href={data.editor} target="_blank" rel="noopener noreferrer">
                        <SiCompilerexplorer />
                      </a>
                    </td>
                  )}

                  <td>
                    {data.videos && data.videos.length > 0 ? (
                      <div>
                        {data.videos.map((video, videoIndex) => (
                          <GrYoutube
                            key={videoIndex}
                            className='video'
                            onClick={() => videoHandler(video)}
                            style={{ cursor: 'pointer' }}
                          />
                        ))}
                      </div>
                    ) : (
                      <div>No Videos</div>
                    )}
                  </td>

                  <td>
                    {data.files && data.files.length > 0 ? (
                      <div>
                        {data.files.map((file, fileIndex) => (
                          <FaRegFilePdf
                            key={fileIndex}
                            onClick={() => showPdf(encodeURIComponent(file))}
                            className="pdf-icon"
                          />
                        ))}
                      </div>
                    ) : (
                      <div>No PDFs</div>
                    )}
                  </td>
                  <td> <MdDelete className='Delete-icons' onClick={() => handleDelete(data._id)}></MdDelete></td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>{displayToast()}</div>
      )}

      {selectedPdfFile && (
        <div className="pdf-view-container">
          <span className="close-button" onClick={() => setSelectedPdfFile(null)}>&times;</span>
          <PdfView pdf={selectedPdfFile} />
        </div>
      )}

      {selectedVideo && (
        <div className='video-div'>
          <div className={`video-player-container ${isFullScreen ? 'fullscreen' : ''}`}>
            <span className="close-button" onClick={() => { setSelectedVideo(null); toggleFullScreen(); }}>&times;</span>
            <ReactPlayer
              url={selectedVideo}
              width='100%'
              height='100%'
              controls={true}
              playIcon={true}
              onEnded={() => { setSelectedVideo(null); toggleFullScreen(); }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentTable;

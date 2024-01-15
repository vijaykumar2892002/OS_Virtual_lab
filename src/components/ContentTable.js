import React, { useState } from 'react';
import { FaRegFilePdf } from "react-icons/fa6";
import { GrYoutube } from 'react-icons/gr';
import { SiCompilerexplorer } from 'react-icons/si';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/ContentTable.css';

const ContentTable = (props) => {

  const navigate = useNavigate();

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { setfeaturedata, featuredata, category } = props;
  const filteredData =  featuredata ? featuredata.filter((data) => data.category === category) : [];
  

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  const videoHandler = (data) => {
    setSelectedVideo(data);
  };

  const displayToast = () => {
    setTimeout(() => {
      toast.error(`${category} is Empty`);
    }, 1000);
  };

  const showPdf = (file) => {

    // console.log("file path : ", file)
    navigate(`/file/${file}`);
    // window.open(`http://localhost:8080/files/${file}`, '_blank', 'noreferrer');

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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>{displayToast()}</div>
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

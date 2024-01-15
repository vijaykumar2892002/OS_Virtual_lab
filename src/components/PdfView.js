import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "../styles/pdfView.css";

import { useParams } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


const PdfView = () => {

    const { filePath } = useParams();
    console.log("PARAMS is : ", filePath)

    const updatedPath = "https://osl-backend.onrender.com/files/" + filePath;
    console.log("updated path is : ", updatedPath)

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setPageNumber(1); // Reset page number to 1 when a new document is loaded
    };

    const nextPage = () => {
        if (pageNumber < numPages) {
            setPageNumber(pageNumber + 1);
        }
    };

    const prevPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };

    return (
        <div className="wrap">
            <div className="controls">
                <button onClick={prevPage} disabled={pageNumber === 1}>
                    Prev
                </button>
                <button onClick={nextPage} disabled={pageNumber === numPages}>
                    Next
                </button>
            </div>
            <Document
                file={updatedPath}
                onLoadSuccess={onDocumentLoadSuccess}
                onContextMenu={(e) => e.preventDefault()}
                className="pdf-container"
            >
                <Page pageNumber={pageNumber}  className="page-main"/>
            </Document>
        </div>
    );
};

export default PdfView;
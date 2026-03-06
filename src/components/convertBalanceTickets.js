import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ConvertBalanceTickets = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [downloadDisabled, setDownloadDisabled] = useState(true);

  let fileReader;

  const downloadAggregatedData = () => {
    console.log('download data');
  }

const enableDownloading = () => {
  setDownloadDisabled(false);
  console.log(fileReader.result);
}

const filesChanged = event => {
  console.log(event.target.files[0]);
  fileReader = new FileReader();
  fileReader.onloadend = enableDownloading;
  fileReader.readAsText(event.target.files[0]);
}

  return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Select files</Form.Label>
        <Form.Control type="file" multiple accept=".TXT, .txt" onChange={filesChanged}/>
      </Form.Group>
      <Button variant="primary" onClick={downloadAggregatedData} disabled={downloadDisabled}>download aggregated data</Button>
    </>
  );
}

export default ConvertBalanceTickets;
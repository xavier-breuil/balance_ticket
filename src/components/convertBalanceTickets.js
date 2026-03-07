import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { colTitle, filterData } from '../utils.js';

const ConvertBalanceTickets = () => {
  const [downloadDisabled, setDownloadDisabled] = useState(true);

  let fileReader;

  const downloadAggregatedData = () => {
    console.log('download data');
  }

const enableDownloading = () => {
  setDownloadDisabled(false);
  const dataArray = [Object.keys(colTitle)]
  const readerResult = fileReader.result.split('\n');
  const colToExtract = Object.values(colTitle);
  readerResult.forEach(dataLine => {
    dataArray.push(filterData(dataLine.split(';'), colToExtract));
  });
  console.log(dataArray);
  // TODO: pass filtered data to aggregation function
}

const filesChanged = event => {
  fileReader = new FileReader();
  fileReader.onloadend = enableDownloading;
  // TODO: (not necessarily hear) loop over all files.
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
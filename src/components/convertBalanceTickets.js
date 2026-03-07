import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { colTitle, filterData, trimAndConvert } from '../utils.js';

const ConvertBalanceTickets = () => {
  const [downloadDisabled, setDownloadDisabled] = useState(true);
  const [rawFilteredData, setRawFilteredData] = useState([Object.keys(colTitle)]);

  let fileReader;

  const downloadAggregatedData = () => {
    console.log('download data');
    console.log(rawFilteredData);
  }

const enableDownloading = () => {
  // TODO: pass filtered data to aggregation function
  setDownloadDisabled(false);
}

const addFileData = (data, dataArray) => {
  // Split file against new line
  const readerResult = data.split('\n');
  const colToExtract = Object.values(colTitle);
  // For each line, split against ";" to separate values and
  // get only relevant ones based one colToExtract
  readerResult.forEach(dataLine => {
    dataArray.push(filterData(dataLine.split(';').map(trimAndConvert), colToExtract));
  });
}

const filesChanged = event => {
  // FIXME: in case of selecting files after having already processed first batch doesn't reinitialize data, the new batch is added to the second one.
  // reinitializing rawFilteredData state here doesn't work (probably async stuff)
  const selectedFiles = event.target.files;
  const dataArray = [];
  fileReader = new FileReader();
  function readFile(index) {
    if ( index >= selectedFiles.length ) {
      // When last file is read, set state with data and enable downloading.
      setRawFilteredData([...rawFilteredData, ...dataArray]);
      enableDownloading();
      return;
    }
    const file = selectedFiles[index];
    fileReader.onload = function(e) {
      // Once current file is read, add data and read next one.
      addFileData(e.target.result, dataArray);
      readFile(index+1)
    }
    fileReader.readAsText(file);
  }
  readFile(0);
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
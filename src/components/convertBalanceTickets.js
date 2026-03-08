import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { colTitle, filterData, trimAndConvert, colSum, itemOrWeight, resellOrProd } from '../utils.js';

const ConvertBalanceTickets = () => {
  const [downloadDisabled, setDownloadDisabled] = useState(true);
  const [rawFilteredData, setRawFilteredData] = useState([]);

  let fileReader;

  const aggregateData = () => {
    const alreadyFiltered = [];
    let filteringValues;
    const aggregatedData = [['produit', 'code balance', 'piece_poids', 'revente_prod', 'total_vendu', 'montant total']];
    const lineFilter = line => {
      // col 1 is item or weight, col 4 is product name, col 5 is ressel or production
      const filteredValues = [line[1], line[4], line[5]];
      return filteringValues == JSON.stringify(filteredValues);
    }
    rawFilteredData.forEach(lineToFilter => {
      filteringValues = JSON.stringify([lineToFilter[1], lineToFilter[4], lineToFilter[5]]);
      if (alreadyFiltered.includes(filteringValues)) {
        return;
      }
      const filteredArray = rawFilteredData.filter(lineFilter);
      // Add line [cucumber, 42, item, resell, 500, 750]
      // for [product, balance code, item or weight, resell or prod, total number sold, total price]
      aggregatedData.push([lineToFilter[4], lineToFilter[3], itemOrWeight(lineToFilter[1]), resellOrProd(lineToFilter[5]), colSum(filteredArray, 6), colSum(filteredArray, 7)]);
      // add combination to already filtered ones.
      alreadyFiltered.push(filteringValues);
    })
    return aggregatedData;
  }

  const downloadAggregatedData = () => {
    const aggregatedData = aggregateData();
    // TODO: download data
    console.log(aggregatedData);
  }

const enableDownloading = () => {
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
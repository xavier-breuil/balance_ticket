import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { CSVLink } from "react-csv";

import { colTitle, filterData, trimAndConvert, colSum, itemOrWeight, resellOrProd, assignGroup } from '../utils.js';

const ConvertBalanceTickets = () => {
  const [rawFilteredData, setRawFilteredData] = useState([]);
  const [aggregatedData, setAggregatedData] = useState([]);
  const [fileName, setFileName] = useState('');

  let fileReader;

  const aggregateData = () => {
    const alreadyFiltered = [];
    let filteringValues;
    const aggData = [['produit', 'code balance', 'piece_poids', 'revente_prod', 'total_vendu', 'montant total', 'origine']];
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
      // for [product, balance code, item or weight, resell or prod, total number sold, total price, origine of resold product]
      aggData.push([lineToFilter[4], lineToFilter[3], itemOrWeight(lineToFilter[1]), resellOrProd(lineToFilter[5]), colSum(filteredArray, 6), colSum(filteredArray, 7), assignGroup(lineToFilter[3])]);
      // add combination to already filtered ones.
      alreadyFiltered.push(filteringValues);
    })
    return aggData;
  }

  const downloadAggregatedData = () => {
    setAggregatedData(aggregateData());
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
        // const aggregatedData = aggregateData();
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

  const fileNameChanged = e => {
    setFileName(e.target.value);
  }

  return (
    <>
      <Alert variant='danger'>
          Reactualiser la page après chaque utilisation (bug)
      </Alert>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>nom du fichier à télécharger</Form.Label>
        <Form.Control type="text" placeholder="Nom du fichier" value={fileName} onChange={fileNameChanged}/>
        <br />
        <Form.Control type="file" multiple accept=".TXT, .txt" onChange={filesChanged}/>
      </Form.Group>
      <CSVLink data={aggregatedData} asyncOnClick={true} onClick={downloadAggregatedData} filename={fileName + '.csv'}>Télecharger</CSVLink>
    </>
  );
}

export default ConvertBalanceTickets;
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ConvertBalanceTickets = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const downloadAggregatedData = () => {
    console.log('download data');
  }

  return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Select files</Form.Label>
        <Form.Control type="file" multiple />
      </Form.Group>
      <Button variant="primary" onClick={downloadAggregatedData}>download aggregated data</Button>
    </>
  );
}

export default ConvertBalanceTickets;
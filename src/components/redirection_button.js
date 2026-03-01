import Button from 'react-bootstrap/Button';

const RedirectionButton = (props) => {
  return (
    <>
      <Button variant="primary">{props.btnText}</Button>
    </>
  );
}

export default RedirectionButton;
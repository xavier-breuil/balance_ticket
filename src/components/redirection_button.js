import { useNavigate } from "react-router";
import Button from 'react-bootstrap/Button';

const RedirectionButton = (props) => {
    const navigate = useNavigate();

    const redirectFunction = () => {
        navigate(props.target);
    }
  return (
    <>
      <Button variant="primary" onClick={redirectFunction}>{props.btnText}</Button>
    </>
  );
}

export default RedirectionButton;
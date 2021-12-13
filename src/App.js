import './App.css';
import { Container, Row } from 'react-bootstrap';
import Order from './components/Order';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Container className="container">
      <Row className="row-top"></Row>
      <Order/>
    </Container>
  );
}

export default App;

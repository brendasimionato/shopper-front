import logo from '../../src/logo-shopper.png'
import { Col } from 'react-bootstrap'


export default function Logo() {

    return (
        <Col className="col-logo">
            <img className="img-logo" src={logo}></img>
        </Col>
    )

}


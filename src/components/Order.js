import { Container, Row, Form, Button, Table, Col, Alert } from "react-bootstrap"
import { Typeahead } from 'react-bootstrap-typeahead'
import { useEffect, useState } from "react";
import { FaPlusCircle, FaTrashAlt, FaEdit } from 'react-icons/fa';
import logo from '../../src/logo-shopper.png'

import 'react-bootstrap-typeahead/css/Typeahead.css'

export default function Order() {

    const [selected, setSelected] = useState([]);
    const [addedProducts, setAddedProducts] = useState([]);
    const [qty, setQty] = useState("");
    const [total, setTotal] = useState(0);
    const [showAlertQty, setShowAlertQty] = useState(false)
    const products = [
        {
            id: 1,
            name: "Name product",
            price: 20,
            qty_stock: 10
        },
        {
            id: 2,
            name: "Name product 2",
            price: 20,
            qty_stock: 10
        },
        {
            id: 3,
            name: "Name product 3",
            price: 20,
            qty_stock: 10
        }
    ]

    const onChangeQty = (event) => {
        setQty(event.target.value)
    }

    const onClickAddedProduct = () => {

        if (qty <= 0) {
            setShowAlertQty(true)
            return
        }

        const product = {
            id: selected[0].id,
            name: selected[0].name,
            price: selected[0].price,
            qty_stock: selected[0].qty_stock,
            qty: qty
        }

        let p = null;
        const filteredProducts = addedProducts.filter(prod => {
            if(prod.id == product.id) {
                p = prod
                return false
            } else return true
        })

        setTotal(substractTotalFromProduct(p) + (product.price * product.qty))
        setAddedProducts([...filteredProducts, product])
        setSelected([])
        setQty("")

    }

    const substractTotalFromProduct = (product) => {
        return (product) ? total - (product.price * product.qty) : total
    }

    const onClickDeleteProduct = (productId) => {
        const updatedProducts = addedProducts.filter(product => {
            if (product.id == productId) {
                setTotal(total - (product.price * product.qty))
                return false
            } else return true
        })
        setAddedProducts(updatedProducts)
    }

    const onClickEditProduct = (product) => {
        setSelected([product])
        setQty(product.qty)
    }

    const listAddedProducts = addedProducts.map(product => {
        return (
            <tr>
                <td>{product.name}</td>
                <td>{product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                <td>{product.qty}</td>
                <td>
                    <Button className="btn-add-product" onClick={() => onClickEditProduct(product)} variant="light">
                        <FaEdit />
                    </Button>
                    <Button className="btn-add-product" onClick={() => onClickDeleteProduct(product.id)} variant="light">
                        <FaTrashAlt />
                    </Button>
                </td>
            </tr>
        )
    })

    return (
        <Container fluid>
            <Row>
                <Col className="col-logo">
                    <img className="img-logo" src={logo}></img>
                </Col>
                <Col className="col-logo-desc">
                    <span>Cadastro de Pedidos</span>
                </Col>

            </Row>
            <Container className="container-form">
            <Alert show={showAlertQty} onClose={() => setShowAlertQty(false)} dismissible variant="danger">
                Você precisa escolher a quantidade desejada.
            </Alert>
                <Row>
                    <Form>
                        <Col className="col-client-name">
                            <Form.Group className="mb-3" controlId="formBasicClientName">
                                <Form.Label>Nome cliente: </Form.Label>
                                <Form.Control type="text" placeholder="Insira o nome do cliente"></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col className="col-delivery-date">
                            <Form.Group className="mb-3" controlId="formBasicDeliveryDate">
                                <Form.Label>Data de entrega: </Form.Label>
                                <Form.Control type="date" placeholder="Insira data de entrega"></Form.Control>
                            </Form.Group>
                        </Col>

                        <Form.Group controlId="formBasicAddProducts">
                            <Form.Label>Adicionar produtos: </Form.Label>
                        </Form.Group>
                        <Form.Group>
                            <Typeahead
                                className="inp-products"
                                id="products"
                                labelKey="name"
                                onChange={setSelected}
                                options={products}
                                placeholder="Escolha um produto..."
                                selected={selected}
                            />
                            {selected.length > 0 && <span class="span-stock">Estoque: {selected[0].qty_stock}</span>}
                            <Form.Control className="inp-qty-product" value={qty} type="text" placeholder="Quantidade" onChange={onChangeQty} disabled={selected.length <= 0}></Form.Control>
                            <Button className="btn-add-product" onClick={onClickAddedProduct} disabled={selected.length <= 0} variant="light">
                                <FaPlusCircle />
                            </Button>
                        </Form.Group>
                    </Form>
                </Row>

                <Row className="row-table-products">
                    <h5>Produtos adicionados no pedido</h5>
                </Row>
                <Row>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Preço por unidade</th>
                                <th>Quantidade</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listAddedProducts}
                        </tbody>
                    </Table>
                </Row>
                <Row className="total">
                    Total: {total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                </Row>
            </Container>

        </Container>
    )

}

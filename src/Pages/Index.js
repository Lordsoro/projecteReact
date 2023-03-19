import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


export default function Index() {
    return (
        <div>
            <Card>
                <Card.Img variant="top" src={require("../images/Summer.jpg")} />
                <Card.Body>
                    <h1>Outfits Verano</h1>
                    <Card.Text>

                    </Card.Text>
                    <Link to='/verano'><Button variant="outline-primary">Comprar </Button></Link>
                </Card.Body>
            </Card>
            <br />
            <Card>
                <Card.Img variant="top" src={require("../images/first-day-of-winter.png")} />
                <Card.Body>
                    <h1>Outfits invierno</h1>
                    <Card.Text>

                    </Card.Text>
                    <Link to='/invierno'><Button variant="outline-primary">Comprar </Button></Link>
                </Card.Body>
            </Card>
            <br />
            <Card>
                <Card.Img variant="top" src={require("../images/entretiempo.png")} />
                <Card.Body >
                    <h1>Outfits entretiempo</h1>
                    <Card.Text>

                    </Card.Text>
                    <Button variant="outline-primary">Comprar</Button>
                </Card.Body>
            </Card>
            <br />
            <Card>
                <Card.Img variant="top" />
                <Card.Body>
                    <Card.Text>
                        Completa tu look con nuestros accesorios
                    </Card.Text>
                    <Button>Comprar</Button>
                </Card.Body>
            </Card>
            <br />
        </div>
    )
}

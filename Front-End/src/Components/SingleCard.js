import React from 'react'
import Card from 'react-bootstrap/Card';


export const SingleCard = ({ title, content, author, rate, img }) => {
    return (
        <Card style={{ width: '17rem' }}>
            <Card.Img variant="top" src={img} with='270px' height='152px' />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {content.slice(0, 40)}
                    {/* per impostare un max di 40 caratteri */}
                </Card.Text>
                <Card.Title>{author}</Card.Title>
                <Card.Title>{rate}</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default SingleCard
import React from "react";
import {Card,ListGroup,Button } from 'react-bootstrap'

const ProductCard = (props) => {
  const { product } = props;
  const { id, sku, name,image,price_range } = product;

  return (
    <div class="productBox">
                  <Card id="productBoxCard">
          <Card.Header><a href="#">{name}</a></Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item> {`sku: ${sku}`} </ListGroup.Item>
            <ListGroup.Item> {`Price: ${price_range.minimum_price.final_price.value}`} 
             &nbsp;{price_range.minimum_price.final_price.currency} </ListGroup.Item>
             {/* image.url is password protected image thats why using hardcode image */}
            <ListGroup.Item> <img width="250px" alt={image.label} src={'https://loremflickr.com/320/240?lock=' + id} /> </ListGroup.Item>
          </ListGroup>
          </Card>
    </div>
  );
};

export default ProductCard;

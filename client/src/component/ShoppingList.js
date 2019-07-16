import React, { Component } from 'react';
import { Container, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';

export default class ShoppingList extends Component {
  state = {
    items: [
      { id: uuid(), name: 'Eggs' },
      { id: uuid(), name: 'Milk' },
      { id: uuid(), name: 'Water' }
    ]
  };
  render() {
    const { items } = this.state;
    return (
      <Container>
        <Button
          color='dark'
          style={{ marginBottom: '2rem' }}
          onClick={() => {
            const name = prompt('Enter name');

            if (name) {
              this.setState({
                items: [...this.state.items, { id: uuid(), name }]
              });
            }
          }}
        >
          Add Item
        </Button>
        <ListGroup>
          <TransitionGroup className='shopping-list'>
            {items.map(({ id, name }) => (
              <CSSTransition key={id} timeout={500} className='fade show'>
                <ListGroupItem>
                  <Button
                    className='remove-btn'
                    color='danger'
                    size='sm'
                    onClick={() => {
                      this.setState(state => ({
                        items: state.items.filter(item => item.id !== id)
                      }));
                    }}
                  >
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

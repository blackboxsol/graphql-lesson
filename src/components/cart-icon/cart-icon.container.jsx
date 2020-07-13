import React from 'react';
import { Mutation, Query, graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import { flowRight } from 'lodash';


import CartIcon from './cart-icon.component'; 

const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden{
        toggleCartHidden @client
    }
`;

const GET_CART_ITEMS_COUNT = gql`
    {
        cartItemsCount @client
    }
`;

const CartContainer = ({data: {cartItemsCount}, toggleCartHidden }) => {
    return (
        <CartIcon toggleCartHidden={toggleCartHidden} itemCount={cartItemsCount} />
    )
};

export default flowRight(
    graphql(TOGGLE_CART_HIDDEN, { name: 'toggleCartHidden'}),
    graphql(GET_CART_ITEMS_COUNT)
)(CartContainer);

/**
 * Query, Mutation
 *  <Mutation mutation={TOGGLE_CART_HIDDEN}>
    {
        (toggleCartHidden) =>(
            <Query query={GET_CART_ITEMS_COUNT}>
            {
                ({data: {cartItemsCount}}) => (<CartIcon toggleCartHidden={toggleCartHidden} itemCount={cartItemsCount} />)
            }
            </Query>
        )
            
    }
    </Mutation>
 */
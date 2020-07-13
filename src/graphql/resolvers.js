import { gql } from 'apollo-boost';

import { addItemToCart, getCartItemsCount } from './cart.utils';

export const typeDefs = gql`

    extend type Item {
        quantity: Int
    }
    extend type Mutation {
        ToggleCartHidden: Boolean!
        AddItemToCart(item: Item!): [Item]!
    }
`;

/**
 * It search for the local cache
 */
const GET_CART_HIDDEN = gql`
    {
        cartHidden @client
    }
`;

const GET_CART_ITEMS = gql`
    {
        cartItems @client
    }
`;

const GET_CART_ITEMS_COUNT = gql`
    {
        cartItemsCount @client
    }
`;

/***
 * _root - Top level 
 * _args - arguements
 * _context - 
 * _info - info about the query/mutation
 */
export const resolvers = {
    Mutation: {
        toggleCartHidden: (_root, _args, _context, _info) => {
            const { cache } = _context;
            const { cartHidden } = cache.readQuery({
                query: GET_CART_HIDDEN
            });

            cache.writeQuery({
                query: GET_CART_HIDDEN,
                data: { cartHidden: !cartHidden }
            });

            return !cartHidden;
        },

        addItemToCart: (_root, { item }, { cache }) => {
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });

            const newCartItems = addItemToCart(cartItems, item);
            
            cache.writeQuery({
                query: GET_CART_ITEMS,
                data: { cartItems: newCartItems }
            });

            cache.writeQuery({
                query: GET_CART_ITEMS_COUNT,
                data: { cartItemsCount: getCartItemsCount(newCartItems) }
            });

            return newCartItems;
        }
    }
}


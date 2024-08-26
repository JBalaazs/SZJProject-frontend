import { useState } from "react";
import { detailType } from "../interfaces/InterfaceCollection";
import { cartType } from "../interfaces/InterfaceCollection";
import { extendedProductType } from "../interfaces/InterfaceCollection";

export function GET () {

    /*Token:*/

    const token = localStorage.getItem('token');

    /*useState:*/

    const [cartItems, setCartItems] = useState<cartType | null>(null);
    const [products, setProducts] = useState<extendedProductType[] | null>(null);
    const [detail, setDetail] = useState<detailType | null>(null);

    /*Function:*/

    const getCartItems = () => {

        if(token)
        {

            fetch(`${process.env.REACT_APP_API_URL}/carts`, {

                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }

            })
            .then(res => res.json())
            .then(data => setCartItems(data.data))

        }

    }

    const getProducts = () => {

        fetch(`${process.env.REACT_APP_API_URL}/products`)
            .then(res => res.json())
            .then(data => setProducts(data))

    }

    const getDetails = () => {

        if(token)
        {

            fetch(`${process.env.REACT_APP_API_URL}/user/detail`, {

                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
    
            })
            .then(res => res.json())
            .then(data => setDetail(data))

        }

    }

    /*Return:*/

    return{

        getCartItems,
        cartItems,

        getProducts,
        products,

        getDetails,
        detail
    }

}
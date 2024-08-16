import { useState } from "react";
import { addressType } from "../interfaces/InterfaceCollection";
import { cartType } from "../interfaces/InterfaceCollection";
import { extendedProductType } from "../interfaces/InterfaceCollection";

export function GET () {

    /*Token:*/

    const token = localStorage.getItem('token');

    /*useState:*/

    const [addressData, setAddressData] = useState<addressType | null>(null);
    const [cartItems, setCartItems] = useState<cartType | null>(null);
    const [products, setProducts] = useState<extendedProductType[] | null>(null);
    
    const [balance, setBalance] = useState(0);

    /*Function:*/

    const getAddress = () => {

        fetch(`${process.env.REACT_APP_API_URL}/user/address`, {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }

        })
        .then(res => res.json())
        .then(data => setAddressData(data.data))

    }

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

    const getBalance = () => {

        if(token)
        {

            fetch(`${process.env.REACT_APP_API_URL}/user/balance`, {

                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }

            })
            .then(res => res.json())
            .then(data => setBalance(data.data))

        }

    }

    const getProducts = () => {

        fetch(`${process.env.REACT_APP_API_URL}/products`)
            .then(res => res.json())
            .then(data => setProducts(data))

    }

    /*Return:*/

    return{
        getAddress,
        addressData,

        getCartItems,
        cartItems,

        getBalance,
        balance,

        getProducts,
        products
    }

}
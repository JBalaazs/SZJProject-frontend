import { useEffect, useState } from "react";

export interface productStruct{

    productId: number,
    available: boolean,
    creationDate: Date,
    description: string,
    price: number,
    productCondition: string,
    productName: string,
    seller: string,
    stock: number

}

export function useWebshopService () {

    /*useState:*/

    const [products, setProducts] = useState<productStruct[] | null>(null);

    /*useEffect:*/

    useEffect(() => {

        fetch(`${process.env.REACT_APP_API_URL}/products`)
            .then(res => res.json())
            .then(data => setProducts(data))

    }, [products]);

    /*Function:*/

    function parseJwt (token : string) 
    {

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);

    }

    const getUsername = ()  => {

        const token = localStorage.getItem('token');
        const userData = token ? parseJwt(token) : null;
        const username = userData ? userData.sub : 'Unknown user';

        const findPair = products?.some(p => p.seller == username);

        if(findPair)
        {

            return username;

        }

        return username;

    }

    /*Return:*/

    return{
        products,
        getUsername
    }

}
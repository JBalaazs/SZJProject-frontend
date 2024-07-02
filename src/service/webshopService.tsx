import { useEffect, useState } from "react"

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

        fetch('http://localhost:8081/api/products')
            .then(res => res.json())
            .then(data => setProducts(data))

    }, [])

    /*Return:*/

    return{
        products
    }

}
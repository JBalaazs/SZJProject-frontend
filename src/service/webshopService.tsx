import { useEffect, useState } from "react"

interface productSturct{

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

    const [products, setProducts] = useState<productSturct[] | null>(null);

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
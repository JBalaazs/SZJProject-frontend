import { ChangeEvent, useEffect, useState } from "react"

enum EnumType {
    New = 'New',
    Used = 'Used',
    Refurbished = "Refurbished"
}

interface productSturct{

    product_id: number,
    available: boolean,
    creation_date: Date,
    description: string,
    price: number,
    product_condition: EnumType,
    product_name: string,
    seller: string,
    stock: number

}

export function useAddProductService () {

    /*useState:*/

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [productCondition, setProductCondition] = useState('New');
    const [characterCount, setCharacterCount] = useState(0);
    const [products, setProducts] = useState<productSturct[] | null>(null);

    /*onChange:*/

    const onChange_Name : React.ChangeEventHandler<HTMLInputElement> = (event) => {

        setName(event.target.value);

    }

    const onChange_Description : React.ChangeEventHandler<HTMLInputElement> = (event) => {

        setCharacterCount(event.target.value.length);

        if(event.target.value.length <= 100)
        {

            setDescription(event.target.value);
            console.log(event.target.value);

        }

    }

    const onChange_Price : React.ChangeEventHandler<HTMLInputElement> = (event) => {

        setPrice(event.target.value);

    }

    const onChange_Stock : React.ChangeEventHandler<HTMLInputElement> = (event) => {

        setStock(event.target.value);

    }

    const onChange_ProductCondition = (event : ChangeEvent<HTMLSelectElement>) => {

        setProductCondition(event.target.value);

    }

    /*useEffect:*/

    useEffect(() => {

        fetch('http://localhost:8081/api/products')
            .then(res => res.json())
            .then(data => setProducts(data))

    }, [])

    /*Function:*/



    /*Return:*/

    return{
        onChange_Name,
        onChange_Description,
        onChange_Price,
        onChange_Stock,
        onChange_ProductCondition,
        characterCount,
        products
    }

}
import { ChangeEvent, useState } from "react"

export function useAddProductService () {

    /*useState:*/

    const [productName, setProductName] = useState('');
    const [productDescription, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [productCondition, setProductCondition] = useState('New');
    const [characterCount, setCharacterCount] = useState(0);

    /*onChange:*/

    const onChange_Name : React.ChangeEventHandler<HTMLInputElement> = (event) => {

        setProductName(event.target.value);

    }

    const onChange_Description : React.ChangeEventHandler<HTMLInputElement> = (event) => {

        setCharacterCount(event.target.value.length);

        if(event.target.value.length <= 100)
        {

            setDescription(event.target.value);

        }

    }

    const onChange_Price : React.ChangeEventHandler<HTMLInputElement> = (event) => {

        setPrice(Number(event.target.value));

    }

    const onChange_Stock : React.ChangeEventHandler<HTMLInputElement> = (event) => {

        setStock(Number(event.target.value));

    }

    const onChange_ProductCondition = (event : ChangeEvent<HTMLSelectElement>) => {

        setProductCondition(event.target.value);

    }

    /*Function:*/

    const addNewProduct = () => {

        const token = localStorage.getItem('token');
        console.log(token);

        fetch('http://localhost:8081/api/products', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({productName, productDescription, productCondition, price, stock})

        })

    }

    /*Return:*/

    return{
        onChange_Name,
        onChange_Description,
        onChange_Price,
        onChange_Stock,
        onChange_ProductCondition,
        addNewProduct,
        characterCount
    }

}
import { ChangeEvent, useState } from "react"

export function useAddProductService () {

    /*useState:*/

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [productCondition, setProductCondition] = useState('New');
    const [characterCount, setCharacterCount] = useState(0);

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

    /*Function:*/



    /*Return:*/

    return{
        onChange_Name,
        onChange_Description,
        onChange_Price,
        onChange_Stock,
        onChange_ProductCondition,
        characterCount
    }

}
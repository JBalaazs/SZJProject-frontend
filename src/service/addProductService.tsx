import { ChangeEvent, useState } from "react";
import { useNavigateService } from "./navigateService";
import { productType } from "../interfaces/InterfaceCollection";
import { POST } from "../endpoints/POST";

export function useAddProductService () {

    /*Service:*/

    const navigateService = useNavigateService();
    
    /*endpoints:*/

    const endpoints_POST = POST();

    /*useState:*/

    const [characterCount, setCharacterCount] = useState(0);

    const [productDatas, setProductDatas] = useState<productType>({

        productName: '',
        productDescription: '',
        price: 0,
        stock: 0,
        productCondition: 'New',

    });

    /*onChange:*/

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const {name, value} = event.target;

        setProductDatas(prevProduct => ({

            ...prevProduct,
            [name]: name == 'price' || name == 'stock' ? Number(value) : value

        } as productType));

        if(name == 'productDescription') 
        {

            setCharacterCount(value.length);

        }

    }

    /*Function:*/

    const addNewProduct = () => {

        if(productDatas)
        {

            endpoints_POST.addNewProduct(productDatas);

        } 

        navigateService.navigate('/webshop');

    }

    const textByCharacterCount = (numberOfCharacters: number) => {

        if(numberOfCharacters < 100)
        {

            return{

                pTag:
                    <p style={{color: "green"}}>{numberOfCharacters}/100</p>

            }

        }
        else
        {

            return{

                pTag:
                    <p style={{color: "red"}}>{numberOfCharacters}/100</p>

            }

        }

    }

    /*Return:*/

    return{
        handleChange,
        addNewProduct,
        textByCharacterCount,
        characterCount
    }

}
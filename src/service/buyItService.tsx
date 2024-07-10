import { productStruct, useWebshopService } from "./webshopService";
import { useParams } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import '../design/style.css';

export function useBuyItService () {

    /*useState:*/

    const [pieceOfProduct, setPieceOfProduct] = useState(0);

    /*onChange:*/

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

        setPieceOfProduct(Number(event.target.value));

    }

    /*Service:*/

    const webshopService = useWebshopService();

    /*selectedId from URL:*/

    const { productId } = useParams();

    /*Function:*/

    const findPairFunction = () : productStruct | null => {

        const findPair = webshopService.products?.find(p => p.productId == Number(productId));

        if(findPair)
        {
            return findPair;
        }

        return null;

    }

    const collectDataByItemId = () => {

        const findPair = webshopService.products?.find(p => p.productId == Number(productId));

        if(findPair)
        {

            return (
            
                <>

                    <p className="buyitTitle">{findPairFunction()?.productName}</p>

                    <p className="buyitAvailable">({findPairFunction()?.stock} pcs left)</p>

                    <p className="buyitAbout">About the product:</p>

                    <p className="buyitDescription">{findPairFunction()?.description}</p>

                    <p className="buyitPriceTitle">Price:</p>

                    <p className="buyitPrice">{findPairFunction()?.price.toFixed(2)} <span className="buyitDollarSign">$</span> / pcs</p>

                </>

            );

        }

    }

    const totalPrice = () : number | null => {

        if(findPairFunction && pieceOfProduct <= Number(findPairFunction()?.stock))
        {

            let total = Number(findPairFunction()?.price) * pieceOfProduct;

            return total;

        }
        else if(findPairFunction)
        {

            let total = Number(findPairFunction()?.price) * Number(findPairFunction()?.stock);

            return total;

        }

        return null;

    }

    const addToCart = () => {

        if(pieceOfProduct > 0)
        {

            console.log(`Add to cart! ${pieceOfProduct}`);

        }

    }

    /*Return:*/

    return{
        collectDataByItemId,
        handleChange,
        totalPrice,
        findPairFunction,
        addToCart
    }

}
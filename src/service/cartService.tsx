import { useEffect, useState, ChangeEvent } from "react";
import { useClientService } from "./clientService";
import { GET } from "../endpoints/GET";
import { POST } from "../endpoints/POST";

export function useCartService () {

    /*Service:*/

    const { errorAddressData, handleChange, address, isFormValidAddressData } = useClientService();
    
    /*endpoints:*/

    const endpoints_GET = GET();
    const endpoints_POST = POST();

    /*useState:*/

    const [popUpDelete, setPopUpDelete] = useState(false);
    const [popUpBuy, setPopUpBuy] = useState(false);
    const [popUpPurchase, setPopUpPurchase] = useState(false);

    const [productId, setProductId] = useState(0);
    const [deletePcs, setDeletePcs] = useState(0);

    /*onChange:*/

    const handleChangeCart = (event: ChangeEvent<HTMLInputElement>) => {

        const {name, value} = event.target;

        if(name == "delete")
        {

            setDeletePcs(Number(value));
            
        }

    }

    /*useEffect:*/

    useEffect(() => {

        endpoints_GET.getAddress();
        endpoints_GET.getProducts();
        endpoints_GET.getCartItems();

    }, []);

    /*Function:*/

    const deleteFromCartById = (productId: number) => {

        const quantity = deletePcs;

        endpoints_POST.removeFromCart(productId, quantity);

        window.location.reload();

    }

    const showPopUpDelete = (productId: number) => {

        setPopUpDelete(!popUpDelete);

        setProductId(productId);

        setDeletePcs(0);

    }

    const showPopUpBuy = () => {

        setPopUpBuy(!popUpBuy);

        createOrder();

    }

    const clearAll = () => {

        endpoints_POST.clearCart();

        window.location.reload();

    }
    
    const createOrder = () => {

        endpoints_POST.createOrder();

    }

    const buyTheContentsOfTheCart = () => {

        if(address)
        {
        
            endpoints_POST.payTheCartsPrice(address);

        }

        setPopUpBuy(!popUpBuy);

        setPopUpPurchase(!popUpPurchase);

    }

    const doYouHaveAddress = (): boolean => {        

        if(endpoints_GET.addressData)
        {

            return true;

        }

        return false;

    }

    const findProductForDelete = () => {

        const findPairForCartDatas = endpoints_GET.cartItems?.cartItems.find(c => c.productId == productId);

        return{

            quantity: findPairForCartDatas?.quantity

        }

    }

    const addFindPairsToCart = () => {

        return endpoints_GET.cartItems?.cartItems.map(c => {

            const findPairs = endpoints_GET.products?.find(p => p.productId == c.productId);

            if(findPairs)
            {

                return{

                    productName: findPairs.productName,
                    price: findPairs.price,
                    quantity: c.quantity,
                    productId: c.productId

                }

            }

        })

    }

    const totalPrice_BuyTag = () => {

        let totalPrice = 0;
        
        addFindPairsToCart() && addFindPairsToCart()?.map(p => {

            return totalPrice += Number(p?.price) * Number(p?.quantity);

        })

        return totalPrice

    }

    /*Return:*/

    return {
        productActions: {
            findProductForDelete,
            handleChange,
            totalPrice_BuyTag,
            addFindPairsToCart,
            handleChangeCart,
            deleteFromCartById,
            buyTheContentsOfTheCart,
            clearAll,
        },
    
        popUps: {
            popUpDelete,
            setPopUpDelete,
            showPopUpDelete,
            popUpBuy,
            setPopUpBuy,
            showPopUpBuy,
            popUpPurchase,
            setPopUpPurchase,
        },
    
        productInfo: {
            productId,
            deletePcs,
            doYouHaveAddress,
            errorAddressData,
            isFormValidAddressData,
        },
    
        endpoints: {
            endpoints_GET,
        },
    }

}
import { useEffect, useState, ChangeEvent } from "react";
import { useWebshopService } from "./webshopService";
import { useClientService } from "./clientService";

interface cartData {

    cartId: number,
    cartItems: {
        productId: number,
        quantity: number
    }[]

}

export function useCartService () {

    /*Service:*/

    const webshopService = useWebshopService();
    const { errorAddressData, handleChange, address, isFormValidAddressData } = useClientService();

    /*useState:*/

    const [cartItems, setCartItems] = useState<cartData | null>(null);

    const [popUpDelete, setPopUpDelete] = useState(false);
    const [popUpBuy, setPopUpBuy] = useState(false);
    const [popUpPurchase, setPopUpPurchase] = useState(false);

    const [productId, setProductId] = useState(0);
    const [deletePcs, setDeletePcs] = useState(0);
    const [successPay, setSuccessPay] = useState(false);

    /*onChange:*/

    const handleChangeCart = (event: ChangeEvent<HTMLInputElement>) => {

        const {name, value} = event.target;

        if(name == "delete")
        {

            setDeletePcs(Number(value));
            
        }

    }

    /*Function:*/

    function parseJwt(token: string): {userId: number | null, username: string } | null {
        
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            
            const payload = JSON.parse(jsonPayload);
    
            const username = payload.sub;

            return{

                userId: payload[username].UserId,
                username: username

            };
        
    }

    const deleteFromCartById = (productId: number) => {

        const token = localStorage.getItem('token');
        const quantity = deletePcs;

        fetch(`${process.env.REACT_APP_API_URL}/carts/remove`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({productId, quantity})

        })

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

        const token = localStorage.getItem('token');

        fetch(`${process.env.REACT_APP_API_URL}/carts/clear`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            

        })

        window.location.reload();

    }
    
    const createOrder = () => {

        const token = localStorage.getItem('token');

        if(token)
        {

            fetch(`${process.env.REACT_APP_API_URL}/orders/create?userId=${parseJwt(token)?.userId}`, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }

            })
            
        }

    }

    const buyTheContentsOfTheCart = () => {

        const token = localStorage.getItem('token');

        if(token)
        {

            fetch(`${process.env.REACT_APP_API_URL}/orders/pay?userId=${parseJwt(token)?.userId}`, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    country: address.country,
                    city: address.city,
                    street: address.street,
                    zipCode: address.zipCode
                })

            })

            setPopUpBuy(!popUpBuy)

            setPopUpPurchase(!popUpPurchase)

        }

    }

    const cartList = () => {

        let totalPrice = 0;

        const findPairForCartDatas = cartItems?.cartItems.find(c => c.productId == productId);

        const ListOfCart = cartItems?.cartItems.map(x => {

            const findPairs = webshopService.products?.find(p => p.productId == x.productId);

            if(findPairs)
            {

                totalPrice += (findPairs.price * x.quantity);

                return(
                    <div className="productList">
    
                        <h3>
                            {findPairs.productName} 
                            <span style={{fontSize: '20px'}}> ({(findPairs.price * x.quantity).toFixed(2)} 
                            <span className="buyitDollarSign">$</span> 
                            - {x.quantity} pcs)</span>
                        </h3>

                        <button 
                            className="btn btn-danger modifyButton"
                            onClick={() => showPopUpDelete(x.productId)}>Delete</button>

                    </div>
                );

            }
        })

        return(
            <>

                {ListOfCart}
                <div className="productPrice_Cart">

                    <h3>{totalPrice.toFixed(2)} <span className="buyitDollarSign">$</span></h3>
                    <button className="btn btn-success buyButton" style={{fontWeight: 'bold'}} onClick={showPopUpBuy}>Buy</button>

                </div>

                <div className="clearAll_Box">
                    <button className="btn btn-danger clearAll" onClick={clearAll}>Clear All</button>
                </div>

                {/*DELETE:*/}

                <div className={`popUp ${popUpDelete ? 'open' : ''}`}>

                    <div className="popUpPanel">

                        <h1 className="popUpTitle">DELETE</h1>
                        <p className="deletePcs">({findPairForCartDatas?.quantity}pcs)</p>

                        <button 
                            className="btn btn-danger X_Button"
                            onClick={() => setPopUpDelete(!popUpDelete)}>X</button>

                        <label htmlFor="delete" className="labelCart">Enter the number of delete:</label>

                        <input
                            name="delete"
                            type="number"
                            className="inputCart_Delete" 
                            onChange={handleChangeCart}
                            min={0}
                            max={findPairForCartDatas?.quantity}
                            placeholder="0"/>

                        <button 
                            className="btn btn-danger modifyButton"
                            onClick={() => deleteFromCartById(productId)}
                            disabled={deletePcs == 0 || deletePcs > Number(findPairForCartDatas?.quantity) ? true : false}>OK</button>

                    </div>

                </div>

                {/*BUY:*/}

                <div className={`popUp ${popUpBuy ? 'open' : ''}`}>

                    <div className="popUpPanel">

                        <h1 className="popUpTitle">BUY</h1>

                        <button 
                            className="btn btn-danger X_Button"
                            onClick={() => setPopUpBuy(!popUpBuy)}>X</button>

                        <label className="labelCart">You have to set your address data:</label>

                        <div className="payInputs">

                            <input
                                type="text"
                                className="inputCart_Pay"
                                placeholder="Country (Hungary)"
                                name="country"
                                onChange={handleChange}
                                style={{borderColor: `${errorAddressData.country}`}}
                                required
                                />

                            <input
                                type="text"
                                className="inputCart_Pay"
                                placeholder="City (Budapest)"
                                name="city"
                                onChange={handleChange}
                                style={{borderColor: `${errorAddressData.city}`}}
                                required
                                />

                        </div>

                        <div className="payInputs">

                            <input
                                type="text"
                                className="inputCart_Pay"
                                placeholder="Street (Szeles st.)"
                                name="street"
                                onChange={handleChange}
                                style={{borderColor: `${errorAddressData.street}`}}
                                required
                                />

                            <input
                                type="text"
                                className="inputCart_Pay"
                                placeholder="zipCode (3540)"
                                name="zipCode"
                                onChange={handleChange}
                                style={{borderColor: `${errorAddressData.zipCode}`}}
                                required
                                />

                        </div>

                        <button 
                            className="btn btn-danger modifyButton"
                            onClick={buyTheContentsOfTheCart}
                            disabled={!isFormValidAddressData()}
                            >PAY</button>

                    </div>

                </div>

                {/*SUCCESSFUL PURCHASE:*/}

                <div className={`popUp ${popUpPurchase ? 'open' : ''}`}>

                    <div className="popUpPanel">

                        <h1 className="popUpTitle">Successful purchase.</h1>

                        <button 
                            className="btn btn-danger X_Button"
                            onClick={() => setPopUpPurchase(!popUpPurchase)}>X</button>

                        <label className="labelCart">Order datas.</label>

                    </div>

                </div>

            </>
        )

    }

    /*useEffect:*/

    useEffect(() => {

        const token = localStorage.getItem('token');

        if(token)
        {

            fetch(`${process.env.REACT_APP_API_URL}/carts?userId=${parseJwt(token)?.userId}`)
                .then(res => res.json())
                .then(data => setCartItems(data.data))
                
        }

    }, [])

    /*Return:*/

    return {
        cartList,
        cartItems,
        parseJwt
        
    }  

}
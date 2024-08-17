import MenuBar from "../components/menuBar";
import { useCartService } from "../service/cartService";

export default function Cart () {

    /*Service:*/

    const cartService = useCartService();

    /*Return:*/

    return(
        
        <div className="outsideDIV">

            <MenuBar />

            <div className="insideDIV_Cart">

                {/*PRODUCTS IN CART:*/}

                {cartService.productActions.addFindPairsToCart() && cartService.productActions.addFindPairsToCart()?.map(p => (

                    <div className="productList">
                        
                        <h3>
                            {p?.productName} 
                            <span style={{fontSize: '20px'}}> ({(Number(p?.price) * Number(p?.quantity)).toFixed(2)} 
                            <span className="buyitDollarSign">$</span> 
                            - {p?.quantity} pcs)</span>
                        </h3>

                        <button 
                            className="btn btn-danger modifyButton"
                            onClick={() => cartService.popUps.showPopUpDelete(Number(p?.productId))}>Delete</button>

                    </div>

                ))}

                {/*BUY - Tag:*/}

                <div className="productPrice_Cart">

                    <h3>{cartService.productActions.totalPrice_BuyTag().toFixed(2)} <span className="buyitDollarSign">$</span></h3>
                    <button 
                        className="btn btn-success buyButton" 
                        style={{fontWeight: 'bold'}} 
                        onClick={cartService.popUps.showPopUpBuy}
                        disabled={cartService.productActions.totalPrice_BuyTag() > 0 ? false : true}>Buy</button>

                </div>

                {/*CLEAR ALL - Tag:*/}

                <div className="clearAll_Box">
                    <button 
                        className="btn btn-danger clearAll" 
                        onClick={cartService.productActions.clearAll}
                        disabled={cartService.productActions.totalPrice_BuyTag() > 0 ? false : true}>Clear All</button>
                </div>

                {/*DELETE - PopUp:*/}

                <div className={`popUp ${cartService.popUps.popUpDelete ? 'open' : ''}`}>

                    <div className="popUpPanel">

                        <h1 className="popUpTitle">DELETE</h1>
                        <p className="deletePcs">({cartService.productActions.findProductForDelete().quantity}pcs)</p>

                        <button 
                            className="btn btn-danger X_Button"
                            onClick={() => cartService.popUps.setPopUpDelete(!cartService.popUps.popUpDelete)}>X</button>

                        <label htmlFor="delete" className="labelCart">Enter the number of delete:</label>

                        <input
                            name="delete"
                            type="number"
                            className="inputCart_Delete" 
                            onChange={cartService.productActions.handleChangeCart}
                            min={0}
                            max={cartService.productActions.findProductForDelete().quantity}
                            placeholder="0"/>

                        <button 
                            className="btn btn-danger modifyButton"
                            onClick={() => cartService.productActions.deleteFromCartById(cartService.productInfo.productId)}
                            disabled={cartService.productInfo.deletePcs == 0 || cartService.productInfo.deletePcs > Number(cartService.productActions.findProductForDelete().quantity) ? true : false}>OK</button>

                    </div>

                </div>

                {/*BUY - PopUp:*/}

                <div className={`popUp ${cartService.popUps.popUpBuy ? 'open' : ''}`}>

                    <div className="popUpPanel">

                        <h1 className="popUpTitle">BUY</h1>

                        <button 
                            className="btn btn-danger X_Button"
                            onClick={() => cartService.popUps.exitByXButton()}>X</button>

                        {

                            !cartService.productInfo.doYouHaveAddress() ? (

                                <>

                                    <label className="labelCart">You have to set your address data:</label>

                                    <div className="payInputs">

                                        <input
                                            type="text"
                                            className="inputCart_Pay"
                                            placeholder="Country (Hungary)"
                                            name="country"
                                            onChange={cartService.productActions.handleChange}
                                            style={{borderColor: `${cartService.productInfo.errorAddressData?.country}`}}
                                            required
                                            />

                                        <input
                                            type="text"
                                            className="inputCart_Pay"
                                            placeholder="City (Budapest)"
                                            name="city"
                                            onChange={cartService.productActions.handleChange}
                                            style={{borderColor: `${cartService.productInfo.errorAddressData?.city}`}}
                                            required
                                            />

                                    </div>

                                    <div className="payInputs">

                                        <input
                                            type="text"
                                            className="inputCart_Pay"
                                            placeholder="Street (Szeles st.)"
                                            name="street"
                                            onChange={cartService.productActions.handleChange}
                                            style={{borderColor: `${cartService.productInfo.errorAddressData?.street}`}}
                                            required
                                            />

                                        <input
                                            type="text"
                                            className="inputCart_Pay"
                                            placeholder="zipCode (3540)"
                                            name="zipCode"
                                            onChange={cartService.productActions.handleChange}
                                            style={{borderColor: `${cartService.productInfo.errorAddressData?.zipCode}`}}
                                            required
                                            />

                                    </div>

                                    <div>

                                        <p className="priceWithNoAddress">Total: {cartService.productActions.totalPrice_BuyTag()}<span className="buyitDollarSign">$</span></p>

                                    </div>
                                
                                </>

                            ) : (

                                <div className="haveItems">
                                
                                    <div className="haveAddress">

                                        <ul>

                                            <li>Country: {cartService.endpoints.endpoints_GET.addressData?.country}</li>
                                            <li>City: {cartService.endpoints.endpoints_GET.addressData?.city}</li>
                                            <li>Street: {cartService.endpoints.endpoints_GET.addressData?.street}</li>
                                            <li>Zip code: {cartService.endpoints.endpoints_GET.addressData?.zipCode}</li>

                                        </ul>

                                    </div>

                                    <div className="haveProducts">

                                        <ul>

                                            {

                                                cartService.endpoints.endpoints_GET.cartItems?.cartItems.map(x => {

                                                        const findPairs =  cartService.endpoints.endpoints_GET.products?.find(p => p.productId == x.productId);

                                                        if(findPairs)
                                                        {

                                                            return(
                                                                <>
                                                                
                                                                    <li>{findPairs.productName} ({findPairs.price}<span className="buyitDollarSign">$</span>)</li>

                                                                </>
                                                            )

                                                        }

                                                    })

                                            }

                                        </ul>

                                    </div>

                                    <div className="havePrice">

                                        <ul>
                                            <li>{cartService.productActions.totalPrice_BuyTag()}<span className="buyitDollarSign">$</span></li>
                                        </ul>

                                    </div>

                                </div>

                            )

                        }                        

                        <button 
                            className="btn btn-danger modifyButton"
                            onClick={cartService.productActions.buyTheContentsOfTheCart}
                            disabled={!cartService.productInfo.doYouHaveAddress() ? !cartService.productInfo.isFormValidAddressData() : false}
                            >PAY</button>

                    </div>

                </div>

                {/*SUCCESSFUL PURCHASE - PopUp:*/}

                <div className={`popUp ${cartService.popUps.popUpPurchase ? 'open' : ''}`}>

                    <div className="popUpPanel">

                        <h1 className="popUpTitle">Successful purchase.</h1>

                        <button 
                            className="btn btn-danger X_Button"
                            onClick={() => cartService.popUps.setPopUpPurchase(!cartService.popUps.popUpPurchase)}>X</button>

                        <label className="labelCart">Order datas.</label>

                    </div>

                </div>

            </div>

        </div>
    )

}
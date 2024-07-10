import { useNavigateService } from "../service/navigateService";
import { useBuyItService } from "../service/buyItService";

export default function BuyIt () {

    /*Service:*/

    const navigateService = useNavigateService();
    const buyItService = useBuyItService();

    /*Return:*/

    return(
        <>

            <button className="btn btn-primary backButton" onClick={() => navigateService.navigate('/webshop')}>Back</button>

            <h1 className="title_Webshop">Order your item(s).</h1>

            <div className="buyItBox">
                <div className="buyItInside">

                    {buyItService.collectDataByItemId()}

                </div>
                <div className="buyItInside">

                    <p className="buyItHowMany">How many do you want to buy?</p>

                    <input type="number"
                        name="piece" 
                        className="buyitInput" 
                        onChange={buyItService.handleChange} 
                        min={0} 
                        max={buyItService.findPairFunction()?.stock} 
                        defaultValue={0}/>

                    <p className="buyItTotal">Total: {buyItService.totalPrice()?.toFixed(2)}<span className="buyitDollarSign">$</span></p>

                    <button 
                        className="btn btn-primary buyitButton" 
                        onClick={buyItService.addToCart}>
                        Add To Cart</button>

                </div>
            </div>

        </>
    );

}
import { useBuyItService } from "../service/buyItService";
import MenuBar from "../components/menuBar";

export default function BuyIt () {

    /*Service:*/

    const buyItService = useBuyItService();

    /*Return:*/

    return(
        <>

            <MenuBar />

            <h1 className="title_Webshop">Order your item(s).</h1>

            <div className="buyItBox">

                <div className="buyItInside">

                    <p className="buyitTitle">{buyItService.findProductById()?.productName}</p>

                    <p className="buyitAvailable">({buyItService.findProductById()?.stock} pcs left)</p>

                    <p className="buyitAbout">About the product:</p>

                    <p className="buyitDescription">{buyItService.findProductById()?.description}</p>

                    <p className="buyitPriceTitle">Price:</p>

                    <p className="buyitPrice">{buyItService.findProductById()?.price.toFixed(2)} <span className="buyitDollarSign">$</span> / pcs</p>

                </div>

                <div className="buyItInside">

                    <p className="buyItHowMany">How many do you want to buy?</p>
                        
                    <input type="number"
                        name="piece" 
                        className="buyitInput" 
                        onChange={buyItService.handleChange} 
                        min={0} 
                        max={buyItService.findProductById()?.stock} 
                        defaultValue={0}/>

                    <p className="buyItTotal">Total: {buyItService.totalPrice()?.toFixed(2)}<span className="buyitDollarSign">$</span></p>

                    <button 
                        className={`btn btn-${buyItService.buyItButton_Input().buttonStyle} buyitButton`}
                        disabled={buyItService.buyItButton_Input().disabled}
                        onClick={buyItService.addToCart}>
                        Add To Cart</button>,

                    {

                        buyItService.buyItButton_Input().error

                    }

                </div>
            </div>

        </>
    );

}
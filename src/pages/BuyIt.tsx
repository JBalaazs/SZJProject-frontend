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

                    {

                        buyItService.buyItButton_Input().buttonTag

                    }

                    {

                        buyItService.buyItButton_Input().error

                    }

                </div>
            </div>

        </>
    );

}
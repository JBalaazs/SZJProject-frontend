import { useNavigateService } from "../service/navigateService";
import MenuBar from "../components/menuBar";

export default function Client () {

    /*Service:*/

    const navigateService = useNavigateService();

    /*Return:*/

    return(
        <div className="outsideDIV">

            <MenuBar />
            
            <div className="card-container">
                <h2>Bank Card Details</h2>
                <form>
                    <div className="form-group">
                        <label >Card Number</label>
                        <input type="text" name="cardNumber" maxLength={16} placeholder="1234 5678 9123 4567" required />
                    </div>
                    <div className="form-group">
                        <label>Card Holder Name</label>
                        <input type="text" name="cardName" placeholder="John Doe" required />
                    </div>
                    <div className="form-group">
                        <label>Expiry Date</label>
                        <input type="text" name="expiryDate" maxLength={5} placeholder="MM/YY" required />
                    </div>
                    <div className="form-group">
                        <label>CVV</label>
                        <input type="text" name="cvv" maxLength={3} placeholder="123" required />
                    </div>
                    <div className="form-group">
                        <label>Withdraw Value ($)</label>
                        <input type="text" name="money" maxLength={3} placeholder="123" required />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>

        </div>
    )

}
import { useNavigateService } from "../service/navigateService";
import MenuBar from "../components/menuBar";
import { useClientService } from "../service/clientService";

export default function Client () {

    /*Service:*/

    const navigateService = useNavigateService();
    const clientService = useClientService();

    /*Return:*/

    return(

        <>

            <MenuBar />
            
            <div className="userData">
            
                <div className="card-container">
                    <h2>Bank Card Details</h2>
                    <form>
                        <div className="form-group">
                            <label >Card Number</label>
                            <input type="text" name="cardNumber" maxLength={19} placeholder="1234 5678 9123 4567" value={clientService.formattedValue_cardNumber} onChange={clientService.handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Card Holder Name</label>
                            <input type="text" name="cardName" placeholder="John Doe" onChange={clientService.handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Expiry Date</label>
                            <input type="text" name="expiryDate" maxLength={5} placeholder="MM/YY" value={clientService.formattedValue_date} onChange={clientService.handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>CVV</label>
                            <input type="text" name="cvv" maxLength={3} placeholder="123" onChange={clientService.handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Withdraw Value ($)</label>
                            <input type="number" name="money" maxLength={3} placeholder="123" onChange={clientService.handleChange} required />
                        </div>
                        <button type="submit" onClick={clientService.getMoney}>Submit</button>
                    </form>
                </div>

                <div className="card-container">
                    <h2>Order data</h2>
                    <form>
                        <div className="form-group">
                            <label >City</label>
                            <input type="text" name="city" placeholder="Budapest" onChange={clientService.handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Country</label>
                            <input type="text" name="country" placeholder="Hungary" onChange={clientService.handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Street</label>
                            <input type="text" name="street" placeholder="Szeles st." onChange={clientService.handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Zip code</label>
                            <input type="text" name="zipCode" placeholder="X." onChange={clientService.handleChange} required />
                        </div>

                        <button type="submit">Save</button>
                    </form>
                </div>

            </div>

        </>

    )

}
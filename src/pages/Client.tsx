import MenuBar from "../components/menuBar";
import { useClientService } from "../service/clientService";
import 'bootstrap/dist/css/bootstrap.css';

export default function Client () {

    /*Service:*/

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
                            <input type="text" name="cardNumber" maxLength={19} placeholder="1234 5678 9123 4567" value={clientService.formattedValue.cardNumber} onChange={clientService.handleChange} style={{borderColor: `${clientService.errorBankData.cardNumber}`}} required />
                        </div>
                        <div className="form-group">
                            <label>Card Holder Name</label>
                            <input type="text" name="holderName" placeholder="John Doe" onChange={clientService.handleChange} style={{borderColor: `${clientService.errorBankData.holderName}`}} required />
                        </div>
                        <div className="form-group">
                            <label>Expiry Date</label>
                            <input type="text" name="expiryDate" maxLength={5} placeholder="MM/YY" value={clientService.formattedValue.expirationDate} onChange={clientService.handleChange} style={{borderColor: `${clientService.errorBankData.expirationDate}`}} required />
                        </div>
                        <div className="form-group">
                            <label>CVV</label>
                            <input type="text" name="cvv" maxLength={3} placeholder="123" onChange={clientService.handleChange} style={{borderColor: `${clientService.errorBankData.cvv}`}} required />
                        </div>
                        <div className="form-group">
                            <label>Withdraw Value ($)</label>
                            <input type="number" name="newBalance" maxLength={3} placeholder="123" onChange={clientService.handleChange} style={{borderColor: `${clientService.errorBankData.newBalance}`}} required />
                        </div>

                        <button onClick={clientService.getMoney} className="btn btn-primary" disabled={!clientService.isFormValidBankData()}>Submit</button>
                    </form>
                </div>

                <div className="card-container">
                    <h2>Order data</h2>
                    <form>
                        <div className="form-group">
                            <label >City</label>
                            <input type="text" name="city" placeholder="Budapest" onChange={clientService.handleChange} style={{borderColor: `${clientService.errorAddressData.city}`}} required />
                        </div>
                        <div className="form-group">
                            <label>Country</label>
                            <input type="text" name="country" placeholder="Hungary" onChange={clientService.handleChange} style={{borderColor: `${clientService.errorAddressData.country}`}} required />
                        </div>
                        <div className="form-group">
                            <label>Street</label>
                            <input type="text" name="street" placeholder="Szeles st." onChange={clientService.handleChange} style={{borderColor: `${clientService.errorAddressData.street}`}} required />
                        </div>
                        <div className="form-group">
                            <label>Zip code</label>
                            <input type="text" name="zipCode" placeholder="X." onChange={clientService.handleChange} style={{borderColor: `${clientService.errorAddressData.zipCode}`}} required />
                        </div>

                        <button className="btn btn-primary" disabled={!clientService.isFormValidAddressData()}>Save</button>
                    </form>
                </div>

            </div>

        </>

    )

}
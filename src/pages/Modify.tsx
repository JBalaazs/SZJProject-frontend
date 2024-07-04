import { useNavigateService } from "../service/navigateService";
import { useAddProductService } from "../service/addProductService";
import { useModifyService } from "../service/modifyService";

export default function Modify () {

    /*Service:*/

    const navigateService = useNavigateService();
    const modifyService = useModifyService();

    /*Return:*/

    return(
        <>

            <button className="btn btn-primary backButton" onClick={() => navigateService.navigate('/webshop')}>Back</button>

            <div className="outsideDIV">
                
                <div className="insideDIV_Login">

                    <input 
                        type="text"
                        defaultValue={modifyService.productDatasThatWillBeModify()?.productName}
                        name="productName"
                        placeholder="Name"
                        className="inputStyle_AddProduct"
                        onChange={modifyService.handleChange}/>

                    <input 
                        type="text"
                        defaultValue={modifyService.productDatasThatWillBeModify()?.description}
                        name="productDescription"
                        placeholder="Description"
                        className="inputStyle_AddProduct"
                        onChange={modifyService.handleChange}/>

                    {

                        modifyService.characterCount < 100 ? 
                        <p style={{color: "green"}}>{modifyService.characterCount == 0 ? 
                            modifyService.productDatasThatWillBeModify()?.description.length : 
                            modifyService.characterCount}/100</p> : 
                            <p style={{color: "red"}}>{modifyService.characterCount}/100</p>
                    
                    }

                    <input 
                        type="text"
                        defaultValue={modifyService.productDatasThatWillBeModify()?.price}
                        name="price" placeholder="Price"
                        className="inputStyle_AddProduct"
                        onChange={modifyService.handleChange}/>

                    <button
                        className="btn btn-primary loginButton"
                        onClick={modifyService.addModifyProduct}>
                        Modify product</button>

                </div>

            </div>

        </>
    )

}
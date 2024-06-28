import { useNavigateService } from "../service/navigateService";
import { useAddProductService } from "../service/addProductService";

export default function AddProduct () {

    /*Serive:*/

    const navigateService = useNavigateService();
    const addProductService = useAddProductService();

    /*Return:*/

    return(
        <>

            <button className="btn btn-primary backButton" onClick={() => navigateService.navigate('/webshop')}>Back</button>

            <div className="outsideDIV">
                
                <div className="insideDIV_Login">

                    <input type="text" placeholder="Name" className="inputStyle_AddProduct" onChange={addProductService.onChange_Name}/>
                    <input type="text" placeholder="Description" className="inputStyle_AddProduct" onChange={addProductService.onChange_Description}/>
                    {addProductService.characterCount < 100 ? <p style={{color: "green"}}>{addProductService.characterCount}/100</p> : <p style={{color: "red"}}>{addProductService.characterCount}/100</p>}
                    <input type="text" placeholder="Price" className="inputStyle_AddProduct" onChange={addProductService.onChange_Price}/>
                    <input type="number" placeholder="Stock" className="inputStyle_AddProduct" onChange={addProductService.onChange_Stock}/>
                    <select className="inputStyle_AddProduct" onChange={addProductService.onChange_ProductCondition}>
                        <option>New</option>
                        <option>Used</option>
                        <option>Refurbished</option>
                    </select>

                    <button className="btn btn-primary loginButton">Add product</button>

                </div>

            </div>

        </>
    )

}
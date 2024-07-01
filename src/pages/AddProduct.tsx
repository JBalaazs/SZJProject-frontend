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

                    <input type="text" name="productName" placeholder="Name" className="inputStyle_AddProduct" onChange={addProductService.handleChange}/>
                    <input type="text" name="productDescription" placeholder="Description" className="inputStyle_AddProduct" onChange={addProductService.handleChange}/>
                    {addProductService.characterCount < 100 ? <p style={{color: "green"}}>{addProductService.characterCount}/100</p> : <p style={{color: "red"}}>{addProductService.characterCount}/100</p>}
                    <input type="text" name="price" placeholder="Price" className="inputStyle_AddProduct" onChange={addProductService.handleChange}/>
                    <input type="number" name="stock" placeholder="Stock" className="inputStyle_AddProduct" onChange={addProductService.handleChange}/>
                    <select className="inputStyle_AddProduct" name="productCondition" onChange={addProductService.handleChange}>
                        <option>New</option>
                        <option>Used</option>
                        <option>Refurbished</option>
                    </select>

                    <button className="btn btn-primary loginButton" onClick={addProductService.addNewProduct}>Add product</button>

                </div>

            </div>

        </>
    )

}
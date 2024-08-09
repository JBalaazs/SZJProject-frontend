import { useAddProductService } from "../service/addProductService";
import MenuBar from "../components/menuBar";

export default function AddProduct () {

    /*Service:*/

    const addProductService = useAddProductService();

    /*Return:*/

    return(
        <>

            <MenuBar />

            <div className="outsideDIV">
                
                <div className="insideDIV_Login">

                    <input type="text" name="productName" placeholder="Name" className="inputStyle_AddProduct" onChange={addProductService.handleChange}/>
                    <input type="text" name="productDescription" placeholder="Description" className="inputStyle_AddProduct" onChange={addProductService.handleChange}/>

                    {addProductService.textByCharacterCount(addProductService.characterCount).pTag}

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
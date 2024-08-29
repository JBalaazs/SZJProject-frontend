import { modifyProductType } from "../interfaces/InterfaceCollection";
import { detailType } from "../interfaces/InterfaceCollection";

export function PUT () {

    /*Token:*/

    const token = localStorage.getItem('token');

    /*Function:*/

    const addModifyProduct = (modifyData: modifyProductType) => {

        fetch(`${process.env.REACT_APP_API_URL}/products`, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(modifyData)

        })
        .catch(error => {
            console.error('Error:', error);
        });

    }

    const saveAddress = (detail: detailType) => {

        if(token)
        {

            fetch(`${process.env.REACT_APP_API_URL}/user/update`, {

                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    username: detail.username,
                    balance: detail.balance,
                    email: detail.email,
                    address: detail.address            
                })
    
            })

        }

    }

    /*Return:*/

    return{
        addModifyProduct,
        saveAddress
    }

}
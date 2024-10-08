import { addressType, authType, bankType, detailType, productType } from "../interfaces/InterfaceCollection";

export function POST () {

    /*Token:*/

    const token = localStorage.getItem('token');

    /*Function:*/

    const addNewProduct = (productDatas: productType) => {

        fetch(`${process.env.REACT_APP_API_URL}/products`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(productDatas)

        })
        .catch(error => {
            console.error('Error:', error);
        });

    }

    const addToCart = (productId: number, quantity: number) => {

        fetch(`${process.env.REACT_APP_API_URL}/carts/add`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({productId, quantity})

        })

    }

    const removeFromCart = (productId: number, quantity: number) => {

        fetch(`${process.env.REACT_APP_API_URL}/carts/remove`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({productId, quantity})

        })

    }

    const clearCart = () => {

        fetch(`${process.env.REACT_APP_API_URL}/carts/clear`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            
        })

    }

    const createOrder = () => {

        if(token)
        {

            fetch(`${process.env.REACT_APP_API_URL}/orders`, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
    
            })

        }

    }

    const payTheCartsPrice = (address: addressType) => {

        if(token)
        {

            fetch(`${process.env.REACT_APP_API_URL}/orders/pay`, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
    
                    country: address.country,
                    city: address.city,
                    street: address.street,
                    zipCode: address.zipCode
    
                })
    
            })

        }

        window.location.reload();

    }

    const login = (loginData: authType) => {

        return fetch(`${process.env.REACT_APP_API_URL}/user/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

    }

    const logOut = () => {

        fetch(`${process.env.REACT_APP_API_URL}/user/auth/logout`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({})

        });

        localStorage.removeItem('token');

    }

    const register = (registerData: authType) => {

        return fetch(`${process.env.REACT_APP_API_URL}/user/auth/register`, {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)

        });
        
    }

    const getBalance = (bankData: bankType) => {

        fetch(`${process.env.REACT_APP_API_URL}/user/balance`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(bankData)

        });

    }

    const upgradePicture = (imageFile: File) => {

        const formData = new FormData();
        formData.append('file', imageFile);

        fetch(`${process.env.REACT_APP_API_URL}/user/file-server`, {

            method: 'POST',
            headers: {
                
                'Authorization': 'Bearer ' + token,

            },
            body: formData

        })

    }

    /*Return:*/

    return{
        addNewProduct,
        addToCart,
        removeFromCart,
        clearCart,
        createOrder,
        payTheCartsPrice,
        login,
        logOut,
        register,
        getBalance,
        upgradePicture
    }

}
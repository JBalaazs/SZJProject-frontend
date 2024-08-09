import { useState } from "react";

export function useClientService () {

    /*useState:*/

    const [formattedValue, setFormattedValue] = useState({

        cardNumber: '',
        expirationDate: ''
        
    })

    const [bankData, setBankData] = useState({

        cardNumber: '',
        holderName: '',
        expirationDate: '',
        cvv: '',
        newBalance: 0

    });

    const [errorBankData, setErrorBankData] = useState({

        cardNumber: '',
        holderName: '',
        expirationDate: '',
        cvv: '',
        newBalance: ''

    });

    const [address, setAddress] = useState({
        
        country: '',
        city: '',
        street: '',
        zipCode: ''

    });

    const [errorAddressData, setErrorAddressData] = useState({

        country: '',
        city: '',
        street: '',
        zipCode: ''
        
    });

    /*Function:*/

    const setErrorBank = (name: string, isValid: boolean) => {

        setErrorBankData(prev => ({

            ...prev,
            [name]: isValid ? 'green' : 'red'

        }));

    }

    const setErrorAddress = (name: string, isValid: boolean) => {

        setErrorAddressData(prev => ({

            ...prev,
            [name]: isValid ? 'green' : 'red'

        }))

    }

    const isFormValidBankData = () => {

        return !Object.values(errorBankData).includes('red');

    }

    const isFormValidAddressData = () => {

        return !Object.values(errorAddressData).includes('red');

    }

    const setBank_useState = (isValid: boolean, name: string, value: string) => {

        if(isValid)
        {

            setBankData(prev => ({

                ...prev,
                [name]: name == 'newBalance' ? Number(value) : value

            }));

        }

    } 

    const setAddress_useState = (isValid: boolean, name: string, value: string) => {
                
        if(isValid)
        {
        
            setAddress(prev => ({
            
                ...prev,
                [name]: value
                
            
            }));
        
        }

    }

    /*onChange:*/

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = event.target;

        /*BANK:*/

        if (name === 'cardNumber') {

            const cleanedValue = value.replace(/\s+/g, '');
            
            const validCardNumber = /^[0-9]{0,16}$/;

            const formattedValue = cleanedValue.match(/.{1,4}/g)?.join(' ') || '';

            setFormattedValue(prev => ({

                ...prev,
                cardNumber: formattedValue

            }))

            const isValid = validCardNumber.test(cleanedValue) && cleanedValue.length == 16;

            setBank_useState(isValid, 'cardNumber', cleanedValue);

            setErrorBank('cardNumber', isValid);

        }

        if(name == 'holderName') {

            const isValid = /^[A-Za-z]+(?:\s[A-Za-z]+){1,}$/.test(value);

            setBank_useState(isValid, 'holderName', value);

            setErrorBank('holderName', isValid);

        }

        if (name == 'expiryDate') {

            const cleanedValue = value.replace(/\D/g, '');

            const valid = /^[0-9]{0,4}$/;
        
            if (valid.test(cleanedValue)) {
                
                const formattedValue = cleanedValue.match(/.{1,2}/g)?.join('/') || '';

                const [month, year] = formattedValue.split('/').map(Number);

                const isValidMonth = month >= 1 && month <= 12;
                const isValidYear = year >= 0 && year <= 99;

                setFormattedValue(prev => ({

                    ...prev,
                    expirationDate: formattedValue

                }))

                const isValid = isValidMonth && isValidYear;

                if(isValid)
                {

                    setBank_useState(isValid, 'expirationDate', formattedValue);

                }

                setErrorBank('expirationDate', isValid);

            }
        }

        if(name == 'cvv') {

            const isValid = /^[0-9]{0,3}$/.test(value) && value.length == 3;

            if(isValid)
            {

                setBank_useState(isValid, 'cvv', value);

            }

            setErrorBank('cvv', isValid);

        }

        if(name == 'newBalance') {

            const isValid = /^[0-9]{1,}$/.test(value);

            if(isValid)
            {

                setBank_useState(isValid, 'newBalance', value);

            }

            setErrorBank('newBalance', isValid);

        }

        /*ADDRESS:*/

        if(name == 'city') {

            const isValid = /^[A-Za-z]{0,}$/.test(value) && value.length > 0;

            setAddress_useState(isValid, 'city', value);

            setErrorAddress('city', isValid);

        }

        if(name == 'country') {

            const isValid = /^[A-Za-z]{0,}$/.test(value) && value.length > 0;

            setAddress_useState(isValid, 'country', value);

            setErrorAddress('country', isValid);

        }

        if(name == 'street') {

            const isValid = /^[A-Za-z]+(?:\s[A-Za-z]+){1,}$/.test(value) && value.length > 0;

            setAddress_useState(isValid, 'street', value);

            setErrorAddress('street', isValid);

        }

        if(name == 'zipCode') {

            const isValid = /^[0-9]{4}$/.test(value) && value.length > 0;

            setAddress_useState(isValid, 'zipCode', value);

            setErrorAddress('zipCode', isValid);

        }

    }

    const getMoney = () => {

        const token = localStorage.getItem('token');

        fetch(`${process.env.REACT_APP_API_URL}/user/update/balance`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(bankData)

        });

    }

    /*Return:*/

    return{
        handleChange,
        getMoney,
        isFormValidBankData,
        isFormValidAddressData,
        errorBankData,
        formattedValue,
        errorAddressData,
        address
    }

}
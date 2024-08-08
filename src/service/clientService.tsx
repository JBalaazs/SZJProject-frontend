import { ChangeEvent, useState } from "react";

export function useClientService () {

    /*useState:*/

    const [formattedValue_cardNumber, setFormattedValue_cardNumber] = useState('');
    const [formattedValue_date, setFormattedValue_date] = useState('');

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

    /*onChange:*/

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = event.target;

        /*BANK:*/

        if (name === 'cardNumber') {

            const cleanedValue = value.replace(/\s+/g, '');
            
            const validCardNumber = /^[0-9]{0,16}$/;

            const formattedValue = cleanedValue.match(/.{1,4}/g)?.join(' ') || '';
            setFormattedValue_cardNumber(formattedValue);

            const isValid = validCardNumber.test(cleanedValue) && cleanedValue.length == 16;

            if (isValid) {

                setBankData(data => ({
                    ...data,
                    cardNumber: cleanedValue
                }));

            }

            setErrorBank('cardNumber', isValid);

        }

        if(name == 'holderName') {

            const isValid = /^[A-Za-z]+(?:\s[A-Za-z]+){1,}$/.test(value);

            if(isValid)
            {

                setBankData(data => ({

                    ...data,
                    holderName: value

                }));

            }

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

                setFormattedValue_date(formattedValue);

                const isValid = isValidMonth && isValidYear;

                if(isValidMonth && isValidYear)
                {
                
                    setBankData(data => ({
                        ...data,
                        expirationDate: formattedValue
                    }));

                }

                setErrorBank('expirationDate', isValid);

            }
        }

        if(name == 'cvv') {

            const isValid = /^[0-9]{0,3}$/.test(value) && value.length == 3;

            if(isValid)
            {

                setBankData(data => ({

                    ...data,
                    cvv: value

                }));

            }

            setErrorBank('cvv', isValid);

        }

        if(name == 'newBalance') {

            const isValid = /^[0-9]{1,}$/.test(value);

            if(isValid)
            {

                setBankData(data => ({

                    ...data,
                    newBalance: Number(value)
    
                }));

            }

            setErrorBank('newBalance', isValid);

        }

        /*ADDRESS:*/

        if(name == 'city') {

            const isValid = /^[A-Za-z]{0,}$/.test(value) && value.length > 0;

            if(isValid)
            {

                setAddress(prevAddress => ({

                    ...prevAddress,
                    city: value
    
                }));

            }

            setErrorAddress('city', isValid);

        }

        if(name == 'country') {

            const isValid = /^[A-Za-z]{0,}$/.test(value) && value.length > 0;

            if(isValid)
            {

                setAddress(prevAddress => ({

                    ...prevAddress,
                    country: value
    
                }));

            }

            setErrorAddress('country', isValid);

        }

        if(name == 'street') {

            const isValid = /^[A-Za-z]+(?:\s[A-Za-z]+){1,}$/.test(value) && value.length > 0;

            if(isValid)
            {

                setAddress(prevAddress => ({

                    ...prevAddress,
                    street: value
    
                }));

            }

            setErrorAddress('street', isValid);

        }

        if(name == 'zipCode') {

            const isValid = /^(I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII|XIII|XIV|XV|XVI|XVII|XVIII|XIX|XX)$/.test(value) && value.length > 0;

            if(isValid)
            {

                setAddress(prevAddress => ({

                    ...prevAddress,
                    zipCode: value
    
                }));

            }

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
        errorAddressData,
        formattedValue_cardNumber,
        formattedValue_date,
    }

}
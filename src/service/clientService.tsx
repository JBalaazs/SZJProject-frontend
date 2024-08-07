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

    /*Function:*/

    const setError = (name: string, isValid: boolean) => {

        setErrorBankData(prev => ({

            ...prev,
            [name]: isValid ? 'green' : 'red'

        }));

    }

    const isFormValid = () => {

        console.log(!Object.values(errorBankData).includes('red'));

        return !Object.values(errorBankData).includes('red');

    }

    /*onChange:*/

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = event.target;

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

            setError('cardNumber', isValid);

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

            setError('holderName', isValid);

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

                setError('expirationDate', isValid);

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

            setError('cvv', isValid);

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

            setError('newBalance', isValid);

        }

        if(name == 'city') {

            setAddress(prevAddress => ({

                ...prevAddress,
                city: value

            }));

        }

        if(name == 'country') {

            setAddress(prevAddress => ({

                ...prevAddress,
                country: value

            }));

        }

        if(name == 'street') {

            setAddress(prevAddress => ({

                ...prevAddress,
                street: value

            }));

        }

        if(name == 'zipCode') {

            setAddress(prevAddress => ({

                ...prevAddress,
                zipCode: value

            }));

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
        isFormValid,
        errorBankData,
        formattedValue_cardNumber,
        formattedValue_date,
    }

}
import { ChangeEvent, useState } from "react";

export function useClientService () {

    /*useState:*/

    const [formattedValue_cardNumber, setFormattedValue_cardNumber] = useState('');
    const [formattedValue_date, setFormattedValue_date] = useState('');

    const [regEx, setRegEx] = useState({

        cardNumber: '',
        holderName: '',
        expirationDate: '',
        cvv: '',
        newBalance: 0

    });

    const [address, setAddress] = useState({
        
        country: '',
        city: '',
        street: '',
        zipCode: ''

    });

    /*onChange:*/

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = event.target;

        if (name === 'cardNumber') {

            const cleanedValue = value.replace(/\s+/g, '');

            const validCardNumber = /^[0-9]{0,16}$/;

            if (validCardNumber.test(cleanedValue)) {

                const formattedValue = cleanedValue.match(/.{1,4}/g)?.join(' ') || '';
                setFormattedValue_cardNumber(formattedValue);

                setRegEx(regEx => ({
                    ...regEx,
                    cardNumber: cleanedValue
                }));

            }
        }

        if(name == 'cardName') {

            const validCharacters = /^[A-Za-z]+(?:\s[A-Za-z]+){1,}$/.test(value);

            if(validCharacters)
            {

                setRegEx(regEx => ({

                    ...regEx,
                    holderName: value

                }));

            }

        }

        if (name == 'expiryDate') {

            const cleanedValue = value.replace(/\D/g, '');

            const valid = /^[0-9]{0,2}[0-9]{0,2}$/;
        
            if (valid.test(cleanedValue)) {
                
                const formattedValue = cleanedValue.match(/.{1,2}/g)?.join('/') || '';
                setFormattedValue_date(formattedValue);
                
                setRegEx(regEx => ({
                    ...regEx,
                    expirationDate: formattedValue
                }));

                console.log(regEx.expirationDate)

            }
        }

        if(name == 'cvv') {

            const isValid = /^[0-9]{0,3}$/.test(value);

            if(isValid)
            {

                setRegEx(regEx => ({

                    ...regEx,
                    cvv: value

                }));

            }

        }

        if(name == 'money') {

            setRegEx(regEx => ({

                ...regEx,
                newBalance: Number(value)

            }));

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
            body: JSON.stringify(regEx)

        });

    }

    /*Return:*/

    return{
        handleChange,
        regEx,
        getMoney,
        formattedValue_cardNumber,
        formattedValue_date
    }

}
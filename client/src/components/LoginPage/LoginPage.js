import React, {useState} from 'react';

const LoginPage = ({getToken}) => {

    const [formValue, setFormValue] = useState({});
    const [inputs, setInputs] = useState([true, true]);

    const handleAddInput = () => {
        setInputs([...inputs, true]);
    }

    //todo: исправить костыль
    const handleDeleteInput = () => {
        setInputs(inputs.slice(0, inputs.length - 1));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getToken(Object.values(formValue));
    }

    const handleChange = (e) => {
        setFormValue({...formValue, [e.target.name]: e.target.value});
    }

    return (
        <div className='login'>
            <form className='login__form' onSubmit={handleSubmit}>
                {inputs.map((item, index) => (
                    <div className='login__item' key={index}>
                        <input className='login__input' id={index} required type='text' name={`player${index}`} onChange={handleChange} />
                        {
                            inputs.length <= 2
                            ? null
                            : <button className='login__btn-close' type='button' onClick={handleDeleteInput}>x</button>
                        }
                    </div>
                ))}
                <button className='login__btn-form login__btn-form_close' type='button' onClick={handleAddInput}>add</button>
                <button className='login__btn-form login__btn-form_send' type='submit'>send</button>
            </form>
        </div>
    );
};

export default LoginPage;
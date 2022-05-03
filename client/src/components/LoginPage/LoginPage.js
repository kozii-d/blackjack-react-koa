import React, {useState} from 'react';

const LoginPage = ({getToken}) => {

    const [formValue, setFormValue] = useState(['', '']);

    const handleAddInput = () => {
        setFormValue([...formValue, '']);
    }

    const handleDeleteInput = (e) => {
        setFormValue(formValue.filter((input, index) => index !== +e.target.parentNode.id));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getToken(formValue);
    }

    const handleChange = (e) => {
        setFormValue(formValue.map((item, index) => +e.target.parentNode.id === index ? e.target.value : item));
    }

    return (
        <div className='login'>
            <h2 className='login__title'>create players</h2>
            <form className='login__form' onSubmit={handleSubmit}>
                {formValue.map((item, index) => (
                    <div className='login__item' key={index} id={index}>
                        <input className='login__input' required type='text' name={`name${index}`} value={formValue[index]} onChange={handleChange} />
                        {
                            formValue.length <= 2
                            ? null
                            : <button className='login__btn-close' type='button' onClick={handleDeleteInput}>✖</button>
                        }
                    </div>
                ))}
                <button className='login__btn-form login__btn-form_close' type='button' onClick={handleAddInput}>add player</button>
                <button className='login__btn-form login__btn-form_send' type='submit'>start game</button>
            </form>
        </div>
    );
};

export default LoginPage;
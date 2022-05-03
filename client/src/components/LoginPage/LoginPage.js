import React, {useCallback, useState} from 'react';

const LoginPage = ({getToken}) => {

    const [formValue, setFormValue] = useState(['', '']);

    const handleAddInput = useCallback(() => {
        setFormValue([...formValue, '']);
    }, [formValue]);

    const handleDeleteInput = useCallback((indexItem) => {
        setFormValue(formValue.filter((input, i) => i !== indexItem));
    }, [formValue]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        getToken(formValue);
    }, [formValue]);

    const handleChange = useCallback((e, indexItem) => {
        setFormValue(formValue.map((item, index) => indexItem === index ? e.target.value : item));
    }, [formValue]);

    return (
        <div className='login'>
            <h2 className='login__title'>create players</h2>
            <form className='login__form' onSubmit={handleSubmit}>
                {formValue.map((item, index) => (
                    <div className='login__item'
                         key={index}
                         id={index.toString()}
                    >
                        <input className='login__input'
                               required
                               type='text'
                               name={`name${index}`}
                               value={item}
                               onChange={(e) => handleChange(e, index)}
                        />
                        {
                            formValue.length > 2
                            && <button className='login__btn-close'
                                       type='button'
                                       onClick={() => handleDeleteInput(index)}>✖</button>
                        }
                    </div>
                ))}
                <button className='login__btn-form login__btn-form_close' type='button' onClick={handleAddInput}>add
                    player
                </button>
                <button className='login__btn-form login__btn-form_send' type='submit'>start game</button>
            </form>
        </div>
    );
};

export default LoginPage;
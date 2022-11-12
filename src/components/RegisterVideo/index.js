import React from 'react';
import { StyledRegisterVideo } from './styles';
import { createClient } from '@supabase/supabase-js';

function useForm() {
    const [values, setValues] = React.useState({ titulo: '', url: '' });
    return {
        values,
        handleChange: (event) => {
            const value = event.target.value;
            const name = event.target.name;
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm() {
            setValues({});
        },
    };
}

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split('v=')[1]}/hqdefault.jpg`;
}

const PROJECT_URL = 'https://ijutagxnmbixeuohxrlk.supabase.co';
const PUBLIC_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqdXRhZ3hubWJpeGV1b2h4cmxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNjgxNzYsImV4cCI6MTk4Mzc0NDE3Nn0.FUBvnj2pKJAjKQaxewDzo83MmvP23ZmjmIR2YmXVJDg';
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export default function RegisterVideo() {
    const formCadastro = useForm();
    const [formVisivel, setFormVisivel] = React.useState(false);

    return (
        <StyledRegisterVideo>
            <button onClick={() => setFormVisivel(true)} className='add-video'>
                +
            </button>

            {/* {formVisivel ? (
                <form>
                    <div>
                        <button className='close-modal'>X</button>
                        <input placeholder='Título do vídeo' />
                        <input placeholder='URL' />
                        <button type='submit'>Cadastrar</button>
                    </div>
                </form>
            ) : null} */}

            {formVisivel && (
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        console.log(formCadastro.values);
                        formCadastro.clearForm();
                        supabase
                            .from('video')
                            .insert({
                                title: formCadastro.values.titulo,
                                url: formCadastro.values.url,
                                thumb: getThumbnail(formCadastro.values.url),
                                playlist: 'jogos',
                            })
                            .then((response) => response)
                            .catch((err) => console.log(err));
                        setFormVisivel(false);
                    }}
                >
                    <div>
                        <button
                            onClick={() => setFormVisivel(false)}
                            className='close-modal'
                        >
                            X
                        </button>
                        <input
                            placeholder='Título do vídeo'
                            name='titulo'
                            value={formCadastro.values.titulo}
                            onChange={formCadastro.handleChange}
                        />
                        <input
                            placeholder='URL'
                            name='url'
                            value={formCadastro.values.url}
                            onChange={formCadastro.handleChange}
                        />
                        <button type='submit'>Cadastrar</button>
                    </div>
                </form>
            )}
        </StyledRegisterVideo>
    );
}

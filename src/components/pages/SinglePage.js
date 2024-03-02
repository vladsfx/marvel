import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import AppBanner from '../appBanner/AppBanner';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);

    const { loading, error, getCharacter, getComics, clearError } = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id]);

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComics(id).then(onDataLoaded);
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded);
                break;
            default:
                break;
        }
    };

    const onDataLoaded = (data) => {
        setData(data);
    }


    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !data) ? <Component data={data} /> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    );
};

export default SinglePage;
import { useParams, Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AppBanner from '../appBanner/AppBanner';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComicPage.scss';

const SingleComicPage = () => {
    const { comicId } = useParams();
    const [comic, setComic] = useState(null);

    const { loading, error, getComics, clearError } = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId]);

    const updateComic = () => {
        clearError();
        getComics(comicId)
            .then(onComicLoaded)
    };

    const onComicLoaded = (comic) => {
        setComic(comic);
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    );
};

const View = ({ comic }) => {
    const { title, description, pageCount, thumbnail, price, language } = comic;
    const hist = useHistory();
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <div onClick={() => hist.goBack()} className="single-comic__back">Go Back</div>
        </div>
    );
};

export default SingleComicPage;
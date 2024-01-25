import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

import "./404.scss";

const Page404 = () => {
    return (
        <div>
            <ErrorMessage />
            <p style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }}>
                Page doesn't exist
            </p>
            <Link
                className="link-error"
                to='/'>
                Back to main page
            </Link>
        </div>
    );
};

export default Page404;
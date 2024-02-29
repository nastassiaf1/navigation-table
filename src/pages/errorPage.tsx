import { Link, useRouteError } from "react-router-dom";

interface HttpError extends Error {
    statusText?: string;
}

export default function ErrorPage() {
    const error: HttpError | unknown = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            { error instanceof Error ?
                <p>
                    <i>{(error as HttpError).statusText || error.message}</i>
                </p> :
                <p>
                    <i>Unknown error occurred</i>
                </p>
            }
            <p>
                <Link to="/" aria-label="Link to Home page">Go to home</Link>
            </p>
        </div>
    );
}

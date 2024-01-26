import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: Error | unknown = useRouteError();
  console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            { error instanceof Error ?
                <p>
                    <i>{error.statusText! || error.message}</i>
                </p> :
                <p>
                    <i>Unknown error occurred</i>
                </p>
            }
            <p>
                <Link to="/">Go to home</Link>
            </p>
        </div>
    );
}
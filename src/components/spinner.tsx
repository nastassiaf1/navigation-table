import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
    display: "block",
    margin: "auto",
    borderColor: "red",
};

export default function Spinner() {
    return <ClipLoader
        loading={ true }
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
    />
}
import { Spinner } from "react-bootstrap";

type Props = {
    size: "small" | "medium" | "large";
    message: string;
};

const loadSize = {
    small: {
        width: "1.5rem",
        height: "1.5rem",
    },
    medium: {
        width: "2rem",
        height: "2rem",
    },
    large: {
        width: "3.5rem",
        height: "3.5rem",
    },
};

const LoadingIndicator = ({ message, size }: Props) => {
    return (
        <div className="d-flex flex-column align-items-center my-4">
            <Spinner animation="grow" variant="dark" role="status" style={loadSize[size]}>
                <span className="visually-hidden">{message}</span>
            </Spinner>
            <span>{message}</span>
        </div>
    );
};

LoadingIndicator.defaultProps = {
    size: 'medium',
    message: 'Loading...'
};

export default LoadingIndicator;
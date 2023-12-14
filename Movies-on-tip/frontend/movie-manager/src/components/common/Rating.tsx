import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

import './Rating.css';

type Props = {
    rating: number
};

const Rating = ({ rating }: Props) => {
    const numFullStars = Math.floor(rating);
    const numHalfStars = Math.round(rating) - numFullStars; // either 0 or 1
    const numEmptyStars = 5 - (numFullStars + numHalfStars);

    return (
        <span className="ratingColor">
            {
                Array.from({ length: numFullStars }).map(
                    (item, idx) => (
                        <FontAwesomeIcon icon={faStar} key={idx} />
                    )
                )
            }
            {
                numHalfStars ? (
                    <FontAwesomeIcon icon={faStarHalfAlt} />
                ) : null
            }
            {
                Array.from({ length: numEmptyStars }).map(
                    (item, idx) => (
                        <FontAwesomeIcon icon={faStarEmpty} key={idx} />
                    )
                )
            }
        </span>
    )
};

Rating.defaultProps = {
    rating: 4
};

export default Rating;
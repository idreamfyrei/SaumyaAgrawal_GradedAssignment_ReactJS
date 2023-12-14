import { useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import IMovie from "../../model/Imovie";
import { addMovie, deleteMovieById, getHigestMovieId, getMovieByTitle } from "../../services/movieService";
import './MovieListItem.css';


type Props = {
    movie: IMovie
    path: string
    onRemove: (title: string) => void
};

const MovieListItem = ({ movie, path, onRemove }: Props) => {
    const toastTimeout = 1000;
    const isFavourite = path === "favourite";

    const { id, title, ratings, posterurl, year, imdbRating } = movie;

    const average = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
    var rating = parseInt(average(ratings).toFixed(2), 10) / 2;

    var redirectPath = `${path}/${title}`

    const addToFavourites = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const movieByTitle = await getMovieByTitle("favourite", movie.title);
            if (movieByTitle !== null) {
                toast.error("Already present in favourites!", { autoClose: toastTimeout })
                return;
            }

            const highestId = await getHigestMovieId("favourite");
            movie.id = highestId + 1;
            await addMovie("favourite", movie);
            toast.success("Successfully added to favourites!", { autoClose: toastTimeout })
        }
        catch (errormsg: any) {
            toast.error("Failed to add the movie!", { autoClose: toastTimeout })
        }
    };

    const removeFromFavourites = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            if (movie.id === null) {
                toast.warn("Movie deletion error");
            }
            const data = await deleteMovieById("favourite", movie.id);
            toast.success("Successfully removed from favourites!", { autoClose: toastTimeout })
            onRemove(movie.title);
        }
        catch (errormsg: any) {
            toast.error("Failed to remove from favourites", { autoClose: toastTimeout })
        }
    };


    
    return (
        <Card style={{ width: '18rem' }} >
            
            <Card.Body>
                
            <Link to={redirectPath}>
                <Card.Img variant="top" height={350} mx-auto src={`${posterurl}`}  />
                
            </Link><hr></hr>
                <Card.Title className="d-flex justify-content-between d-flex-custom ">
                    <div className="text-xs">
                        {title}
                    </div>
                    <Card.Text>
                        <span >
                             <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
                            {`Year: ${year}, IMDB: ${imdbRating}`}
                        </span>
                    </Card.Text>

                    <div>
                        <Button hidden={isFavourite} onClick={addToFavourites}  variant="dark">Add to favourite 	&#10084;</Button>
                        <Button hidden={!isFavourite} onClick={removeFromFavourites} variant="danger">Remove from favourite</Button>
                    </div>
                </Card.Title>
            </Card.Body>
        </Card>
    );
};

export default MovieListItem
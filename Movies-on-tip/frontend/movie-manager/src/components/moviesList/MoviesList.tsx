import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { Alert, Col, Row, Toast, ToastContainer } from "react-bootstrap";
import { RouteComponentProps } from "react-router";
import IMovie from "../../model/Imovie";
import { getMovies } from "../../services/movieService";
import { isLoading } from "../../utils/types";
import LoadingIndicator from "../common/LoadingIndicator";
import NoMatch from "../global/NoMatch";
import MovieListItem from "./MovieListItem";

type State = {
  status: isLoading;
  movies?: IMovie[];
  moviesToShow?: IMovie[];
  error?: Error;
  searchString: string;
};

type Props = {
  moviesCategory: string;
};

class MoviesList extends Component<RouteComponentProps<Props>, State> {
  state: State = {
    status: "LOADING",
    searchString: "",
  };

  updateValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;

    this.setState(
      (state) => {
        return {
          searchString: value,
        };
      },
      () => {
        this.searchMovie(this.state.searchString);
      }
    );
  };

  searchMovie(searchString: string) {
    this.setState({
      status: "LOADING",
    });

    const moviesToShow = this.state.movies?.filter((x) => {
      return x.title.toLowerCase().includes(searchString.toLowerCase());
    });
    this.setState({
      status: "LOADED",
      moviesToShow,
    });
  }

  removeFromFavourites = (title: string) => {
    this.setState({
      status: "LOADING",
    });

    const moviesToShow = this.state.moviesToShow?.filter(
      (movie) => movie.title !== title
    );

    this.setState({
      status: "LOADED",
      moviesToShow,
    });
  };

  render() {
    const { status, moviesToShow, error, searchString } = this.state;

    let element;

    switch (status) {
      case "LOADING":
        element = <LoadingIndicator size="large" message="Fetching..." />;
        break;
      case "ERROR":
        let msg = error?.message ?? "";

        if (msg?.indexOf("404") > -1) {
          element = <NoMatch />;
        } else {
          element = <Alert variant="danger">{error?.message}</Alert>;
        }
        break;
      case "LOADED":
        element = (
          
          <>
            <div>
              <FontAwesomeIcon icon={faSearch} className="me-2" />
              <input
                placeholder="Search movie"
                className="me-2"
                value={searchString}
                onChange={this.updateValue}
              />
            </div>
            <Row xs={2} md={3} lg={5}>
              {moviesToShow?.map((movie, idx) => (
                <Col key={idx} className="d-flex align-items-stretch my-3">
                  <MovieListItem
                    movie={movie}
                    path={this.props.match.params.moviesCategory}
                    onRemove={this.removeFromFavourites}
                  />
                </Col>
              ))}
            </Row>
          </>
        );

        break;
      default:
        break;
    }

    return element;
  }

  async componentDidMount() {
    await this.reloadMovieList();
  }

  async componentDidUpdate(prevProps: RouteComponentProps<Props>) {
    if (
      this.props.match.params.moviesCategory !==
      prevProps.match.params.moviesCategory
    ) {
      await this.reloadMovieList();
    }
  }

  reloadMovieList = async () => {
    this.setState({
      status: "LOADING",
    });

    try {
      const movies = await getMovies(this.props.match.params.moviesCategory);
      const moviesToShow = movies;
      this.setState({
        status: "LOADED",
        movies,
        moviesToShow,
      });
    } catch (error) {
      this.setState({
        status: "ERROR",
        error: error as Error,
      });
    }
  };
}

export default MoviesList;
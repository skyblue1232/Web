import './App.css'
import {MOVIES} from '../mocks/movies';

const App = () => {
  return (
    <>
     <header>
        <h1 className="title">영화 리스트</h1>
        <hr></hr> 
      </header>
    <div className="movieList">
     
      {MOVIES.results.map(movie=>(
        <div key={movie.id} className="movie-item">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="{movie.title}" />
          <div className="overlay">
            <h2>{movie.title}</h2>
          </div>
          
        </div>
      )
      )}
    </div>
    </>
  );
  
};

export default App;

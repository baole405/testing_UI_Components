import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import { gsap } from 'gsap';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './Homepage.css';

// Dummy movie data (replace with actual data)
const movies = [
  {
    id: 1,
    title: 'Inception',
    description: 'A mind-bending sci-fi thriller',
    poster: 'https://example.com/inception-poster.jpg',
    rating: 8.8
  },
  {
    id: 2,
    title: 'The Dark Knight',
    description: 'Batman faces his greatest challenge',
    poster: 'https://example.com/dark-knight-poster.jpg',
    rating: 9.0
  },
  // Add more movies
];

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const [activeMovies, setActiveMovies] = useState(movies);

  useEffect(() => {
    // GSAP animation for header
    gsap.from(headerRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: 'power3.out'
    });
  }, []);

  const movieTemplate = (movie: any) => {
    return (
      <div className="movie-item">
        <div className="movie-item-content">
          <div className="mb-3">
            <img 
              src={movie.poster} 
              alt={movie.title} 
              className="movie-poster" 
            />
          </div>
          <div>
            <h4 className="mb-1">{movie.title}</h4>
            <p>{movie.description}</p>
            <Button 
              label="Đặt Vé" 
              className="p-button-raised p-button-danger"
              onClick={() => {/* Add booking logic */}}
            />
          </div>
        </div>
      </div>
    );
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="homepage">
      <header ref={headerRef} className="homepage-header">
        <div className="logo">F CINEMA</div>
        <nav>
          <button onClick={() => {}}>Lịch Chiếu</button>
          <button onClick={() => {}}>Phim</button>
          <button onClick={() => {}}>Rạp</button>
          <button onClick={() => {}}>Giá Vé</button>
        </nav>
        <div className="auth-buttons">
          <button onClick={handleLogin}>Đăng Nhập</button>
          <button onClick={handleRegister}>Đăng Ký</button>
        </div>
      </header>

      <main>
        <section className="featured-movies">
          <h2>Phim Đang Chiếu</h2>
          <Carousel 
            value={activeMovies}
            itemTemplate={movieTemplate}
            numVisible={3}
            numScroll={1}
            responsiveOptions={[
              {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
              },
              {
                breakpoint: '600px',
                numVisible: 2,
                numScroll: 2
              },
              {
                breakpoint: '480px',
                numVisible: 1,
                numScroll: 1
              }
            ]}
          />
        </section>

        <section className="upcoming-movies">
          <h2>Phim Sắp Chiếu</h2>
          <Carousel 
            value={activeMovies}
            itemTemplate={movieTemplate}
            numVisible={3}
            numScroll={1}
            responsiveOptions={[
              {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
              },
              {
                breakpoint: '600px',
                numVisible: 2,
                numScroll: 2
              },
              {
                breakpoint: '480px',
                numVisible: 1,
                numScroll: 1
              }
            ]}
          />
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <div>© 2024 F Cinema. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage; 
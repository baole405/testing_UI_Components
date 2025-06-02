import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Homepage.css';
import logo from '/logo.png';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Movie data using local images
const movies = [
  {
    id: 1,
    title: 'Phim Hành Động',
    description: 'Trải nghiệm những pha hành động đỉnh cao',
    poster: '/mov1.jpg',
    rating: 8.8
  },
  {
    id: 2,
    title: 'Phim Tình Cảm',
    description: 'Câu chuyện tình yêu đầy cảm động',
    poster: '/mov2.jpg',
    rating: 9.0
  },
  {
    id: 3,
    title: 'Phim Khoa Học Viễn Tưởng',
    description: 'Khám phá thế giới ngoài hành tinh',
    poster: '/mov3.jpg',
    rating: 8.6
  },
  {
    id: 4,
    title: 'Phim Kinh Dị',
    description: 'Những giây phút rùng rợn khó quên',
    poster: '/mov4.jpg',
    rating: 8.5
  },
  {
    id: 5,
    title: 'Phim Hài',
    description: 'Cười không ngừng với những tình huống hài hước',
    poster: '/mov5.jpg',
    rating: 8.7
  }
];

// Duplicate movies to create infinite scroll effect
const infiniteMovies = [...movies, ...movies, ...movies];

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const backgroundShapesRef = useRef<HTMLDivElement>(null);
  const backgroundShapeRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    // Horizontal ScrollTrigger for movie list
    if (horizontalScrollRef.current) {
      gsap.to(horizontalScrollRef.current, {
        x: () => -(horizontalScrollRef.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: horizontalScrollRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (infiniteMovies.length - 1),
          end: () => `+=${horizontalScrollRef.current!.offsetWidth}`
        }
      });
    }

    // Animate movie cards
    const movieRefs = useRef<Array<HTMLDivElement | null>>(
      new Array(infiniteMovies.length).fill(null)
    );

    movieRefs.current.forEach((movieRef) => {
      if (movieRef) {
        gsap.fromTo(
          movieRef,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: movieRef,
              start: 'center 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    // Dynamic Background Animation
    if (backgroundShapesRef.current) {
      const shapes = backgroundShapeRefs.current.filter(Boolean);
      
      // Create random movement for background shapes
      shapes.forEach((shape) => {
        if (shape) {
          gsap.to(shape, {
            x: () => gsap.utils.random(-100, 100),
            y: () => gsap.utils.random(-100, 100),
            duration: () => gsap.utils.random(5, 10),
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true
          });
        }
      });
    }
  }, []);

  // Create background shapes
  const createBackgroundShapes = () => {
    const shapeCount = 5; // Number of moving background shapes
    const shapes = [];

    for (let i = 0; i < shapeCount; i++) {
      const size = gsap.utils.random(200, 500);
      const left = gsap.utils.random(0, window.innerWidth);
      const top = gsap.utils.random(0, window.innerHeight);

      shapes.push(
        <div 
          key={i}
          ref={(el) => {
            backgroundShapeRefs.current[i] = el;
          }}
          className="background-shape"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}px`,
            top: `${top}px`
          }}
        />
      );
    }

    return shapes;
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="homepage">
      {/* Dynamic Background Shapes */}
      <div ref={backgroundShapesRef} className="background-shapes">
        {createBackgroundShapes()}
      </div>

      <header className="homepage-header">
        <div className="logo-container">
          <img src={logo} alt="F Cinema Logo" className="logo-image" />
          <span className="logo-text">F CINEMA</span>
        </div>
        <nav className="header-nav">
          <button>Lịch Chiếu</button>
          <button>Phim</button>
          <button>Rạp</button>
          <button>Giá Vé</button>
        </nav>
        <div className="auth-buttons">
          <button onClick={handleLogin}>Đăng Nhập</button>
          <button onClick={handleRegister}>Đăng Ký</button>
        </div>
      </header>

      <main>
        <section className="featured-movies">
          <h2>Phim Nổi Bật</h2>
          <div 
            ref={horizontalScrollRef} 
            className="horizontal-movie-scroll"
          >
            {infiniteMovies.map((movie, index) => (
              <div 
                key={`${movie.id}-${index}`} 
                className="movie-card"
              >
                <div className="movie-card-inner">
                  <img 
                    src={movie.poster} 
                    alt={movie.title} 
                    className="movie-poster" 
                  />
                  <div className="movie-details">
                    <h3>{movie.title}</h3>
                    <p>{movie.description}</p>
                    <div className="movie-rating">
                      <span>Rating: {movie.rating}</span>
                      <button className="book-ticket-btn">Đặt Vé</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="movie-list">
          <h2>Danh Sách Phim</h2>
          <div className="movie-grid">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-list-item">
                <img 
                  src={movie.poster} 
                  alt={movie.title} 
                  className="movie-list-poster" 
                />
                <div className="movie-list-details">
                  <h3>{movie.title}</h3>
                  <p>{movie.description}</p>
                  <div className="movie-list-rating">
                    <span>Rating: {movie.rating}</span>
                    <button className="book-ticket-btn">Xem Chi Tiết</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
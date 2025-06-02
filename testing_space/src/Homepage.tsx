import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSpring, animated } from 'react-spring';
import logo from '../public/logo.png';
import mov1 from '../public/mov1.jpg';
import mov2 from '../public/mov2.jpg';
import mov3 from '../public/mov3.jpg';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Movie data using local images
const movies = [
  {
    id: 1,
    title: 'Phim Hành Động',
    description: 'Trải nghiệm những pha hành động đỉnh cao',
    poster: mov1,
    rating: 8.8
  },
  {
    id: 2,
    title: 'Phim Tình Cảm',
    description: 'Câu chuyện tình yêu đầy cảm động',
    poster: mov2,
    rating: 9.0
  },
  {
    id: 3,
    title: 'Phim Khoa Học Viễn Tưởng',
    description: 'Khám phá thế giới ngoài hành tinh',
    poster: mov3,
    rating: 8.6
  }
];

// Duplicate movies to create infinite scroll effect
const infiniteMovies = [...movies, ...movies, ...movies];

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const horizontalScrollRef = useRef<HTMLDivElement>(null);

  // React Spring animation for second movie list
  const springProps = useSpring({
    from: { transform: 'translateX(0%)' },
    to: { transform: 'translateX(-50%)' },
    config: { duration: 10000 },
    reset: true,
    loop: true
  });

  useEffect(() => {
    // Horizontal ScrollTrigger for movie list
    if (horizontalScrollRef.current) {
      const scrollTriggerInstance = gsap.to(horizontalScrollRef.current, {
        x: () => -(horizontalScrollRef.current!.scrollWidth / 3),
        ease: "none",
        repeat: -1,
        duration: 10,
        paused: true,
        scrollTrigger: {
          trigger: horizontalScrollRef.current,
          start: "top center",
          end: "bottom top",
          onEnter: () => scrollTriggerInstance.play(),
          onLeave: () => scrollTriggerInstance.pause(),
          onEnterBack: () => scrollTriggerInstance.play(),
          onLeaveBack: () => scrollTriggerInstance.pause()
        }
      });

      return () => {
        scrollTriggerInstance.kill();
      };
    }
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src={logo} 
              alt="F Cinema Logo" 
              className="w-16 h-16 mr-4" 
            />
            <span className="text-2xl font-bold text-primary">F CINEMA</span>
          </div>
          
          <nav className="flex space-x-6">
            {['Lịch Chiếu', 'Phim', 'Rạp', 'Giá Vé'].map((item) => (
              <button 
                key={item} 
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {item}
              </button>
            ))}
          </nav>
          
          <div className="flex space-x-4">
            <button 
              onClick={handleLogin} 
              className="px-4 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white transition-colors"
            >
              Đăng Nhập
            </button>
            <button 
              onClick={handleRegister} 
              className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition-colors"
            >
              Đăng Ký
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Phim Nổi Bật (GSAP Infinite Scroll)
          </h2>
          <div 
            ref={horizontalScrollRef} 
            className="flex space-x-8 overflow-hidden"
          >
            {infiniteMovies.map((movie, index) => (
              <div 
                key={`${movie.id}-${index}`} 
                className="flex-shrink-0 w-72 bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:-translate-y-2"
              >
                <img 
                  src={movie.poster} 
                  alt={movie.title} 
                  className="w-full h-96 object-cover" 
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
                  <p className="text-gray-600 mb-4">{movie.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Rating: {movie.rating}</span>
                    <button className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary">
                      Đặt Vé
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Phim Mới (React Spring Infinite Scroll)
          </h2>
          <animated.div 
            style={{
              ...springProps,
              display: 'flex',
              width: '200%',
              gap: '30px',
              padding: '20px 0',
              boxSizing: 'border-box'
            }}
          >
            {infiniteMovies.map((movie, index) => (
              <div 
                key={`spring-${movie.id}-${index}`} 
                className="flex-shrink-0 w-72 bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:-translate-y-2"
              >
                <img 
                  src={movie.poster} 
                  alt={movie.title} 
                  className="w-full h-96 object-cover" 
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
                  <p className="text-gray-600 mb-4">{movie.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Rating: {movie.rating}</span>
                    <button className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary">
                      Đặt Vé
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </animated.div>
        </section>
      </main>

      <footer className="bg-gray-200 py-6">
        <div className="container mx-auto text-center">
          <p className="text-gray-700">© 2024 F Cinema. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage; 
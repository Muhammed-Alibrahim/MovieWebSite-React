

import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { auth } from '../../firebase/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const context = useContext(AuthContext);
  const [loading, setLoading] = useState(false); // Move useState to the top level

  // Fallback if AuthContext is undefined
  if (!context) {
    console.error('AuthContext is undefined. Ensure AuthProvider wraps the app.');
    return null;
  }

  const { user } = context;

  // Google Sign-In Handler
  async function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
      setLoading(false);
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
      setLoading(false);
    }
  }

  // Logout Handler
  async function handleLogout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <div className="container-fluid">
          <Link className="navbar-brand text-light" to="/">
            <h3>WatchNow</h3>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {user ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/movies">
                    Movies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/tvshow">
                    TV Shows
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/people">
                    People
                  </Link>
                </li>
              </ul>
            ) : (
              ''
            )}

            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
              {user ? (
                <>
                  <li className="nav-item d-flex align-items-center">
                    <span className="text-white me-3">
                      Welcome, {user.displayName || user.email}
                    </span>
                  </li>
                  <li className="nav-item">
                    <span onClick={handleLogout} className="nav-link pointer">
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button
                    onClick={handleGoogleSignIn}
                    className="btn btn-danger"
                    disabled={loading}
                  >
                    {loading ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      'Sign in with Google'
                    )}
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
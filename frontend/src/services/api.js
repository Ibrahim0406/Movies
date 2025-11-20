const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';

export const fetchAllMovies = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/movies`);
    if (!response.ok) {
      throw new Error('Greška pri učitavanju filmova');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchMovieByImdbId = async (imdbId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/movies/${imdbId}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Greška pri učitavanju filma');
    }
    const data = await response.json();
    // Handle Optional<Movie> - Spring Boot may return null or the object directly
    return data || null;
  } catch (error) {
    console.error('Error fetching movie:', error);
    throw error;
  }
};

export const createReview = async (reviewBody, imdbId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reviewBody: reviewBody,
        imdbId: imdbId,
      }),
    });
    if (!response.ok) {
      throw new Error('Greška pri kreiranju recenzije');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};


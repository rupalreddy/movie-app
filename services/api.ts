export const TMBD_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}


export const fetchMovies = async ({ query }: { query: string }) => {
    const endpoint = query
        ? `${TMBD_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${TMBD_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const reponse = await fetch(endpoint, {
        method: 'GET',
        headers: TMBD_CONFIG.headers,
    });

    if (!reponse.ok) {
        // @ts-ignore
        throw new Error('Failed to fetch movies', reponse.statusText);
    }

    const data = await reponse.json();

    return data.results;

}

export const fetchMoviesDetails = async (movieId: string): Promise<MovieDetails> => {
    try {
        const response = await fetch(`${TMBD_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMBD_CONFIG.API_KEY}`, {
            method: 'GET',
            headers: TMBD_CONFIG.headers,
        });

        if (!response.ok) throw new Error('Failed to fetch movies details');

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

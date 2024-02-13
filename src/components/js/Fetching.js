import axios from "axios";

export const fetching = async (p, p1) => {
    try {
        const response = await axios.get(`https://api.tvmaze.com/shows`);
        p(response.data);
    } catch (error) {
        console.error('There was an error fetching the episodes:', error);
        p1(error);
    }
};
export const fetchSeasons = async (showId, setSeasons) => {
    try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${showId}/seasons`);
        setSeasons(response.data);
    } catch (error) {
        console.error('Failed to fetch seasons:', error);
    }
};

export const fetchEpisodes = async (seasonId, setEpisodes) => {
    try {
        const response = await axios.get(`https://api.tvmaze.com/seasons/${seasonId}/episodes`);
        setEpisodes(response.data);
    } catch (error) {
        console.error('Fehler beim Abrufen der Episoden:', error);
    }
};
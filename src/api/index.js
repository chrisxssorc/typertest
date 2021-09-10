import axios from 'axios';

export async function getAllPassages() {
    try {
        const { data: {passage} } = await axios.get('/api/passages');
        return passage;
    } catch (error) {
        throw error;
    }
}

export async function getPassageById(id) {
    try {
        const { data } = await axios.get(`/api/passages/${id}`);
        return data;
    } catch (error) {
        throw error;
    }
}

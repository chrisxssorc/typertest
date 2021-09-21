import axios from 'axios';

export async function getAllPassages() {
    try {
        const { data: {passage} } = await axios.get('/api/passages');
        return passage;
    } catch (error) {
        throw error;
    }
}

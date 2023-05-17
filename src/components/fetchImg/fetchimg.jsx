import axios from "axios";

export async function fetchImg(inputData, page) {
    const searchParams = new URLSearchParams({
        key: '34884356-6ab63fddabd0592c676cde3fe',
        q: inputData,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 12,
        page,
    });
    const images = await axios.get(`https://pixabay.com/api/?${searchParams}`);

    return images.data;
}
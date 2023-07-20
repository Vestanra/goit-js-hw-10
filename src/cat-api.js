import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_v5EguAbzIiJWZ7VTBs77ekkaDdiNotEihDYcrm3xSDi9iJqWcUq51xnFPLZxyao1";

function fetchBreeds(BASE_URL) {
    return axios.get(BASE_URL)
        .then(response => {
            console.log(response.date)
            return response.data
        })
};


function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(response => {
            return response.data
        })
}
export { fetchBreeds, fetchCatByBreed };
    
    

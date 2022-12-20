import axios from "axios";

const TOKEN = "cego8daad3i0qis38hc0cego8daad3i0qis38hcg"

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN
  }
})
import axios from "axios";

// for deployment
// export default axios.create();

export default axios.create({
  baseURL: "http://localhost:8000",
});

// import axios from "axios";
// import { useFetch } from "./useFetch";

// const api = axios.create({
//   baseURL: "http://localhost:3004",
// });

// export function useRemove(url, id) {
//   const [projects, setProjects] = useState(({ data } = useFetch(url)));

//   const removeProject = (url, id) => {
//     api
//       .delete(`${url}/${id}`)
//       .then((response) => {
//         console.log(response);
//       })
//       .then(() => {
//         setProjects(projects.filter((project) => project.id !== id));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return { removeProject };
// }

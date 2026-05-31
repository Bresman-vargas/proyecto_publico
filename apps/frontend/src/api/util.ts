import axios from "./axios";

export const getRegionesRequest = () => axios.get("/regiones");

export const getComunasByRegionRequest = (idRegion: number) => 
  axios.get(`/regiones/${idRegion}/comunas`);
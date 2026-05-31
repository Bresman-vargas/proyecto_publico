import * as utilService from "../services/util.services.js";

export const getRegions = async (req, res) => {
  try {
    const regions = await utilService.getAllRegions();
    return res.status(200).json(regions);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const getComunas = async (req, res) => {
  try {
    const { id_region } = req.params;
    const comunas = await utilService.getComunasByRegion(id_region);
    return res.status(200).json(comunas);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
import axios from "axios";

const URL_API="http://localhost:5000/medications"

//GET para ver el listado de toda la medicación
export const getMedication = async()=>{
    try{
        const res = await axios.get(URL_API);
        return res.data;
    }catch(error){
        const errorMessage = `Error al obtener el listado de medicación: ${error.response?.data?.message || error.message}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
    }
}

//Get para ver UN medicamento especifico
export const getMedicationById = async(id)=>{
    try{
        const res = await axios.get(`${URL_API}/${id}`);
        return res.data;
    }catch(error){
        const errorMessage = `Error al obtener el medicamento con id ${id}: ${error.response?.data?.message || error.message}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
    }
}

//Post para crear un medicamento nuevo
export const createMedication = async(newMedication)=>{ 
    try{
        const res = await axios.post(URL_API, newMedication);
        return res.data;
    }catch(error){
        const errorMessage = `Error al crear el medicamento: ${error.response?.data?.message || error.message}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
}

//Put para actualizar la informacion de un medicamento
export const updateMedication = async(id, updatedMedication)=>{
    try{
        const res = await axios.put(`${URL_API}/${id}`, updatedMedication);
        return res.data;
    }catch(error){
        const errorMessage = `Error al actualizar el medicamento con id ${id}: ${error.response?.data?.message || error.message}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
    }
}

//Delete para eliminar un medicamento
export const deleteMedication = async(id)=>{
    try{
        const res = await axios.delete(`${URL_API}/${id}`);
        return res.data;
    }
    catch(error){
        const errorMessage = `Error al eliminar el medicamento con id ${id}: ${error.response?.data?.message || error.message}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
}
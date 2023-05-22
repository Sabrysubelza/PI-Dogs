const axios= require("axios");
const {Dog,Temperament} = require("../db");




const getDogApi= async() =>{
    try {
        const infoApi = await axios.get("https://api.thedogapi.com/v1/breeds") 
        const dogMap= await infoApi.data.map(e=> {
            return {
                id: e.id,
                name: e.name ,
                height: e.height.metric,
                weight: e.weight.metric,
                life_span: e.life_span,
                image: e.image.url,
                temperament: e.temperament,               
            }
        })
        return dogMap;
    } catch (error) {
        console.log("error en getDogApi", error)
        
    }
}

const getDogDb = async () => {
    try {
        return await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ["name"],
                through: { 
                    attributes: [],
                },
            },
        });
    } catch (error) {
        console.log("ERROR EN getDogDb", error);
    }
};

const getDogTotal = async () => {

    try {
        const r1 = await getDogApi()
        const r2 = await getDogDb()
        const final = [...r1, ...r2]
        return final
    } catch (error) {
        console.log('ERROR en getDogTotal', error)
    }
}

const getAllTemperament = async () => {
    try {
        const info = await axios.get("https://api.thedogapi.com/v1/breeds") 
        const temperaments = info.data.map(e => e.temperament);
    const temps = temperaments.toString().split(",");
    temps.forEach(el => {
        let i = el.trim()
        Temperament.findOrCreate({
             where: { name: i }
        })
    })

    const allTemp = await Temperament.findAll();
    
    return allTemp;  
   
    } catch (error) {
        console.log("Error en getAllTemperament", error)
    }
}





module.exports= {getDogTotal, getAllTemperament }
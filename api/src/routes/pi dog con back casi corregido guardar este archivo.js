const {Router}= require("express");
const {getDogTotal}= require("../routes/utils");
const {Dog,Temperament} = require("../db");
const router = Router();



router.get ('/', async (req,res)=>{
    try {
        const {name}= req.query
        const info= await getDogTotal()
        if(!name){
            res.status(200).send(info)
        }else {
            const filter= info.filter( e => e.name.toLowerCase().includes(name.toLowerCase()))
            filter.length ? res.status(200).send(filter) : res.status(404).send('error en ruta GET/')
        }

        
    } catch (error) {
        console.log ("error en la ruta get Dog",error)        
    }

} )

router.get('/:id', async(req,res)=>{
    try {
        const {id}= req.params
        const total= await getDogTotal()
        if (id) {
            const dogs= total.find(e => e.id == id)
            dogs?res.status(200).send(dogs): res.status(404).send("error en ruta Get:id")
            
        } 
    } catch (error) {
        console.log ("error en ruta get id",error)
    }
})

router.post('/', async(req,res)=>{
    try {
        const {name,height,weight,life_span,image,temperament}= req.body
        const newDog= await Dog.create({
            name,
            height,
            weight,
            life_span,
            image,
            
        })
        const temp= await Temperament.findAll({
            where:{name:temperament}
        })
        newDog.addTemperament(temp)
       res.status(200).send(newDog)

        
    } catch (error) {
        console.log ("error en ruta post Dog",error)
    }
})

module.exports= router;
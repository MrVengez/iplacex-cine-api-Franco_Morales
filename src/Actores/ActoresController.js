import { ObjectId } from "mongodb";
import client from "../common/db.js";
import { Actores } from "./Actores.js";

const actorCollection = client.db('cine-db').collection('actores');
const peliculaCollection = client.db('cine-db').collection('pelicula');

/////////////////////////////// INGRESAR ACTOR ///////////////////////////////////////////
async function handleInsertActorRequest(req, res) {
    let data = req.body;

    
    const pelicula = await peliculaCollection.findOne({ pelicula: data.nombre });

    if (pelicula) {
        
        return res.status(400).send('La película no existe');
    }

    
    let actor  = Actores

        actor.idPelicula = data.idPelicula,  
        actor.nombre = data.nombre,
        actor.edad = data.edad,
        actor.estaRetirado = data.estaRetirado,
        actor.premios = data.premios
   

        await actorCollection.insertOne(actor)
        .then((data) =>{
            if(data === null) return res.status(400).send('Error al guardar actor')
            
                return res.status(201).send(data)
        })
        .catch((e) => {return res.status(500).send({error:e})})
}
////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////// TRAER ACTOR /////////////////////////////////////////////////

async function handleGetActoresRequest(req, res) {
    await actorCollection.find({}).toArray()
    .then((data) => {return res.status(200).send(data)})
    .catch((e) => {return res.status(500).send({error: e})})
}
////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////// TRAER ACTOR POR ID///////////////////////////////////////////

async function handleGetActorByIdRequest(req, res) {
    let id = req.params.id;
    try {
        let oid = ObjectId.createFromHexString(id);
        
        await actorCollection.findOne({ _id: oid })
        .then((data) => {
            if (data === null) return res.status(404).send('Actor no encontrado');

            return res.status(200).send(data);
        })
        .catch((e) => {
            return res.status(500).send({ error: e.code });
        });

    } catch (e) {
        return res.status(400).send('ID mal formado actor');
    }
}
////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////// TRAER ACTOR POR ID PELICULA/////////////////////////////////////

async function handleGetActorByIdPeliculaRequest(req, res) {
    let nombrePelicula = req.params.nombrePelicula;

    try {
        
        await actorCollection.find({ idPelicula: nombrePelicula }).toArray()
        .then((data) => {
            if (data.length === 0) return res.status(404).send('No se encontraron actores para esta película');

            return res.status(200).send(data);
        })
        .catch((e) => {
            return res.status(500).send({ error: e.message });
        });

    } catch (e) {
        return res.status(400).send('ID mal formado pelicula');
    }
}
////////////////////////////////////////////////////////////////////////////////////////////

export default {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActorByIdPeliculaRequest,
};

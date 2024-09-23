import express from 'express'
import controller from './PeliculaController.js'

const Pelicularoutes = express.Router()

Pelicularoutes.post('/pelicula', controller.handleInsertPeliculaRequest)

Pelicularoutes.get('/peliculas', controller.handleGetPeliculasRequest)
Pelicularoutes.get('/pelicula/:id', controller.handleGetPeliculaByIdRequest)
Pelicularoutes.put('/pelicula/:id', controller.handleUpdatePeliculaByIdRequest)
Pelicularoutes.delete('/pelicula/:id', controller.handleDeletePeliculaByIdRequest)

export default Pelicularoutes
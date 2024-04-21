import {fastify} from 'fastify'
//import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgre.js'
const server = fastify()

//const database = new DatabaseMemory()
const database = new DatabasePostgres()


server.post('/videos', async(request, replay) => {
  
  const {title, description, duration} = request.body

  console.log(request.body)
  
 await database.create({
    title,
    description,
    duration
  })
  
  replay.status(201).send()

})

server.get('/videos', async (request) => {
  
  const search = request.query.search
  const videos = await database.list(search)
  console.log(videos)

  return videos

})

server.put('/videos/:id', async (request, replay) => {
  
  const videoId = request.params.id
  const {title, description, duration} = request.body

  console.log(`id do video: ${videoId}`)
  
 await database.update(videoId, {
    title,
    description,
    duration
  })
  
 return replay.status(204).send()

})

server.delete('/videos/:id', (request, replay) => {
  
  const videoId = request.params.id
  
  database.delete(videoId)

  return replay.status(204).send()
})


server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3334,
  }
)
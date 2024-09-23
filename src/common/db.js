import { MongoClient, ServerApiVersion } from "mongodb";

const uri = 'mongodb+srv://francomoralesaguirre:QWm4JBKSO9Gw2Iua@eva-u3-express.ewjav.mongodb.net/?retryWrites=true&w=majority&appName=eva-u3-express'

const client = new MongoClient(uri, {
    serverApi:{
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true

}
})

export default client
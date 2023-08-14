const express = require('express');
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const cors = require('cors');
const port = process.env.PORT || 5000;

// middlewares
app.use(cors())
app.use(express.json())

// Xd8F46FmOucjOqwC
// OruPhones

const uri = "mongodb+srv://OruPhones:Xd8F46FmOucjOqwC@cluster0.cpvrkgd.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        const usersCollection = client.db('OruUser').collection('user')
        const experienceCollection = client.db('OruUser').collection('experience')
        const skillsCollection = client.db('OruUser').collection('skill')
        const certificateCollection = client.db('OruUser').collection('certificate')
        const educationCollection = client.db('OruUser').collection('education')
      

        app.post('/users', async (req, res) => {
            const user = req.body;
            const query = { email: user.email }
            const existingUser = await usersCollection.findOne(query);
            if (existingUser) {
                return res.send({ message: 'user already exists' })
            }
            const result = await usersCollection.insertOne(user)
            res.send(result)
        })

        app.get('/users', async (req, res) => {
            let email = {}
            if (req.query?.email) {
                email = { email: req.query.email }
            }
            const result = await usersCollection.find(email).toArray()
            res.send(result)
        })

        app.post('/experience', async(req, res)=>{
            const body = req.body
            const result = await experienceCollection.insertOne(body)
            res.send(result)
        })
        app.get('/experience', async (req, res) => {
            let email = {}
            if (req.query?.email) {
                email = { email: req.query.email }
            }
            const result = await experienceCollection.find(email).toArray()
            res.send(result)
        })

        app.post('/skills', async(req, res)=>{
            const body = req.body
            const result = await skillsCollection.insertOne(body)
            res.send(result)
        })
         app.get('/skills', async (req, res) => {
            let email = {}
            if (req.query?.email) {
                email = { email: req.query.email }
            }
            const result = await skillsCollection.find(email).toArray()
            res.send(result)
        })
        // certificate
         app.post('/certificate', async(req, res)=>{
            const body = req.body
            const result = await certificateCollection.insertOne(body)
            res.send(result)
        })
        
        app.get('/certificate', async (req, res) => {
            let email = {}
            if (req.query?.email) {
                email = { email: req.query.email }
            }
            const result = await certificateCollection.find(email).toArray()
            res.send(result)
        })
        // education
         app.post('/education', async(req, res)=>{
            const body = req.body
            const result = await educationCollection.insertOne(body)
            res.send(result)
        })
        app.get('/education', async (req, res) => {
            let email = {}
            if (req.query?.email) {
                email = { email: req.query.email }
            }
            const result = await educationCollection.find(email).toArray()
            res.send(result)
        })


        app.patch('/updateProfile/:id', async (req, res) => {
            const id = req.params.id
            const body = req.body;
            const filter = { _id: new ObjectId(id) }
            const updatedUser = {
                $set: {
                                      
                }
            }
            if (body?.skill !== undefined) {
                updatedUser.$set.skill = body.skill;
            }
            if (body?.about !== undefined) {
                updatedUser.$set.about = body.about;
            }
            if (body?.image !== undefined) {
                updatedUser.$set.image = body.image;
            }
            if (body?.phone !== undefined) {
                updatedUser.$set.phone = body.phone;
            }
            const result = await usersCollection.updateOne(filter, updatedUser);
            res.send(result);
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('oruphone server is running')
})

app.listen(port, () => {
    console.log('server running at 5000');
})

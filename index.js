const express = require('express');
require('./config.js');
const products = require('./product.js');

const app = express();

app.use(express.json());
app.post('/Create', async (req,resp)=>
{
    let data = new products(req.body);
    let result = await data.save();
    console.log(result);
    resp.send(result);
});

app.get('/list',async (req,resp)=>
{
    let data = await products.find();
    resp.send(data);
});

app.delete('/delete/:_id', async (req,resp)=>
{
    let data = await products.deleteOne(req.params);
    console.log (req.params);
    console.log (data);
    resp.send(data);
});

app.put("/update/:_id",async (req,resp)=>
{
    let data = await products.updateOne(
        
                //becoz req.params comes as object {}
        req.params,
        {
            $set: req.body
        }
    );
    resp.send(data);
    console.log(data);
});

//serching in database
app.get('/search/:key', async (req,resp)=>
{
    console.log(req.params.key);
    let data;
    

         data = await products.find(
            {
                "$or":
                [
                    
                    {
                        "model": {$regex:req.params.key}
                    },
                    {
                        "brand": {$regex:req.params.key}
                    },
                    
                    
                ]
            }
            );

        resp.send(data);
});

app.get('*',(req,resp)=>
{
    resp.send(" Link Broken! Invalid URL");
});

app.listen(5500, ()=>
{
    console.log("Server Is Up and Running on Port 5500");
});
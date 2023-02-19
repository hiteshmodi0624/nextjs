import { MongoClient } from "mongodb";
export default async function handler(req,res){
  if(req.method==="POST"){
    const data = req.body;
    const client=await MongoClient.connect(
      "mongodb+srv://hiteshmodi0624:Faaccbuk12@cluster0.puzjhif.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db=client.db();
    const meetupsCollections=db.collection('meetups');
    const result=await meetupsCollections.insertOne(data);
    console.log(result)
    client.close();
    res.status(201).json({ message: "Meetup Inserted" });
  }
}
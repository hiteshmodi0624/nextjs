import MeetupList from "@/components/meetups/MeetupList"
import { MongoClient } from "mongodb"
import Head from "next/head";
import { Fragment } from "react";

function HomePage(props){

  return (
    <Fragment>
      <Head>
        <title>NextJs Meetups</title>
        <meta name="description" content="Browse a huge list of meetups"/>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}
// STATIC SITE GENERATION
// runs only during the build production
export async function getStaticProps(){
  const client=await MongoClient.connect(
    "mongodb+srv://hiteshmodi0624:Faaccbuk12@cluster0.puzjhif.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db=client.db();
  const meetupsCollections=db.collection('meetups');
  const MEETUPS=await meetupsCollections.find().toArray();
  client.close()
  return {
    props:{
      meetups:MEETUPS.map(meetup=>({
        title:meetup.title,
        image:meetup.image,
        address:meetup.address,
        id:meetup._id.toString()
      }))
    },
    revalidate:1
  }
}

//SERVER SITE GENERATION
//Only runs on ther server
// export async function getServerSideProps(context){
    // const req=context.req;
    // const res=context.res;
//   return {
//     props:{
//       meetups:DUMMY_MEETUPS
//     }
//   }
// }

export default HomePage
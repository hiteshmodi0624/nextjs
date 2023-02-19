import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Head>
      <MeetupDetail
        image={props.image}
        title={props.title}
        address={props.address}
        description={props.description}
      />
    </Fragment>
  );
}
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://hiteshmodi0624:Faaccbuk12@cluster0.puzjhif.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollections = db.collection("meetups");
  const meetups = await meetupsCollections.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: 'blocking',
    paths:
      meetups.map((meetup) => ({
        params: { meetupId: meetup._id.toString() },
      })),
  };
}
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://hiteshmodi0624:Faaccbuk12@cluster0.puzjhif.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollections = db.collection("meetups");
  const meetupData = await meetupsCollections.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();
  console.log(meetupData);
  return {
    props: {
      id: meetupData._id.toString(),
      image: meetupData.image,
      address: meetupData.address,
      description: meetupData.description,
      title: meetupData.title,
    },
  };
}
export default MeetupDetails;

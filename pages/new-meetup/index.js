import NewMeetupForm from "@/components/meetups/NewMeetupForm"
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

function NewMeetupPage(){
    const router=useRouter();
    async function addMeetupHandler(enteredMeetupData){
        const request = await fetch("/api/new-meetup", {
          method: "POST",
          body: JSON.stringify(enteredMeetupData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data=await request.json();
        console.log(data);
        router.push('/');
    }
  return (
    <Fragment>
      <Head>
        <title>Add new Meetup</title>
        <meta name="description" content="Browse a huge list of meetups" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}
export default NewMeetupPage
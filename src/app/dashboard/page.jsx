"use client"

import React, { useEffect, useState } from 'react'
import useSWR from "swr";
import styles from "./page.module.css"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BlogForm from "@/components/blogForm/BlogForm";

const Dashboard = () => {


  //OLD WAY TO FETCH DATA

  // const [data, setData] = useState([]);
  // const [err, setErr] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const getData = async () => {
  //     setIsLoading(true);
  //     const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
  //       cache: "no-store",
  //     });

  //     if (!res.ok) {
  //       setErr(true);
  //     }

  //     const data = await res.json()

  //     setData(data);
  //     setIsLoading(false);
  //   };
  //   getData()
  // }, []);


  const session = useSession()

  const router = useRouter();
  const authUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;


  console.log("ENVVV => ", process.env.NEXT_PUBLIC_NEXTAUTH_URL)
  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const { data, mutate, error, isLoading } = useSWR(`${authUrl}/api/posts?username=${session?.data?.user.name}`, fetcher)
   console.log("post", data)




  if (session.status === "loading") {
    return <p>Loading...</p>
  }

  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login")
  }


  // console.log(session)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;
    const img = e.target[2].value;
    const content = e.target[3].value;

    try {
      await fetch(`${authUrl}/api/posts`, {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          username: session.data.user.name,
        }),
      });
      mutate();
      e.target.reset()
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
     // console.log("IDDD", id)
      await fetch(`${authUrl}/api/posts/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (err) {
      console.log(err);
    }
  };


  if (session.status === "authenticated") {
    return <div className={styles.container}>
      <div className={styles.posts}>
        {isLoading ? "loading" :
          data?.map((post) => (
            <div key={post._id} className={styles.post}>
              <div className={styles.imgContainer}>
                <Image src={post.img} width={200} height={100} alt="" />
              </div>
              <h2 className={styles.postTitle}> {post.title} </h2>
              <span className={styles.delete}
                onClick={() => handleDelete(post._id)}
              >X</span>
            </div>
          ))
        }
      </div>
     <BlogForm />
    </div>
  }

}

export default Dashboard
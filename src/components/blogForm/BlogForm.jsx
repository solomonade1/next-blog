"use client"

import useSWR from "swr";
import { useSession } from "next-auth/react";
import styles from "./blogForm.module.css";

const BlogForm = () => {
  const session = useSession()
  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const { data, mutate, error, isLoading } = useSWR(`/api/posts?username=${session?.data?.user.name}`, fetcher)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;
    const img = e.target[2].value;
    const content = e.target[3].value;

    try {
      await fetch("http://localhost:3000/api/posts", {
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
  return (
    <form className={styles.new} onSubmit={handleSubmit}>
      <h1>Add New Post</h1>
      <input type="text" placeholder="Title" className={styles.input} />
      <input type="text" placeholder="Desc" className={styles.input} />
      <input type="text" placeholder="Image" className={styles.input} />
      <textarea
        placeholder="Content"
        className={styles.textArea}
        cols="30"
        rows="10"
      ></textarea>
      <button className={styles.button}>Send</button>
    </form>
  )
}

export default BlogForm
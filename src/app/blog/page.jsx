/* eslint-disable @next/next/no-async-client-component */
"use client"
import React from 'react'
import styles from "./page.module.css"
import Button from "@/components/Button/Button"
import Image from "next/image"
import Link from "next/link"

async function getData() {
  const res = await fetch('http://localhost:3000/api/posts', {
    cache: "no-store"
  })

  if (!res.ok) {

    throw new Error('Failed to fetch data')
  }

  return res.json()
}

const Blog = async ({ params }) => {
  const blogData = await getData()
  return (
    <div className={styles.mainContainer}>


      {
        blogData.map(item => (
          <Link href={`/blog/${item._id}`} key={item._id} className={styles.container}>
            <h1 className={styles.catTitle}> {params.title} </h1>
            <div className={styles.item} >
              <div className={styles.content} >
                <h1 className={styles.title}>{item.desc} </h1>
                <p className={styles.desc}>{item.content}</p>
                <Button text="See More" url="#" />
              </div>
              <div className={styles.imgContainer} >
                <Image className={styles.img} fill={true} src="https://images.pexels.com/photos/3130810/pexels-photo-3130810.jpeg"
                  alt="" />
              </div>
            </div>
          </Link>
        ))
      }


    </div>
  )
}

export default Blog
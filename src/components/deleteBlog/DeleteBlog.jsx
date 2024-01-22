import React from 'react'

const DeleteBlog = () => {

    const handleDelete = async (id) => {
        try {
          console.log("IDDD", id)
          await fetch(`/api/posts/${id}`, {
            method: "DELETE",
          });
          mutate();
        } catch (err) {
          console.log(err);
        }
      };
    
  return (
    <span className={styles.delete}
    onClick={() => handleDelete(post._id)}
  >X</span>
  )
}

export default DeleteBlog
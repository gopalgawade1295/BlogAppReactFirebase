import React, { useState, useEffect } from 'react';
import { getDocs, deleteDoc, collection, doc } from 'firebase/firestore';
import { auth, db } from '../Firebase';
import { Card, Button, Form } from 'react-bootstrap';

function Homepage({ isAuth }) {
  const [blog, setBlog] = useState([])
  const blogsCollection = collection(db, 'blogs')
  const [search, setSearch] = useState('')

  const DeleteBlog = async (id) => {
    const blogDoc = doc(db, 'blogs', id)
    await deleteDoc(blogDoc)
  }

  useEffect(() => {
    const getBlogs = async () => {
      const data = await getDocs(blogsCollection);
      setBlog(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getBlogs();
  });

  return <div className="container">
    <Form.Control type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
    <br />
    <Card>
      {
        blog.filter((Blog) => {
          if (search == '') {
            return Blog
          }
          else if (Blog.title.toLowerCase().includes(search.toLowerCase())) {
            return Blog
          }
        }).map((Blog) => {
          return (
            <Card.Body>
              <h5>{Blog.title}</h5>
              <p>{Blog.article}</p>
              <h6 style={{ textAlign: 'right' }}>- {Blog.author.name} &nbsp; {isAuth && Blog.author.id === auth.currentUser.uid && <Button variant="danger" size="sm" onClick={() => { DeleteBlog(Blog.id) }}>Delete</Button>}</h6>
              <hr />
            </Card.Body>
          )
        })}
    </Card>
  </div>;
}

export default Homepage;

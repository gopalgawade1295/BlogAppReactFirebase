import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../Firebase';
import { useHistory } from 'react-router-dom';

function Blogpage({ isAuth }) {
  const [title, setTitle] = useState('')
  const [article, setArticle] = useState('')
  const blogsCollection = collection(db, 'blogs')
  let history = useHistory()

  const CreateBlog = async () => {
    await addDoc(blogsCollection, { title, article, author: { name: auth.currentUser.email, id: auth.currentUser.uid } })
    history.push('/')
  }

  useEffect(() => {
    if (!isAuth) {
      history.push('/login')
    }
  }, [])

  return <div>
    <Form>
      <div className="container">
        <h3>Create a blog</h3>
        <Form.Group className="mb-3">
          <h5>Title</h5>
          <Form.Control type="text" onChange={(e) => setTitle(e.target.value)} />
          <br />
          <h5>Article</h5>
          <Form.Control as="textarea" rows={3} type="text" onChange={(e) => setArticle(e.target.value)} />
          <br />
          <Button variant="primary" onClick={CreateBlog}>Create</Button>
        </Form.Group>
      </div>
    </Form>
  </div>;
}

export default Blogpage;

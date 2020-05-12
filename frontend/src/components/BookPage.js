import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BookPage = (props) => {
  const [state, setState] = useState({
    book: {},
    isLoaded: false,
  });

  useEffect(() => {
    axios
      .get(`/wp-json/wp/v2/books/${props.match.params.id}`)
      .then((res) => {
        setState({
          book: res.data,
          isLoaded: true,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const { book, isLoaded } = state;

  if (isLoaded) {
    return (
      <>
        <Link to="/">Go Back</Link>
        <hr />
        <h1>{book.title.rendered}</h1>
        <div dangerouslySetInnerHTML={{ __html: book.content.rendered }} />
        <h4>Publisher: {book.acf.publisher}</h4>
      </>
    );
  }

  return <h3>Loading...</h3>;
};

export default BookPage;

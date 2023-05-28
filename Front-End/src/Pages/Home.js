import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, postsArray, postsLoading } from "../Reducers/postsSlice";
import { SingleCard } from "../Components/SingleCard";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/home.css";
import Navbar from "react-bootstrap/Navbar";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import useSession from "../hook/useSession";
import '../styles/home.css'


const Home = () => {
  const dispatch = useDispatch();
  const test = useSession();
  console.log(test);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const [postsPerPage, setPostsPerPage] = useState(20);
  const postsPerPageOptions = [0, 3, 6, 8, 36];

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const isLoading = useSelector((postsLoading));
  const allPosts = useSelector(postsArray);

  console.log("isLoading:", isLoading);
  console.log("allPosts:", allPosts);

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const displayedPosts = allPosts.slice(startIndex, endIndex);

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Brand>Epiblog</Navbar.Brand>
        </Container>

        <div>
          <span>Posts per page</span>
        </div>
        <select
          value={postsPerPage}
          onChange={(e) => setPostsPerPage(parseInt(e.target.value))}
        >
          {postsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Navbar>
      <Container>
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
        <Row className="">
          <Col className="d-flex flex-wrap gap-3 mt-3 mb-5" lg={12}>
            {displayedPosts &&
              displayedPosts.map((item) => (
                <SingleCard
                  key={item._id}
                  title={item.title}
                  img={item.img}
                  content={item.content}
                  author={item.author}
                  rate={item.rate}
                />
              ))}
          </Col>
        </Row>
      </Container>
      <footer className="footer">
        <Container>
          <Row>
            <Col>
              <ul>
                <li>Contattaci</li>
              </ul>
            </Col>
            <Col>
              <ul>
                <li>Contattaci</li>
              </ul>
            </Col>
            <Col>
              <ul>
                <li>Contattaci</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Home;

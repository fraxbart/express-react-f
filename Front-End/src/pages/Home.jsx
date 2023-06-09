import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPosts, postsArray, postsLoading } from "../Reducers/postsSlice"
import { SingleCard } from "../Components/SingleCard"
import { Container, Row, Col } from "react-bootstrap"
import ResponsivePagination from 'react-responsive-pagination'
import useSession from "../hooks/useSession"
import NavScrollExample from "../Components/Navigation"

const Home = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)

  const isLoading = useSelector(postsLoading); //stato del loading
  const allPosts = useSelector(postsArray); //stato dei post

  useSession()

  const onChangeSetPageSize = (value) => {
    setPageSize(value)
  }

  const handlePageChange = (page) => {
    setPage(page)
  }

  useEffect(() => {
    dispatch(getPosts({ page: page, pageSize: pageSize }));
  }, [dispatch, page, pageSize]); //dispaccia il getpost prima che il componente venga montato occorre popolare l'array almeno una volta 

  return (
    <>
      <Container>
        <NavScrollExample />
        <Row className="">
          <Col className="d-flex flex-wrap gap-2 mt-3 mb-5" lg={12}>
            {!isLoading && allPosts &&
              allPosts.posts?.map((item) => (
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
      <div>
        <ResponsivePagination
          current={page}
          total={allPosts && allPosts.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  )
}

export default Home
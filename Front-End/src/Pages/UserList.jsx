import React, { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import ResponsivePagination from 'react-responsive-pagination'
import UsersCard from "../Components/UsersCard"
//import { useDispatch, useSelector } from "react-redux"
import NavScrollUser from '../Components/NavigationUser'

const UsersList = () => {
    //const dispatch = useDispatch();
    const [data, setData] = useState([]);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(8); //chiedere perchè con 8 non visualizzo

    const loginRequest = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/users?page=${page}&pageSize=${pageSize}`
            );
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.log(error);
        }
    };

    const onChangeSetPageSize = (value) => {
        setPageSize(value)
    }
    const handlePageChange = (page) => {
        setPage(page)
    }

    useEffect(() => {
        loginRequest();
    }, [page, pageSize]);


    /*
    useEffect(() => {
        dispatch(loginRequest({ page: page, pageSize: pageSize }));
    }, [dispatch, page, pageSize]);
      */

    return (
        <>
            <Container>
                <NavScrollUser />
                <Row className="">
                    <Col className="d-flex flex-wrap gap-2 mt-3 mb-5" lg={12}>
                        {data && data.users?.map((user) => (
                            <UsersCard
                                key={user._id}
                                userName={user.userName}
                                email={user.email}
                                role={user.role}
                            />
                        ))}
                    </Col>
                </Row>
            </Container>
            <div>
                <ResponsivePagination
                    current={page}
                    total={data && data.totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </>
    )
}

export default UsersList
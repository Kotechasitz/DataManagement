import React from "react";

import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const token = JSON.parse(localStorage.getItem('access_token'));
const getHeader = {
  Authorization: "Bearer " + token.access_token,
}

const schema = yup.object().shape({
  name: yup.string().required("Require*"),
});

const EditPage = () => {
  const history = useHistory();

  const { id } = useParams();

  const { register, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(schema),
  });
  
  const getData = async () => {
    const resp = await axios.get("http://localhost:4000/student/"+id,{headers: getHeader});
    console.log(resp.data);
    setValue('student_id', resp.data.data.student_id)
    setValue('name', resp.data.data.name)
    setValue('year', resp.data.data.year)
  };

  React.useEffect(() => {
    getData(id);
  }, [id]);

  const onSubmit = async (data) => {
    console.log(data);
    const apiUrl = "http://localhost:4000/student/update/"+id;
    const resp = await axios.put(apiUrl, {
      student_id: data.student_id,
      name: data.name,
      year: data.year,
    }, {headers: getHeader});
    if(resp.status === 200){
        alert('Update Student Data Success');
    }
    
    history.replace("/main");
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="name">
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                type="text"
                name="student_id"
                ref={register}
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
              />
              {errors.name && (
                <Form.Control.Feedback type="invalid">
                  {errors.name.message}
                </Form.Control.Feedback>
              )}

              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                ref={register}
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
              />
              {errors.name && (
                <Form.Control.Feedback type="invalid">
                  {errors.name.message}
                </Form.Control.Feedback>
              )}

              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                name="year"
                ref={register}
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
              />
              {errors.name && (
                <Form.Control.Feedback type="invalid">
                  {errors.name.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Button variant="primary" type="submit">
              บันทึก
            </Button>
          </Form>

          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default EditPage;

import React from "react";

import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";


const schema = yup.object().shape({
  name: yup.string().required("Require*"),
});


const CreatePage = () => {
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

const token = JSON.parse(localStorage.getItem('access_token'));

  const onSubmit = async (data) => {
    // console.log(data);
    // console.log(token.access_token);
    const apiUrl = "http://localhost:4000/student";
    const resp = await axios.post(apiUrl, {
      headers: {
        Authorization: "Bearer " + token.access_token,
      },
      student_id: data.student_id,
      name: data.name,
      year: data.year,
    });
    alert(resp.data.message); //บันทึกข้อมูลเรียบร้อย
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

export default CreatePage;

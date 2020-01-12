import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

const WeatherForm = (props) => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            props.get_location_by_form();
        }
        setValidated(true);

    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} md={{ span: "3", offset: "3" }} controlId="validationCustom03">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="City" value={props.city} onChange={props.city_change} required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid city.
            </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" placeholder="Country" value={props.country} onChange={props.country_change} required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid country.
            </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                    <Form.Label>or</Form.Label><br></br>
                    <Button type='button' variant='outline-success' onClick={props.get_location}>Get Location</Button>
                </Form.Group>

            </Form.Row>
            <Button type="submit">Get Weather Info</Button>
        </Form >
    );
}

export default WeatherForm;
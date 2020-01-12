import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';


const WeatherComponent = (props) => {

    return (
        <Row className='justify-items-center'>
            <Col md={{ span: 6, offset: 3 }} sm={12}>
                <Card className="text-center text-white mt-5" style={{ width: 'auto' }} bg='dark'>
                    <Card.Header>
                        <h3>{props.city}, {props.country}</h3>
                        <h5>Weather Update for <span className='text-warning'>{props.today}</span></h5>
                    </Card.Header>
                    <center><Card.Img variant="top" src={`https://developer.accuweather.com/sites/default/files/${props.icon}-s.png`} className='weather-img mt-3' /></center>
                    <Card.Body>
                        <Card.Title>{props.weather.WeatherText}</Card.Title>
                        <Card.Text>
                            Current Temperature: {props.weather.Temperature.Metric.Value} &deg;C
                            {props.weather.HasPrecipitation && <p>Precipitation: {props.weather.PrecipitationType}</p>}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">Last Updated : {props.last_update} <i className="fa fa-refresh refresh-icon" onClick={props.get_weather} aria-hidden="true"></i></Card.Footer>
                </Card>

            </Col>
        </Row>
    );

}

export default WeatherComponent;
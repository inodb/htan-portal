import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import HTANNavbar from "../htanNavbar";

function Pancreas() {
  return (
      <React.Fragment>
        <HTANNavbar/>
          <Container>
              <Row className="mt-3">
                  <h4>
                      Pancreas Atlas
                  </h4>
              </Row>
          </Container>
      </React.Fragment>
  )
}

export default Pancreas

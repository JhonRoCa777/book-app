import { useEffect, useState } from "react";
import { BookService } from "../services/Book";
import { AuthStore } from "../store";
import { Role } from "../models/Role";
import type { BookLoan } from "../models/BookLoan";
import { Badge, Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { AuthService } from "../services/Auth";

export default function Home() {

  const { all, allByUser } = BookService();
  const { logout } = AuthService();

  const auth = AuthStore();
  const [books, setBooks] = useState<BookLoan[]>([]);

  const getBooks = async () => {
    let temp = [];
    if(auth.role === Role.ADMIN) temp = await all() || [];
    else temp = await allByUser() || [];
    setBooks(temp);
  };

  const myLogout = async () => await logout();

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <Container fluid>
      <br />
      <Button onClick={myLogout} variant="danger"> CERRAR SESION </Button>
      <br /><br />
      <Row xs={1} md={2} lg={3} className="g-4">
        {books.map((book) => (
          <Col key={book.book_id}>
            <Card>
              <Card.Img
                variant="top"
                src={`http://localhost/book-server/storage/app/public/books/${book.image}`}
                alt={book.title}
              />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {book.author} - {book.genre}
                </Card.Subtitle>

                <ListGroup variant="flush">
                  {book.serials.map((serial) => (
                    <ListGroup.Item key={serial.serial_id}>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Serial: {serial.serial}</span>
                        <Badge
                          bg={
                            serial.status === "MORA"
                              ? "danger"
                              : serial.status === "PRESTADO"
                              ? "warning"
                              : "success"
                          }
                        >
                          {serial.status}
                        </Badge>
                      </div>
                      {serial.loan && (
                        <div className="mt-2 small text-muted">
                          <div>
                            Usuario: {serial.loan.user.names}{" "}
                            {serial.loan.user.last_names} ({serial.loan.user.document})
                          </div>
                          <div>
                            Desde: {serial.loan.created_at} Hasta: {serial.loan.end_date}
                          </div>
                        </div>
                      )}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

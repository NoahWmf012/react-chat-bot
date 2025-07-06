import React, { useState } from 'react';
import { Button, Form, ListGroup, Container, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setFacts } from '../redux/slices/factsSlice';


const FactEditor = () => {
    const facts = useSelector((state: RootState) => state.facts);
    const [inputValue, setInputValue] = useState('');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const dispatch = useDispatch();

    const handleAddOrUpdate = () => {
        if (!inputValue.trim()) return;

        if (editingIndex !== null) {
            const updated = [...facts];
            updated[editingIndex] = inputValue;
            dispatch(setFacts(updated));
            setEditingIndex(null);
        } else {
            dispatch(setFacts([...facts, inputValue]));
        }

        setInputValue('');
    };

    const handleEdit = (index: number) => {
        setInputValue(facts[index]);
        setEditingIndex(index);
    };

    const handleDelete = (index: number) => {
        const updated = [...facts];
        updated.splice(index, 1);
        dispatch(setFacts(updated));
        setEditingIndex(null);
        setInputValue('');
    };

    return (
        <Container className="mt-4">
            <h3>Add a Fact</h3>

            <Form className="my-3">
                <Row>
                    <Col xs={9}>
                        <Form.Control
                            type="text"
                            placeholder="Enter a fact..."
                            onBlur={(e) => setInputValue(e.target.value)}
                        />
                    </Col>
                    <Col xs={3}>
                        <Button variant="primary" onClick={handleAddOrUpdate} className="w-100">
                            {editingIndex !== null ? 'Update' : 'Add'}
                        </Button>
                    </Col>
                </Row>
            </Form>

            <ListGroup className="mb-3">
                {facts.map((fact, index) => (
                    <ListGroup.Item key={fact + '-' + index} className="d-flex justify-content-between align-items-center">
                        <span>{fact}</span>
                        <div>
                            <Button
                                size="sm"
                                variant="outline-secondary"
                                className="me-2"
                                onClick={() => handleEdit(index)}
                            >
                                Edit
                            </Button>
                            <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => handleDelete(index)}
                            >
                                Delete
                            </Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default React.memo(FactEditor);

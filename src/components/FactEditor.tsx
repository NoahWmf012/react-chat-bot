import React, { useState } from 'react';
import { Button, Form, ListGroup, Container, Row, Col, Alert } from 'react-bootstrap';

interface FactEditorProps {
    onSave: (facts: string[]) => void;
}

const FactEditor: React.FC<FactEditorProps> = ({ onSave }) => {
    const [facts, setFacts] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [showSavedAlert, setShowSavedAlert] = useState(false);

    const handleAddOrUpdate = () => {
        if (!inputValue.trim()) return;

        if (editingIndex !== null) {
            const updated = [...facts];
            updated[editingIndex] = inputValue;
            setFacts(updated);
            setEditingIndex(null);
        } else {
            setFacts([...facts, inputValue]);
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
        setFacts(updated);
        setEditingIndex(null);
        setInputValue('');
    };

    const handleSave = () => {
        onSave(facts);
        setShowSavedAlert(true);
        setTimeout(() => setShowSavedAlert(false), 2000);
    };

    return (
        <Container className="mt-4">
            <h3>Fact Editor</h3>

            <Form className="my-3">
                <Row>
                    <Col xs={9}>
                        <Form.Control
                            type="text"
                            placeholder="Enter a fact..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
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

            <Button variant="success" onClick={handleSave}>
                Save Facts
            </Button>

            {showSavedAlert && <Alert variant="success" className="mt-3">Facts saved!</Alert>}
        </Container>
    );
};

export default FactEditor;

import { useState } from 'react';
import { Button, Offcanvas, Form, InputGroup, Spinner } from 'react-bootstrap';
import { getChatbotResponse } from './utils/getChatbotResponse';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface MessageType {
    from: 'user' | 'bot';
    text: string;
}

const ChatWidget = () => {
    const facts = useSelector((state: RootState) => state.facts);

    const [show, setShow] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [loading, setLoading] = useState(false);

    const toggleChat = () => setShow(!show);

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMsg: MessageType = { from: 'user', text: input };
        setMessages([...messages, userMsg]);
        setInput('');
        setLoading(true);

        const botReply = await getChatbotResponse(facts, input);
        setMessages((prev) => [...prev, { from: 'bot', text: botReply }]);
        setLoading(false);
    };

    return (
        <>
            <Button
                variant="primary"
                onClick={toggleChat}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    zIndex: 9999
                }}
            >
                💬
            </Button>

            <Offcanvas show={show} onHide={toggleChat} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Fact Chatbot</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div style={{ maxHeight: '60vh', overflowY: 'auto', marginBottom: '1rem' }}>
                        {messages.map((msg, i) => (
                            <div key={'-' + i} className={`mb-2 ${msg.from === 'user' ? 'text-end' : 'text-start'}`}>
                                <strong>{msg.from === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
                            </div>
                        ))}
                        {loading && <Spinner animation="border" size="sm" />}
                    </div>

                    <InputGroup>
                        <Form.Control
                            placeholder="Ask a question..."
                            onBlur={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <Button onClick={handleSend}>Send</Button>
                    </InputGroup>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default ChatWidget;
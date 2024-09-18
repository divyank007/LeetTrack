import { useState, useEffect } from 'react';
import axios from 'axios';

function QuestionsPage() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/user/questions', { withCredentials: true });
                setQuestions(response.data.questions);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    return (
        <div>
            <h1>Your Saved Questions</h1>
            <ul>
                {questions.map((question, index) => (
                    <li key={index}>{question}</li>
                ))}
            </ul>
        </div>
    );
}

export default QuestionsPage;

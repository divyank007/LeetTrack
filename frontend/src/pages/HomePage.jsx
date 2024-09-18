import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <h1>Welcome to LeetTrack</h1>
            <nav>
                <Link to="/questions">View Saved Questions</Link>
            </nav>
        </div>
    );
}

export default HomePage;

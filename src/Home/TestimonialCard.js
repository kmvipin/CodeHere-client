import './TestimonialCard.css';

const TestimonialCard = ({ user }) => {
    return (
      <div className="testimonial-card">
        <img src={user.image} alt={`User ${user.name}`} />
        <p>{user.feedback}</p>
        <p>- {user.name}</p>
      </div>
    );
};

export default TestimonialCard;
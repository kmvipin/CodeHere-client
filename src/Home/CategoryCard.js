import Card from 'react-bootstrap/Card';
import './CategoryCard.css';

function CategoryCard(category) {
  return (
    <div>
      <Card style={{ backgroundColor: category.color }} className={`text-white custom-card`}>
        <Card.Title className={`custom-title`}>{category.name}</Card.Title>
        <Card.Text className={`custom-description`}>
          {category.description}
        </Card.Text>
      </Card>
    </div>
  );
}

export default CategoryCard;
import {Card} from "@mui/material";
import {CardHeader, NavItem} from "react-bootstrap";
import {CardTitle} from "react-bootstrap";
import {CardContent} from "@mui/material";
import {CardFooter} from "react-bootstrap";

function CategoryCard(props) {
  const {navigateToList,name,description,quantity} = props;
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-col p-4">
          <CardTitle className="text-2xl">{name}</CardTitle>
          <div>{description}</div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-4xl font-bold">{quantity}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Questions
          </div>
        </CardContent>
        <CardFooter className="p-4">
          <a
            className="w-full inline-flex items-center justify-center 
            rounded-md border border-gray-200 bg-white h-10 
            px-4 text-sm font-medium shadow-sm transition-colors 
            hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-non
            e focus-visible:ring-1 focus-visible:ring-gray-950 dark:border-gray-800
             dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 
             dark:focus-visible:ring-gray-300 cursor-pointer"
            onClick={()=>{navigateToList(name)}}
          >
            Explore
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CategoryCard;

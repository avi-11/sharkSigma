import NotAccessiblePage from "../components/ErrorPages/NotAccessiblePage/NotAccessiblePage";
import { Route } from "react-router-dom";

function ErrorPages() {
  return (
    <div>
      <Route path="/error/notAccessable">
        <NotAccessiblePage />
      </Route>
    </div>
  );
}

export default ErrorPages;

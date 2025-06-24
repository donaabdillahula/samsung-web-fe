import "aos/dist/aos.css";

import { AppRouter } from "./navigation/AppRouter";

const App = () => {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <AppRouter />
    </div>
  );
};

export default App;

import {Routes, Route} from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./pages/home/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import './index.css';
import Task from "./pages/task/Task.jsx";


function App() {

    return (
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          {/*<Route path='internet/' element={<PageHeader CategoryRate='Домашний интернет' />} />*/}
            <Route path='task/:task_id/' element={<Task/>} />
          <Route path='*' element={<NotFound/>} />
        </Route>
      </Routes>
    )
}

export default App;

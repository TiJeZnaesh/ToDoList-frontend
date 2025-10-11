import React, {useState, useEffect} from 'react'; //импортируем реакт и хуки для управления состоянием и побочными эффектами
import axios from 'axios';

//объявляем компонент TaskList
const TaskList = () =>{
    //создадим состояние tasks и функцию setTasks для его обновления
    const [tasks, setTasks] = useState([]);
    //создадим состояние лоэдинг для отслеживания процесса загрузки данных
    const [loading, setLoading] = useState(true);
    //создадим состояние error для хранения информации об ошибках
    const [error, setError] = useState(null)

    //используем хук useEffect для загрузки данных при монтировании компонента
    useEffect(()=>{
        //отправим get запрос на эндпоинт для получения списка задач
        axios.get('http://127.0.0.1:8000/api/task/')
        .then(response =>{
            //в случае успешного ответа обновляем состояние tasks с полученными данными
            setTasks(response.data);
            //устанавливаем loading в False так как данные загружены
            setLoading(false);
        })
        .catch(error=>{
            //в случае ошибки сохраняем информацию об ошибке в состоянии error
            setError(error.message);
            //устанавливаем loading в false так как попытка загрузки завершена
            setLoading(false);
            console.error("ошибка при загрузке задачи", error);

        })
    },[]); //пустой массив зависимостей означает, что эффект выполнится только один раз
    if (loading){
        return <div>Загрузка...</div>;
    }
    if (error){
        return <div>Ошибка:{error}</div>;
    }
    //возвращаем jsx разметку для отображения списка задач
    return(
        <div>
            <h1>Список задач</h1>
            {tasks.length===0 ? (
                <p>Нет задач</p>
            ):(
                //если задачи есть, то рендерим их в виде списка
                <ul>
                    {tasks.map(task=>(
                        <li key={task.id}>
                            <h3>{task.title}</h3>
                            {task.description && <p>{task.description}</p> }
                        </li>
                    ))}
                </ul>
            )} {/*тернарный оператор в js*/}
        </div>
    );
};
//экспортируем компонент taskList для использования в других частях приложения
export default TaskList;
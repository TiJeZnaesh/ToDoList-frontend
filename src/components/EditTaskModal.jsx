const EditTaskModal = ({ task, visible, onCancel, onUpdate }) => {
    const [form] = Form.useForm();
    //два состояния для хранения списка проектов и состояния загрузки
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    //состояние для хранения списка тегов
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (visible){
            axios.get('http://127.0.0.1:8000/api/projects/') //гет запрос к апи проектов
            .then(response => {
                setProjects(response.data) //сохраняем проекты в состоянии
            })
            .catch(error => {
                console.error("Ошибка при загрузке проектов", error);
                message.error("Не удалось загрузить проекты");
            });
        axios.get('http://127.0.0.1:8000/api/tags/') //гет запрос к апи проектов
            .then(response => {
                setTags(response.data) //сохраняем проекты в состоянии
            })
            .catch(error => {
                console.error("Ошибка при загрузке тегов", error);
                message.error("Не удалось загрузить теги");
            });
        }
        
    }, [visible]);
//заполнить форму данными задачи при открытии остановились
}
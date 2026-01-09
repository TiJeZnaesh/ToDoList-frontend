//новый компонент для отображения проектов
const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/projects/') //гет запрос к апи проектов
            .then(response => {
                setProjects(response.data) //сохраняем проекты в состоянии
            })
            .catch(error => {
                console.error("Ошибка при загрузке проектов", error);
                message.error("Не удалось загрузить проекты");
            });
    }, []);
    return (
        <Card title={<Title level={3}>
            Проекты
        </Title>} bordered={false} style={{ margin: "20px" }}>
            <List
                itemLayout="horizontal"
                dataSource={projects}
                locale={{ emptyText: "Пока нет проектов. Создайте первый!" }}
                //остановились на renderItem 
        </Card>
    )
}
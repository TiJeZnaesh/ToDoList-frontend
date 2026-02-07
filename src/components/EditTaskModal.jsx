import { Form, Input, Modal } from "antd";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";

const EditTaskModal = ({ task, visible, onCancel, onUpdate }) => {
    const [form] = Form.useForm();
    //два состояния для хранения списка проектов и состояния загрузки
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    //состояние для хранения списка тегов
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (visible) {
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
    //заполнить форму данными задачи при открытия
    useEffect(() => {
        if (task && visible) {
            form.setFieldsValue({
                title: task.title,
                description: task.description,
                due_date: task.due_date,
                project: task.project.id,
                tags: task.tags?.map(tag => tag.id) || [],
                is_completed: task.is_completed
            });
        }
    }, [task, visible, form]);
    //функция сохранения изменений
    const handleSave = (values) => {
        setLoading(true);

        const updateTask = {
            ...values,
            due_date: values.due_date.format("YYYY-MM-DD HH:mm:ss"),
            tags: values.tags || []
        };

        axios.put(`http://127.0.0.1:8000/api/tasks/${task.id}/`, updateTask)
            .then(response => {
                onUpdate(response.data);
            })
            .catch(error => {
                console.error("Ошибка при обновлении задачи", error);
                message.error("Не удалось обновить задачу");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Modal
            title="Редактировать задачу"
            open={visible}
            onCancel={onCancel}
            width={700}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}>
                <Form.Item
                    label="Название задачи"
                    name="title"
                    rules={[{ required: true, message: "Введите название задачи" }]}
                >
                    <Input placeholder="Название задачи"></Input> //продолжить писать элемент дискрипшен
                </Form.Item>
            </Form>
        </Modal>
    )
}
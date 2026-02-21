import { useState } from "react"

const CreateProjectForm = ({ visible, onCancel, onProjectCreated }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    //функция отправки формы
    const onFinish = (values) => {
        setLoading(true);

        //формируем данные для отправки
        const projectData = {
            name: values.name,
            description: values.description || '',
        }

        //отправляем пост запрос для создания проекта - продолжить
    }
}
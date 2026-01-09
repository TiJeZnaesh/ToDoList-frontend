import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DatePicker, Form, Input, Button, Select, message } from "antd";
const { TextArea } = Input;

const CreateTaskForm = ({ onTaskCreated }) => {
    //хук для управления формой антдизайна
    const [form] = Form.useForm();
    //два состояния для хранения списка проектов и состояния загрузки
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    //загружаем список проектов при монтировании компонента
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/projects/') //гет запрос к апи проектов
            .then(response => {
                setProjects(response.data) //сохраняем проекты в состоянии
            })
            .catch(error => {
                console.error("Ошибка при загрузке проектов", error);
                message.error("Не удалось загрузить проекты");
            });
    }, []); //пустой массив зависимостей - выполняется только при монтировании компонента

    //функция отправки формы
    const onFinish = (values) => {
        //включаем индикатор загрузки
        setLoading(true)
        //формируем данные для отправки
        const taskData = {
            title: values.title,
            description: values.description,
            due_date: values.due_date.format('YYYY-MM-DD HH:mm:ss'),
            project: values.project,
            is_completed: false,
        };
        //отправляем пост запрос для создания задачи
        axios.post('http://127.0.0.1:8000/api/tasks/', taskData)
            .then(response => {
                message.success('Задача успешно создана!');
                //очищаем форму
                form.resetFields();
                //вызываем колбек для обновления списка
                if (onTaskCreated) {
                    onTaskCreated(response.data)
                }
            })
            .catch(error => {
                console.error("Ошибка при загрузке задач", error);
                message.error("Не удалось загрузить задачи");
            })
            //выключаем индикатор загрузки
            .finally(() => {
                setLoading(false)
            });
    };
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: 600, margin: '20px auto' }}
        >
            {/* поле для названия задачи*/}
            <Form.Item
                label="Название задачи"
                name="title"
                rules={[{ required: true, message: 'Введите название задачи' }]}
            >
                <Input placeholder="Например: подготовить отчет" />
            </Form.Item>
            {/* поле для описания задачи*/}
            <Form.Item
                label="Описание задачи"
                name="description"
            >
                <TextArea rows={4} placeholder="Детали задачи не обязательно" />
            </Form.Item>
            {/*поле для выбора даты выполнения*/}
            <Form.Item
                label="Дата выполнения"
                name="due_date"
                rules={[{ required: true, message: 'Выберите дату выполнения' }]}
            >
                {/*используем дейт пикер для выбора даты*/}
                <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    style={{ width: "100%" }}
                    placeholder="Выберите дату и время"
                />
            </Form.Item>
            {/*поле для выбора проекта*/}
            <Form.Item
                label="Проект"
                name="project"
                rules={[{ required: true, message: 'Выберите проект' }]}
            >
                <Select placeholder="Выберите проект">
                    {/*генерируем опции для каждого проекта (начинаем мапить(сопоставляем))*/}
                    {projects.map(project => (
                        <Option key={project.id} value={project.id}>
                            {project.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            {/*кнопка отправки формы*/}
            <Form.Item>
                <Button htmlType="submit" loading={loading}>
                    Создать задачу
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateTaskForm;
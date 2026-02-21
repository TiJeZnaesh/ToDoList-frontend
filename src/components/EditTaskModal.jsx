import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DatePicker, Form, Input, Button, Select, message, Modal } from "antd";
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;

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
            const dueDate = task.due_date ? moment(task.due_date) : null;
            form.setFieldsValue({
                title: task.title,
                description: task.description,
                due_date: dueDate,
                project: task.project.id,
                tags: task.tags?.map(tag => tag.id) || [],
                is_completed: task.is_completed
            });
        }
    }, [task, visible, form]);
    //функция сохранения изменений
    const handleSave = (values) => {
        setLoading(true);

        const updatedTask = {
            ...values,
            due_date: values.due_date.format("YYYY-MM-DD HH:mm:ss"),
            tags: values.tags || []
        };

        axios.put(`http://127.0.0.1:8000/api/tasks/${task.id}/`, updatedTask)
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
            footer={null}
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
                    <Input placeholder="Название задачи">
                    </Input>
                </Form.Item>
                <Form.Item
                    label="Описание"
                    name="description"
                >
                    <TextArea rows={3} placeholder="Описание задачи"></TextArea>
                </Form.Item>
                <Form.Item
                    label="Срок выполнения"
                    name="due_date"
                    rules={[{ required: true, message: "Введите срок выполнения задачи" }]}
                >
                    <DatePicker
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                    >
                    </DatePicker>
                </Form.Item>
                <Form.Item
                    label="Проект"
                    name="project"
                    rules={[{ required: true, message: "Введите название проекта" }]}
                >
                    <Select
                        placeholder="Выберите проект"
                    >
                        {projects.map(project => (
                            <Option key={project.id} value={project.id}>
                                {project.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Теги"
                    name="tags"
                >
                    <Select
                        placeholder="Выберите тег"
                        mode="multiple"
                    >
                        {tags.map(tag => (
                            <Option key={tag.id} value={tag.id}>
                                {tag.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Статус"
                    name="is_completed"
                >
                    <Select
                        placeholder="Статус задачи"
                    >
                        <Option value={false}>В работе</Option>
                        <Option value={true}>Выполнена</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button onClick={onCancel}>Отмена</Button>
                    <Button htmlType="submit" loading={loading}>Сохранить изменения</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default EditTaskModal;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, List, Typography, Spin, Alert } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingTask, setEditinTask] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/tasks/')
            .then(response => {
                setTasks(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
                console.error("Ошибка при загрузке задач", error);
            });
    }, []);

    // Функция открытия модального окна редактирования
    const handleEditClick = (task) => {
        setEditingTask(task);
        setModalVisible(true);
    };

    // 1. Обработка состояния загрузки
    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" tip="Загрузка задач..." />
            </div>
        );
    }

    // 2. Обработка ошибок
    if (error) {
        return (
            <Alert
                message="Произошла ошибка"
                description={`Не удалось загрузить задачи: ${error}`}
                type="error"
                showIcon
                style={{ margin: '20px' }}
            />
        );
    }

    // 3. Основной интерфейс с задачами
    return (
        <Card title={<Title level={2}>📋 Список задач</Title>} bordered={false} style={{ margin: '20px' }}>
            <List
                itemLayout="horizontal"
                dataSource={tasks}
                locale={{ emptyText: 'Пока нет задач. Создайте первую!' }}
                renderItem={(task) => (
                    <List.Item
                        actions={[
                            task.is_completed ?
                                <span style={{ color: '#52c41a' }}><CheckCircleOutlined /> Выполнена</span> :
                                <span><ClockCircleOutlined /> В работе</span>
                            // остановились - добавить кнопку редактирвоания
                        ]}
                    >
                        <List.Item.Meta
                            title={task.title}
                            description={task.description || 'Описание отсутствует'}
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default TaskList;
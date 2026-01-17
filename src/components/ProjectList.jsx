import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, List, Typography, Spin, Alert } from 'antd';

const { Title, Text } = Typography;

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
                renderItem={(project)=>(
                    <List.Item>
                        <List.Item.Meta
                            title= {project.name}
                            description={
                                <>
                                    <Text type="secondary">
                                        {project.description || "Без описания"}
                                    </Text>
                                    <Text type="secondary" style={{fontSize: "12px"}}>
                                        Создан: {new Date(project.created_at).toLocaleDateString()}
                                    </Text>
                                </>
                            }
                        >
                        </List.Item.Meta>
                    </List.Item>
                )}
            />
        </Card>
    )
};
export default ProjectList;
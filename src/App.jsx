import TaskList from './components/TaskList';
import ProjectList from './components/ProjectList'
import CreateTaskForm from './components/CreateTaskForm';
import EditTaskModal from './components/EditTaskModal';
import { Layout, Row, Col } from 'antd';

const { Content } = Layout;

function App() {
  //функция для обработки создания новой задачи
  const handleTaskCreated = (newTask) => {
    //в будущем дописать логику обновления списка задач
    console.log('Новая задача создана:', newTask);
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '20px' }}>
        {/*используем сетку антд для расположения компонентов*/}
        <Row gutter={[20, 20]}>
          <Col xs={24} md={12}>
            <CreateTaskForm onTaskCreated={handleTaskCreated} />
          </Col>
          <Col xs={24}>
            <TaskList />
          </Col>
          <Col xs={24} md={12}>
            <ProjectList />
          </Col>
          <Col xs={24}>
            <EditTaskModal />
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

export default App;
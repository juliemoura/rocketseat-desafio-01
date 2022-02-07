import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Adicionar uma nova task
  function handleCreateNewTask() {
    // se o newTaskTitle estiver vazio, a tarefa nao sera adicionada, entao so damos um return
    if(!newTaskTitle) return;

    const newTask = {
      id: Math.random(), // para gerar um id aleatorio
      title: newTaskTitle, // adicionando o novo titulo ao state newTaskTitle
      isComplete: false // comeca como false pq nao queremos adicionar uma tarefa que ja esteja completa, ou seja true.
    }
    // aqui eu falo que o state setTasks vai receber os valores antigos que e o ...oldState, e tbm vai receber os novos valores que e o newTask
    setTasks(oldState => [...oldState, newTask])
    // aqui estamos resetando o setNewTaskTitle para que nao precise apagar o valor que foi digitado
    setNewTaskTitle('');
  }
  
  // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
  function handleToggleTaskCompletion(id: number) {
    const newTasks = tasks.map(task => task.id == id ? {
      ...task,
      isComplete: !task.isComplete
    })
  }

  // Remove uma task pela listagem da id
  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter(task => task.id !== id); // estamos filtrando todos os arrays para pegar as tasks pelos ids
    setTasks(filteredTasks); // passo para o estado setTasks a const feita acima
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}
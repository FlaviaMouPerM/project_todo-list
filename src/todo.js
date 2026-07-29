// GLOBAL STATE - LOCAL STORAGE
const STORAGE_KEY = 'my-todo-list';

const load = (key = STORAGE_KEY) => {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : { projects: [] };
};

const save = (key = STORAGE_KEY) => {
  const current = load();

  localStorage.setItem(key, JSON.stringify(todos));
};

let todos = load();
let selectedProject = todos.projects[0] ?? null;

// INTERNAL STATE - PROJECTS
  const adjustName = (name) => {
    return Object.keys(todos.projects).find(name => name) ? `${name}[0]` : name;
  };

const createProject = (name, color) => {
  const finalName = adjustName(name);
  const id = crypto.randomUUID();

  todos.projects.push({ id, name, color, todos: [] });
  selectedProject = todos.projects.at(-1);

  save();

  return selectedProject;
};

const renameProject = (currentName, newName) => {
  if (currentName === newName) return;

  const finalName = adjustName(newName);
  const currentProject = todos.projects.find((proj) => proj.name === currentName);

  Object.assign(currentProject, { name: newName });

  save();

  return currentProject;
};

const selectProject = (name) => {
  selectedProject = todos.projects.find((proj) => proj.name === name);
};

const getProjects = () => todos.projects;

// INTERNAL STATE - TODOS

const createTodo = (text) => {
  if (!selectedProject) return;

  selectedProject?.todos.push(text);

  save();

  return selectedProject?.todos.at(-1);
};

const removeTodo = (index) => {
  selectedProject?.todos.splice(index, 1);

  save();

  return selectedProject.todos;
};

const updateTodo = (index, newText) => {
  const todo = selectedProject?.todos[index];
  if (!todo) return;

  todo = newText;

  save();

  return todo;
};

const getTodos = () => selectedProject.todos;

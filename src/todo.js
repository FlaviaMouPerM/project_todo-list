// GLOBAL STATE - LOCAL STORAGE
const STORAGE_KEY = "my-todo-list";

const load = (key = STORAGE_KEY) => {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : { projects: [] };
};

const save = (key = STORAGE_KEY) => {
  localStorage.setItem(key, JSON.stringify(todos));
};

let todos = load();
let selectedProject = todos.projects[0] ?? null;

// INTERNAL STATE - PROJECTS
const adjustName = (name) => {
  return todos.projects.find((project) => project.name === name)
    ? `${name}[0]`
    : name;
};

export const createProject = (name, color) => {
  const finalName = adjustName(name);
  const id = crypto.randomUUID();

  todos.projects.push({ id, name: finalName, color, todos: [] });
  selectedProject = todos.projects.at(-1);

  save();

  return selectedProject;
};

export const removeProject = (id) => {
  const index = todos.projects.findIndex((project) => project.id === id);
  console.log(index);
  if (index < 0) return;

  const isSelected = todos.projects[index].id === selectedProject.id;
  if (isSelected)
    selectedProject =
      todos.projects[index - 1] ?? todos.projects[index + 1] ?? null;

  todos.projects.splice(index, 1);
  console.log(index, todos.projects);

  save();

  return selectedProject;
};

export const renameProject = (currentName, newName) => {
  if (currentName === newName) return;

  const finalName = adjustName(newName);
  const currentProject = todos.projects.find(
    (proj) => proj.name === currentName,
  );

  Object.assign(currentProject, { name: newName });

  save();

  return currentProject;
};

export const selectProject = (name) => {
  selectedProject = todos.projects.find((proj) => proj.name === name);
};

export const getSelectedProject = () => selectedProject;

export const getProjects = () => todos.projects;

// INTERNAL STATE - TODOS

export const createTodo = (todo) => {
  const id = crypto.randomUUID();
  const isFirstProject = todos.projects.length === 0;

  if (!selectedProject && !isFirstProject) return;

  if (isFirstProject) {
    const newProject = createProject("Default");
    selectedProject = newProject;
  }

  selectedProject?.todos.push({ ...todo, id });

  save();

  return selectedProject?.todos.at(-1);
};

export const removeTodo = (id) => {
  const index = selectedProject?.todos.findIndex((todo) => todo.id === id);
  selectedProject.todos.splice(index, 1);

  save();

  return selectedProject.todos;
};

export const updateTodo = (id, values) => {
  let todo = selectedProject?.todos.find((todo) => todo.id === id);
  if (!todo) return;
  // ensure id can't be changed
  todo = { ...todo, ...values, id };

  save();

  return todo;
};

export const getTodos = () => selectedProject.todos;

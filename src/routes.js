import { Router } from 'express';

const routes = new Router();

const projects = [];

function checkProjectExits(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if(!project) {
    return res.status(400).json({ error: "Project not found"})
  }

  return next();
}

function logRequests(req, res, next) {
  console.count("Número de requisições");

  return next();
}

routes.use(logRequests);

routes.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id, 
    title,
    tasks: []
  }

  projects.push(project);

  return res.json(projects);

});

routes.get('/projects', (req, res) => {
  return res.json(projects);
});

routes.put('/projects/:id', checkProjectExits, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project)
});

routes.delete('/projects/:id', checkProjectExits, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex);

  return res.json({ error: "project deleted"});
});

routes.post('/projects/:id/tasks', checkProjectExits, (req, res) => {
  const { id } = req.params;
  const { title } = req.body; 

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});

export default routes;
import { getProjects, type Project } from '@/lib/data';
import { createProject, updateProject, deleteProject } from '../../actions';

export const dynamic = 'force-dynamic';

function ProjectFields({ p }: { p?: Project }) {
  return (
    <div className="admin-grid">
      <div className="admin-field">
        <label>Title</label>
        <input className="admin-input" name="title" defaultValue={p?.title} required />
      </div>
      <div className="admin-field">
        <label>Image path (e.g. /motolens.png)</label>
        <input className="admin-input" name="image" defaultValue={p?.image} required />
      </div>
      <div className="admin-field">
        <label>Description (EN)</label>
        <textarea className="admin-textarea" name="descEn" defaultValue={p?.descEn} />
      </div>
      <div className="admin-field">
        <label>Description (FR)</label>
        <textarea className="admin-textarea" name="descFr" defaultValue={p?.descFr} />
      </div>
      <div className="admin-field">
        <label>Tags (comma-separated)</label>
        <input className="admin-input" name="tags" defaultValue={p?.tags.join(', ')} />
      </div>
      <div className="admin-field">
        <label>Live URL</label>
        <input className="admin-input" name="liveUrl" defaultValue={p?.liveUrl ?? ''} />
      </div>
      <div className="admin-field">
        <label>Status</label>
        <select className="admin-select" name="status" defaultValue={p?.status ?? 'in-process'}>
          <option value="in-process">In Process</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="admin-field">
        <label>Accent color</label>
        <input className="admin-input" name="accent" type="text" defaultValue={p?.accent ?? '#4aa8cc'} />
      </div>
      <div className="admin-field">
        <label>Sort order</label>
        <input className="admin-input" name="sortOrder" type="number" defaultValue={p?.sortOrder ?? 0} />
      </div>
    </div>
  );
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <h1 className="admin-h1">Projects</h1>
      <p className="admin-sub">These appear in the “Selected Work” section.</p>

      {projects.map((p) => (
        <div key={p.id} className="admin-card">
          <h3>{p.title}</h3>
          <form action={updateProject.bind(null, p.id)}>
            <ProjectFields p={p} />
            <div className="admin-actions">
              <button className="admin-btn" type="submit">Save</button>
            </div>
          </form>
          <form action={deleteProject.bind(null, p.id)} style={{ marginTop: '0.5rem' }}>
            <button className="admin-btn danger" type="submit">Delete project</button>
          </form>
        </div>
      ))}

      <div className="admin-card" style={{ borderStyle: 'dashed' }}>
        <h3>+ Add new project</h3>
        <form action={createProject}>
          <ProjectFields />
          <div className="admin-actions">
            <button className="admin-btn" type="submit">Create project</button>
          </div>
        </form>
      </div>
    </>
  );
}

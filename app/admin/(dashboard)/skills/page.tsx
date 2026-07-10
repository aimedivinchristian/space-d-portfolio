import { getSkills, type Skill } from '@/lib/data';
import { Icon, ICON_KEYS } from '@/lib/icons';
import { createSkill, updateSkill, deleteSkill } from '../../actions';

export const dynamic = 'force-dynamic';

function SkillFields({ s }: { s?: Skill }) {
  return (
    <div className="admin-grid">
      <div className="admin-field">
        <label>Name</label>
        <input className="admin-input" name="name" defaultValue={s?.name} required />
      </div>
      <div className="admin-field">
        <label>Level</label>
        <input className="admin-input" name="level" defaultValue={s?.level ?? 'Intermediate'} />
      </div>
      <div className="admin-field">
        <label>Icon</label>
        <select className="admin-select" name="iconKey" defaultValue={s?.iconKey ?? 'code'}>
          {ICON_KEYS.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
      </div>
      <div className="admin-field">
        <label>Sort order</label>
        <input className="admin-input" name="sortOrder" type="number" defaultValue={s?.sortOrder ?? 0} />
      </div>
    </div>
  );
}

export default async function SkillsPage() {
  const skills = await getSkills();

  return (
    <>
      <h1 className="admin-h1">Skills</h1>
      <p className="admin-sub">Shown in the “Skills &amp; Tools” grid. Pick an icon key from the built-in set.</p>

      {skills.map((s) => (
        <div key={s.id} className="admin-card">
          <h3 className="admin-icon-preview"><Icon name={s.iconKey} size={22} /> {s.name}</h3>
          <form action={updateSkill.bind(null, s.id)}>
            <SkillFields s={s} />
            <div className="admin-actions">
              <button className="admin-btn" type="submit">Save</button>
            </div>
          </form>
          <form action={deleteSkill.bind(null, s.id)} style={{ marginTop: '0.5rem' }}>
            <button className="admin-btn danger" type="submit">Delete</button>
          </form>
        </div>
      ))}

      <div className="admin-card" style={{ borderStyle: 'dashed' }}>
        <h3>+ Add new skill</h3>
        <form action={createSkill}>
          <SkillFields />
          <div className="admin-actions">
            <button className="admin-btn" type="submit">Create skill</button>
          </div>
        </form>
      </div>

      <div className="admin-card">
        <h3>Available icon keys</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {ICON_KEYS.map((k) => (
            <div key={k} className="admin-icon-preview" style={{ flexDirection: 'column', fontSize: '0.72rem', color: 'var(--text3)', width: 64, textAlign: 'center' }}>
              <Icon name={k} size={26} />
              {k}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

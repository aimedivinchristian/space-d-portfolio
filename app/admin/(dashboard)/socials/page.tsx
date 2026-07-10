import { getSocials, type Social } from '@/lib/data';
import { Icon, ICON_KEYS } from '@/lib/icons';
import { createSocial, updateSocial, deleteSocial } from '../../actions';

export const dynamic = 'force-dynamic';

function SocialFields({ s }: { s?: Social }) {
  return (
    <div className="admin-grid">
      <div className="admin-field">
        <label>Label</label>
        <input className="admin-input" name="label" defaultValue={s?.label} required />
      </div>
      <div className="admin-field">
        <label>URL</label>
        <input className="admin-input" name="href" defaultValue={s?.href} required />
      </div>
      <div className="admin-field">
        <label>Icon</label>
        <select className="admin-select" name="iconKey" defaultValue={s?.iconKey ?? 'github'}>
          {ICON_KEYS.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
      </div>
      <div className="admin-field">
        <label>Sort order</label>
        <input className="admin-input" name="sortOrder" type="number" defaultValue={s?.sortOrder ?? 0} />
      </div>
      <div className="admin-field">
        <label>Text color</label>
        <input className="admin-input" name="color" defaultValue={s?.color ?? '#fff'} />
      </div>
      <div className="admin-field">
        <label>Background (color or CSS gradient)</label>
        <input className="admin-input" name="bg" defaultValue={s?.bg ?? 'transparent'} />
      </div>
      <div className="admin-field">
        <label>Border color</label>
        <input className="admin-input" name="border" defaultValue={s?.border ?? 'transparent'} />
      </div>
    </div>
  );
}

export default async function SocialsPage() {
  const socials = await getSocials();

  return (
    <>
      <h1 className="admin-h1">Social Links</h1>
      <p className="admin-sub">Shown in the hero and contact sections.</p>

      {socials.map((s) => (
        <div key={s.id} className="admin-card">
          <h3 className="admin-icon-preview">
            <span
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 34, height: 34, borderRadius: 8,
                background: s.bg, color: s.color, border: `1px solid ${s.border}`,
              }}
            >
              <Icon name={s.iconKey} size={18} />
            </span>
            {s.label}
          </h3>
          <form action={updateSocial.bind(null, s.id)}>
            <SocialFields s={s} />
            <div className="admin-actions">
              <button className="admin-btn" type="submit">Save</button>
            </div>
          </form>
          <form action={deleteSocial.bind(null, s.id)} style={{ marginTop: '0.5rem' }}>
            <button className="admin-btn danger" type="submit">Delete</button>
          </form>
        </div>
      ))}

      <div className="admin-card" style={{ borderStyle: 'dashed' }}>
        <h3>+ Add new social link</h3>
        <form action={createSocial}>
          <SocialFields />
          <div className="admin-actions">
            <button className="admin-btn" type="submit">Create link</button>
          </div>
        </form>
      </div>
    </>
  );
}

import { getProfile } from '@/lib/data';
import { updateProfile } from '../../actions';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const p = await getProfile();

  return (
    <>
      <h1 className="admin-h1">Profile &amp; About</h1>
      <p className="admin-sub">Hero, about section, and contact details. Fields come in English / French pairs.</p>

      <form action={updateProfile}>
        <div className="admin-card">
          <h3>Hero</h3>
          <div className="admin-grid">
            <div className="admin-field full">
              <label>Name</label>
              <input className="admin-input" name="heroName" defaultValue={p.heroName} />
            </div>
            <div className="admin-field">
              <label>Tagline (EN)</label>
              <input className="admin-input" name="heroTaglineEn" defaultValue={p.heroTaglineEn} />
            </div>
            <div className="admin-field">
              <label>Tagline (FR)</label>
              <input className="admin-input" name="heroTaglineFr" defaultValue={p.heroTaglineFr} />
            </div>
            <div className="admin-field">
              <label>Subtitle (EN)</label>
              <textarea className="admin-textarea" name="heroSubEn" defaultValue={p.heroSubEn} />
            </div>
            <div className="admin-field">
              <label>Subtitle (FR)</label>
              <textarea className="admin-textarea" name="heroSubFr" defaultValue={p.heroSubFr} />
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h3>About</h3>
          <div className="admin-grid">
            <div className="admin-field">
              <label>Section title (EN)</label>
              <input className="admin-input" name="aboutTitleEn" defaultValue={p.aboutTitleEn} />
            </div>
            <div className="admin-field">
              <label>Section title (FR)</label>
              <input className="admin-input" name="aboutTitleFr" defaultValue={p.aboutTitleFr} />
            </div>
            <div className="admin-field">
              <label>Paragraph 1 (EN)</label>
              <textarea className="admin-textarea" name="aboutP1En" defaultValue={p.aboutP1En} />
            </div>
            <div className="admin-field">
              <label>Paragraph 1 (FR)</label>
              <textarea className="admin-textarea" name="aboutP1Fr" defaultValue={p.aboutP1Fr} />
            </div>
            <div className="admin-field">
              <label>Paragraph 2 (EN)</label>
              <textarea className="admin-textarea" name="aboutP2En" defaultValue={p.aboutP2En} />
            </div>
            <div className="admin-field">
              <label>Paragraph 2 (FR)</label>
              <textarea className="admin-textarea" name="aboutP2Fr" defaultValue={p.aboutP2Fr} />
            </div>
            <div className="admin-field">
              <label>Paragraph 3 (EN)</label>
              <textarea className="admin-textarea" name="aboutP3En" defaultValue={p.aboutP3En} />
            </div>
            <div className="admin-field">
              <label>Paragraph 3 (FR)</label>
              <textarea className="admin-textarea" name="aboutP3Fr" defaultValue={p.aboutP3Fr} />
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h3>Contact details</h3>
          <div className="admin-grid">
            <div className="admin-field">
              <label>Phone</label>
              <input className="admin-input" name="phone" defaultValue={p.phone} />
            </div>
            <div className="admin-field">
              <label>Email</label>
              <input className="admin-input" name="email" defaultValue={p.email} />
            </div>
            <div className="admin-field">
              <label>Location</label>
              <input className="admin-input" name="location" defaultValue={p.location} />
            </div>
            <div className="admin-field">
              <label>Contact heading name</label>
              <input className="admin-input" name="contactName" defaultValue={p.contactName} />
            </div>
            <div className="admin-field">
              <label>Contact blurb (EN)</label>
              <textarea className="admin-textarea" name="contactBlurbEn" defaultValue={p.contactBlurbEn} />
            </div>
            <div className="admin-field">
              <label>Contact blurb (FR)</label>
              <textarea className="admin-textarea" name="contactBlurbFr" defaultValue={p.contactBlurbFr} />
            </div>
          </div>
          <div className="admin-actions">
            <button className="admin-btn" type="submit">Save changes</button>
          </div>
        </div>
      </form>
    </>
  );
}

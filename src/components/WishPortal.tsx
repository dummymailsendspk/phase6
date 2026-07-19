import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Heart,
  Image as ImageIcon,
  Video,
  Mic,
  User,
  Sparkles,
  Check,
  Gift,
  ChevronDown,
} from 'lucide-react';
import {supabase, isSupabaseConfigured } from '../lib/supabaseClient';

interface WishPortalProps {
  onClose: () => void;
}

const relationshipOptions = [
  'Friend',
  'Best Friend',
  'Cousin',
  'College Friend',
  'School Friend',
  'Colleague',
  'Family',
  'Other',
];

const MIN_WORDS = 50;
const MAX_WORDS = 250;

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

async function uploadFile(file: File, folder: string): Promise<string | null> {
  const ext = file.name.split('.').pop();
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from('wish-media').upload(path, file);
  if (error) {
    console.error('Upload failed:', error.message);
    return null;
  }
  const { data } = supabase.storage.from('wish-media').getPublicUrl(path);
  return data.publicUrl;
}

type MediaKind = 'photo' | 'video' | 'audio' | 'profile';

const WishPortal: React.FC<WishPortalProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState(relationshipOptions[0]);
  const [message, setMessage] = useState('');
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [audioName, setAudioName] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const wordCount = countWords(message);
  const wordCountValid = wordCount >= MIN_WORDS && wordCount <= MAX_WORDS;
  const wordProgress = Math.min(100, (wordCount / MAX_WORDS) * 100);

  const handleFile = (file: File | undefined, kind: MediaKind) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (kind === 'profile') {
      setProfilePic(file);
      setProfilePreview(url);
    } else if (kind === 'photo') {
      setPhoto(file);
      setPhotoPreview(url);
    } else if (kind === 'video') {
      setVideo(file);
      setVideoPreview(url);
    } else if (kind === 'audio') {
      setAudio(file);
      setAudioName(file.name);
    }
  };

  const clearFile = (kind: MediaKind) => {
    if (kind === 'profile') {
      setProfilePic(null);
      setProfilePreview(null);
    } else if (kind === 'photo') {
      setPhoto(null);
      setPhotoPreview(null);
    } else if (kind === 'video') {
      setVideo(null);
      setVideoPreview(null);
    } else if (kind === 'audio') {
      setAudio(null);
      setAudioName(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isSupabaseConfigured) {
      setError(
        "The wish portal isn't connected to a database yet. Ask the site owner to finish the Bolt Database setup."
      );
      return;
    }

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!wordCountValid) {
      setError(
        `Your message should be between ${MIN_WORDS} and ${MAX_WORDS} words (currently ${wordCount}).`
      );
      return;
    }

    setSubmitting(true);
    try {
      const [profilePicUrl, photoUrl, videoUrl, audioUrl] = await Promise.all([
        profilePic ? uploadFile(profilePic, 'profile-pics') : Promise.resolve(null),
        photo ? uploadFile(photo, 'photos') : Promise.resolve(null),
        video ? uploadFile(video, 'videos') : Promise.resolve(null),
        audio ? uploadFile(audio, 'audio') : Promise.resolve(null),
      ]);

      const { error: insertError } = await supabase.from('wishes').insert({
        name: name.trim(),
        relationship,
        message: message.trim(),
        profile_pic_url: profilePicUrl,
        photo_url: photoUrl,
        video_url: videoUrl,
        audio_url: audioUrl,
      });

      if (insertError) throw insertError;

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Something went wrong sending your wish. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="wish-overlay" ref={overlayRef} onClick={onClose}>
      <div className="wish-aurora" />
      <div className="wish-stars">
        {[...Array(24)].map((_, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animationDelay: `${(i % 6) * 0.4}s`,
              animationDuration: `${2.5 + (i % 5) * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="wish-portal-container" onClick={(e) => e.stopPropagation()}>
        <button className="wish-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {submitted ? (
          <div className="wish-success">
            <div className="wish-success-icon">
              <Gift size={56} />
            </div>
            <h3>Wish Sealed Successfully</h3>
            <p>
              Your words have been safely placed into the birthday memory vault.
              <br />
              Thank you for being part of this moment.
            </p>
            <button className="wish-btn wish-btn-primary" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form className="wish-form" onSubmit={handleSubmit}>
            <div className="wish-header">
              <div className="wish-badge">
                <Sparkles size={14} />
               
              </div>
              <h3 className="wish-form-title">A Message for Jayapriya 💌</h3>
              <p className="wish-form-subtitle">
                Leave a memory, a photo, a voice, or a message that will become part of her
                special day.
              </p>
              <p className="wish-form-note">
                <Heart size={12} /> Your message stays private and will be revealed on her birthday.
              </p>
            </div>

            <div className="wish-grid">
              <label className="wish-field">
                <span className="wish-label">
                  <User size={14} /> Your Name
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya"
                  required
                />
              </label>

              <label className="wish-field">
                <span className="wish-label">Relationship</span>
                <div className="wish-select-wrap">
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                  >
                    {relationshipOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="wish-select-arrow" />
                </div>
              </label>
            </div>

            {/* Profile picture */}
            <div className="wish-profile-row">
              <div className="wish-profile-avatar">
                {profilePreview ? (
                  <img src={profilePreview} alt="Profile" />
                ) : (
                  <User size={28} />
                )}
              </div>
              <label className="wish-profile-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFile(e.target.files?.[0], 'profile')}
                />
                <span>{profilePic ? 'Change photo' : 'Add profile picture'}</span>
              </label>
              {profilePic && (
                <button
                  type="button"
                  className="wish-clear-chip"
                  onClick={() => clearFile('profile')}
                >
                  Remove
                </button>
              )}
            </div>

            <label className="wish-field">
              <span className="wish-label">
                Your Message
                <span className="wish-word-range">
                  {MIN_WORDS}–{MAX_WORDS} words
                </span>
              </span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                placeholder="Write your heartfelt birthday message here..."
                required
              />
              <div className="wish-word-meter">
                <div
                  className={`wish-word-bar ${wordCountValid ? 'ok' : wordCount > 0 ? 'warn' : ''}`}
                  style={{ width: `${wordProgress}%` }}
                />
                <span className={`wish-word-count ${wordCountValid ? 'ok' : ''}`}>
                  {wordCount} / {MIN_WORDS}–{MAX_WORDS}
                </span>
              </div>
            </label>

            {/* Media upload cards */}
            <div className="wish-media-grid">
              {/* Photo */}
              <div className="wish-media-card">
                <input
                  type="file"
                  accept="image/*"
                  id="wish-photo"
                  hidden
                  onChange={(e) => handleFile(e.target.files?.[0], 'photo')}
                />
                {photoPreview ? (
                  <div className="wish-media-preview">
                    <img src={photoPreview} alt="Selected" />
                    <button
                      type="button"
                      className="wish-media-remove"
                      onClick={() => clearFile('photo')}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <label htmlFor="wish-photo" className="wish-media-empty">
                    <ImageIcon size={22} />
                    <span>Add Photo</span>
                    <small>Tap to choose</small>
                  </label>
                )}
              </div>

              {/* Video */}
              <div className="wish-media-card">
                <input
                  type="file"
                  accept="video/*"
                  id="wish-video"
                  hidden
                  onChange={(e) => handleFile(e.target.files?.[0], 'video')}
                />
                {videoPreview ? (
                  <div className="wish-media-preview">
                    <video src={videoPreview} controls />
                    <button
                      type="button"
                      className="wish-media-remove"
                      onClick={() => clearFile('video')}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <label htmlFor="wish-video" className="wish-media-empty">
                    <Video size={22} />
                    <span>Add Video</span>
                    <small>Tap to choose</small>
                  </label>
                )}
              </div>

              {/* Audio */}
              <div className="wish-media-card">
                <input
                  type="file"
                  accept="audio/*"
                  id="wish-audio"
                  hidden
                  onChange={(e) => handleFile(e.target.files?.[0], 'audio')}
                />
                {audioName ? (
                  <div className="wish-media-preview wish-media-audio">
                    <Mic size={22} />
                    <span className="wish-audio-name">{audioName}</span>
                    <button
                      type="button"
                      className="wish-media-remove"
                      onClick={() => clearFile('audio')}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <label htmlFor="wish-audio" className="wish-media-empty">
                    <Mic size={22} />
                    <span>Add Voice</span>
                    <small>Tap to choose</small>
                  </label>
                )}
              </div>
            </div>

            {error && (
              <div className="wish-error">
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="wish-btn wish-submit-btn"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="wish-spinner" /> Sending...
                </>
              ) : (
                <>
                  <Check size={18} /> Seal My Wish
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default WishPortal;

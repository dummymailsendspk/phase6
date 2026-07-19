export interface Wish {
  id: string;
  name: string;
  relationship: string;
  message: string;
  profile_pic_url: string | null;
  photo_url: string | null;
  video_url: string | null;
  audio_url: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  url: string;
  prompt: string;
  code: string;
  thumbnail: string; // Could be a data URL or a link to a stored image
  createdAt: string; // ISO date string
}

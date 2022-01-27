type Guild = {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: number;
  features: string[];
};
type User = {
  _id: string;
  discordId: string;
  discordTag: string;
  avatar: string;
  email: string;
  guilds: Guild[];
};

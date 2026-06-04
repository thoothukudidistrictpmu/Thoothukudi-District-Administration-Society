export interface CSRBox {
  title: string;
  content: string;
  list?: string[];
}

export interface ServiceBox {
  title: string;
  description: string;
}

export interface BoardMember {
  role: string;
  name: string;
  title: string;
}

export interface JourneyStat {
  label: string;
  value: string;
  iconName: string;
}

export interface Contributor {
  name: string;
  description: string;
  color: string;
  iconName: string;
}

export interface SocialLink {
  name: string;
  url: string;
}

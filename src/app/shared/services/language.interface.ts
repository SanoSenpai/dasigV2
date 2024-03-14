interface SidebarData {
  home: string;
  about: string;
  link: string;
  team: string;
  faqs: string;
  contact: string;
  learnMore: string;
}

interface HomeData {
  headerTitle: string;
  headerBody: string;
  donateNow: string;
}

export interface LanguageData {
  navbar: SidebarData;
  home: HomeData;
}

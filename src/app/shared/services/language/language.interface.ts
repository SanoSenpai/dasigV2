interface SidebarData {
  brand: string;
  home: string;
  about: string;
  link: string;
  team: string;
  faqs: string;
  contact: string;
  learnMore: string;
}

interface HomeData {
  headerSection: {
    headerTitle: string;
    headerBody: string;
    donateNow: string;
    subheader: string;
  };
  aboutSection: {
    aboutTitle: string;
    about1: string;
    about2: string;
    about3: string;
    about4: string;
  };
  linkSection: {
    linkTitle: string;
    link: {
      linkTitle: string;
      linkBody: string;
      linkButton: string;
    }[];
  };
  teamSection: {
    teamTitle: string;
    teamSubtitle: string;
    team: {
      name: string;
      position: string;
    }[];
  };
  faqsSection: {
    faqsTitle: string;
    faqsSubtitle: string;
    faqs: {
      question: string;
      answer: string;
      isCollapsed: boolean;
    }[];
  };
  footerSection: {
    footerCopyright: string;
    footerPromise: string;
    privacyPolicy: string;
  };
}

export interface LanguageData {
  navbar: SidebarData;
  home: HomeData;
}

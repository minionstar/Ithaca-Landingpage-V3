export const dataNav =
  window.innerWidth > 1024
    ? [
        {
          title: "Mission",
          href: "#mission",
        },
        {
          title: "Matching Engine",
          section: 1,
        },
        {
          title: "Ithaca App",
          section: 8,
        },
        {
          title: "Architecture",
          section: 9,
        },
        {
          title: "Roadmap",
          section: 10,
        },
      ]
    : [
        {
          title: "Mission",
          href: "#mission",
        },
        {
          title: "Matching Engine",
          href: "#matching-engine",
        },
        {
          title: "Ithaca App",
          href: "#app",
        },
        {
          title: "Architecture",
          href: "#architecture-ithaca",
        },
        {
          title: "Roadmap",
          href: "#roadmap",
        },
      ]

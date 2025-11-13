import { defineStore } from "pinia";

const mockedJobAds = [
  {
    id: 0,
    title: "Automation Test Engineer",
    companyName: "Persol Career",
    salaryFrom: 0,
    salaryTo: 10,
    currencyType: "VND",
    position: "Tester",
    level: "Intern",
    location: [
      {
        id: 0,
        displayAddress: "28 Le Van Luong St, Thanh Xuan dist, Hanoi",
      },
      {
        id: 1,
        displayAddress: "89 Le Van Luong St, Thanh Xuan dist, Hanoi",
      },
    ],
    description:
      "Responsible for creating and executing automated test scripts for web applications.",
    benefit: "Transportation support, flexible working hours, free snacks.",
    requirement:
      "Basic knowledge of testing tools such as Selenium or Cypress.",
  },
  {
    id: 1,
    title: "Frontend Developer",
    companyName: "FPT Software",
    salaryFrom: 1500,
    salaryTo: 2500,
    currencyType: "USD",
    position: "Developer",
    level: "Junior",
    location: [
      {
        id: 0,
        displayAddress: "17 Duy Tan St, Cau Giay dist, Hanoi",
      },
    ],
    description:
      "Develop and maintain user interfaces for enterprise web applications using React and TypeScript.",
    benefit:
      "13th-month salary, hybrid work model, professional training courses.",
    requirement: "1+ years experience with ReactJS and RESTful APIs.",
  },
  {
    id: 2,
    title: "Backend Engineer",
    companyName: "VNG Corporation",
    salaryFrom: 2000,
    salaryTo: 3500,
    currencyType: "USD",
    position: "Developer",
    level: "Mid",
    location: [
      {
        id: 0,
        displayAddress:
          "475A Dien Bien Phu St, Binh Thanh dist, Ho Chi Minh City",
      },
    ],
    description:
      "Design and implement scalable backend services using Node.js and PostgreSQL.",
    benefit: "Free gym membership, annual company trip, performance bonus.",
    requirement:
      "Strong knowledge of Node.js, databases, and microservices architecture.",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    companyName: "Tiki",
    salaryFrom: 1200,
    salaryTo: 2000,
    currencyType: "USD",
    position: "Designer",
    level: "Mid",
    location: [
      {
        id: 0,
        displayAddress: "52 Ut Tich St, Tan Binh dist, Ho Chi Minh City",
      },
    ],
    description:
      "Create intuitive and attractive user interfaces for Tiki’s e-commerce platform.",
    benefit: "MacBook provided, health insurance, creative work environment.",
    requirement: "Proficiency in Figma or Adobe XD, strong portfolio required.",
  },
  {
    id: 4,
    title: "Data Scientist",
    companyName: "VinAI Research",
    salaryFrom: 2500,
    salaryTo: 4500,
    currencyType: "USD",
    position: "Data Scientist",
    level: "Senior",
    location: [
      {
        id: 0,
        displayAddress: "Vinhomes Times City, Hai Ba Trung dist, Hanoi",
      },
    ],
    description:
      "Develop machine learning models and analyze data to improve AI-driven solutions.",
    benefit:
      "Cutting-edge research projects, flexible schedule, stock options.",
    requirement:
      "3+ years in data science, strong skills in Python, TensorFlow, and statistical analysis.",
  },
];

export const useJobsSearchStore = defineStore("jobsSearch", () => {
  const jobsList = ref<any[]>(mockedJobAds);
  const selectedJob = ref<any>(null);
  const filterOptions = ref<any>({});
  const filter = ref<any>({});
  const isNoData = ref<any>(false);

  function setSelectedJob(job: any) {
    selectedJob.value = job;
  }

  function setFilterOptions(filter: any) {
    filterOptions.value = filter;
  }

  function setFilter(_filter: any) {
    filter.value = _filter;
    console.log("dcm sao deo call vao day????", filter.value);
  }

  return {
    jobsList,
    selectedJob,
    isNoData,
    filter,
    filterOptions,
    setSelectedJob,
    setFilterOptions,
    setFilter,
  };
});

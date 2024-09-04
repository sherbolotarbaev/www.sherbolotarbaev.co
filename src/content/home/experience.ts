interface IJob {
  name: string;
  date: string;
  role: string;
  description: string;
  url: string;
}

export const jobs: IJob[] = [
  {
    name: 'WEDEVX',
    date: '2023 - Present',
    role: 'Software Development Engineer',
    description: `
At <span>WEDEVX</span>, I have been instrumental in building and optimizing backend systems that power our tech-focused educational platform, dedicated to transforming lives by equipping individuals with the skills necessary to land high-paying jobs in tech.

<br/><br/>

<span>Key Contributions:</span>

<br/><br/>

- <span>Backend Development:</span> Engineered robust backend solutions using NestJS, Fastify, Node.js v20, and PostgreSQL, ensuring platform stability and scalability.

<br/><br/>

- <span>Service Integration:</span> Integrated essential tools like AWS Lambda and IAM, enhancing our platform’s security and functionality.

<br/><br/>

- <span>Performance Optimization:</span> Achieved a 38% performance improvement in the codebase through targeted optimizations, significantly boosting platform efficiency.

<br/><br/>

- <span>AI Integration:</span> Enhanced Soft Skills AI with advanced features like speech-to-text and image recognition, improving user experience.

<br/><br/>

- <span>Microservices Architecture:</span> Designed and implemented a scalable microservices architecture using NestJS and Kafka.js.

<br/><br/>

- <span>Lead Generation:</span> Implemented quizzes that generated over 800 leads, driving CRM enhancements and user engagement.

<br/><br/>

- <span>Cloud Infrastructure:</span> Managed and deployed cloud infrastructure using AWS and Google Cloud, ensuring application reliability and scalability.
`,
    url: 'https://www.wedevx.co/',
  },
  {
    name: 'Mancho Devs',
    date: '2021 - 2023',
    role: 'Frontend Developer',
    description: `
At <span>Mancho Devs</span>, I was responsible for developing adaptive and cross-platform websites, contributing to the growth and success of our projects.

<br/><br/>

<span>Key Contributions:</span>

<br/><br/>

- <span>Frontend Development:</span> Developed responsive and cross-platform websites using React, Next.js, Redux, SCSS, and TypeScript, ensuring a seamless user experience across devices.

<br/><br/>

- <span>Performance Optimization:</span> Led optimization strategies that significantly improved website speed and performance, enhancing overall user engagement.

<br/><br/>

- <span>Caching Techniques:</span> Utilized advanced caching strategies to enhance user experience by reducing page load times, improving site efficiency.

<br/><br/>

- <span>Code Quality:</span> Conducted thorough code reviews, maintaining high code quality standards and fostering continuous learning within the team.
`,
    url: 'https://www.mancho.dev/',
  },
];

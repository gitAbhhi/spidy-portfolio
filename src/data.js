// ✏️ Edit everything about you here. Contact values below are placeholders.
export const profile = {
  name: 'Abhishek Kumar',
  role: 'Backend Developer',
  stack: 'React  • Java • Spring Boot • Node.js',
  bio: 'I am a passionate Full Stack Developer who loves to build web applications and solve real-world problems. I enjoy learning new technologies, exploring creative ideas and turning them into useful products.',
  quote: 'Great things aren’t built in a day, they are built with consistency.',
  degree: 'B.Tech (CSE)',
  school: 'Invertis University, Bareilly',
  location: 'Noida, Uttar Pradesh',
  graduated: 'May 2026',
  percentage:78.45,
  resume: '/Abhishekresume.pdf', // put your PDF at public/resume.pdf
  email: 'abhiaditya926@gmail.com',
  phone: '+91 89797 42479',
  github: 'https://github.com/gitAbhhi',
  linkedin: 'https://www.linkedin.com/in/abhishek-kumar-7a4a41252/',
}

export const projects = [
  { title: 'PlantCorner', sub: 'Plant Marketplace', live: 'https://plant-corner-lime.vercel.app/', tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Socket.io','JWT'],
    desc: 'Users list plants for sale, explore nearby plants and connect with sellers. AI plant assistant (Gemini API).',
    features: ['Geolocation-based plant discovery', 'Real-time chat with sellers over WebSocket', 'AI plant assistant powered by Gemini'], source: 'https://github.com/gitAbhhi/Plant-Corner', demo: 'https://plant-corner-lime.vercel.app/' },
  { title: 'RentMyPhone', sub: 'Phone Rental Platform',live: false, tags: ['Java', 'Spring Boot', 'React', 'MySQL', 'JWT','Cloudinary'],
    desc: 'Rent mobile phones with JWT auth, admin dashboard and REST APIs.',
    features: ['JWT authentication and protected routes', 'Admin dashboard for inventory and rentals', 'REST API built with Express'], source: '#', demo: '#' },
  { title: 'CarePoint', sub: 'Doctor Appointment System',live:'https://doc-appointment-system-mern-stack.onrender.com/', tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Cloudinary'],
    desc: 'Book appointments with doctors, with separate doctor and admin dashboards and secure auth.',
    features: ['Role-based dashboards (patient, doctor, admin)', 'Appointment booking and management', 'Image uploads with Cloudinary'], source: 'https://github.com/gitAbhhi/Doc-appointment-system-mern-stack', demo: 'https://doc-appointment-system-mern-stack.onrender.com/' },
  { title: 'Deliciousness', sub: 'Food Ordering System',live:'https://mern-food-delivery-frontend-f08t.onrender.com/', tags: ['MERN', 'Stripe', 'Context API'],
    desc: 'Food ordering platform with secure payments and real-time order tracking.',
    features: ['Stripe checkout', 'Cart state with Context API', 'Live order status tracking'], source: 'https://github.com/gitAbhhi/food-ordering-website-mern', demo: 'https://mern-food-delivery-frontend-f08t.onrender.com/' },
]

export const skills = [
  ['Languages', ['Java', 'Python', 'C', 'JavaScript']],
  ['Frontend', ['React.js', 'Next.js', 'HTML', 'CSS', 'Tailwind']],
  ['Backend', ['Node.js', 'Express', 'Spring Boot', 'Spring Data JPA', 'MVC', 'Security', 'JWT']],
  ['Database', ['MySQL', 'MongoDB']],
  ['Tools', ['Git', 'GitHub','MS Excel','Postman', 'VS Code', 'IntelliJ', 'MySQL Workbench', 'Docker']],
]
export const learning = ['Docker', 'Kubernetes', 'AI/ML','PowerBI']

export const experience = [
  { role: 'Web Full Stack Intern', org: 'WebSeeder Technologies Pvt. Ltd.', when: 'Aug 2025 – Oct 2025' },
  { role: 'Software Engineer Trainee', org: 'Code Alpha', when: 'Oct 2024 – Nov 2024' },
]
// Taken from the mockup — edit or delete anything that isn't yours.
export const achievements = ['200+ DSA questions on LeetCode and GFG', 'HackerRank 4-Star in Java']
export const certificates = ['Python Programming for Beginners — Udemy',
  'Object-Oriented Programming using Java -Infosys Springboard.','Data Structures using Java - Infosys Springboard.'
  ,' Microsoft 365 Copilot – Prompt Writing. '
]

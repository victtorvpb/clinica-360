# Clinic 360 - Management System

A complete management system for medical clinics developed with React, TypeScript and Vite.

## 🚀 Features

- **Dashboard**: Clinic overview with statistics and quick actions
- **Patient Management**: Registration, search and editing of patients
- **Appointments**: Complete consultation scheduling system
- **Medical Team**: Management of doctors and specialties
- **Consultations**: Registration and history of consultations performed
- **Responsive Interface**: Works perfectly on desktop and mobile
- **🌍 Internationalization**: Full support for Portuguese and English with auto-detection

## 🛠️ Technologies Used

- **React 18**: Library for building the interface
- **TypeScript**: Static typing for greater security
- **Vite**: Fast and modern build tool
- **Tailwind CSS**: CSS framework for styling
- **React Router**: Navigation between pages
- **Lucide React**: Modern and beautiful icons
- **Date-fns**: Date manipulation
- **i18next**: Internationalization framework
- **react-i18next**: React integration for i18n
- **Language Detection**: Auto-detect browser language

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd clinica-360
```

2. Install dependencies:
```bash
npm install
```

3. Run the project in development mode:
```bash
npm run dev
```

4. Access in browser:
```
http://localhost:3000
```

## 🏗️ Production Build

To generate the production build:

```bash
npm run build
```

To preview the build locally:

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   └── Layout.tsx      # Main layout with navigation
├── pages/              # Application pages
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Patients.tsx    # Patient management
│   ├── Appointments.tsx # Appointment system
│   ├── Doctors.tsx     # Doctor management
│   ├── Consultations.tsx # Consultation records
│   └── Register.tsx    # Registration form
├── types/              # TypeScript type definitions
│   └── index.ts        # Main interfaces
├── App.tsx             # Main component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🎨 Design System

The project uses a consistent design system based on:

- **Primary colors**: Blue (#3b82f6) for main elements
- **Medical colors**: Green (#22c55e) for health-related elements
- **Typography**: Native system font stack
- **Spacing**: Grid based on multiples of 4px
- **Components**: Standardized cards, buttons and forms

## 📱 Responsiveness

The application is fully responsive and works well on:

- **Desktop**: Layout with expanded sidebar
- **Tablet**: Adapted layout with collapsible navigation
- **Mobile**: Hamburger menu and optimized layouts

## 🔧 Available Scripts

- `npm run dev`: Runs in development mode
- `npm run build`: Generates production build
- `npm run preview`: Previews the build locally
- `npm run lint`: Runs the linter

## 📚 Documentation

For detailed documentation, visit the **[docs/](./docs/)** folder:

- **[Deploy Guide](./docs/DEPLOY.md)** - Deploy with GitHub Actions + Vercel  
- **[Routing System](./docs/ROUTER.md)** - Advanced routing documentation
- **[Internationalization](./docs/INTERNATIONALIZATION.md)** - Complete i18n guide and setup

## 🚧 Upcoming Features

- [ ] Authentication system
- [ ] Backend API integration
- [ ] Reports and charts
- [ ] Notification system
- [ ] Data backup and export
- [ ] Electronic medical record integration

## 🤝 Contributing

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/new-functionality`)
3. Commit your changes (`git commit -m 'Add new functionality'`)
4. Push to the branch (`git push origin feature/new-functionality`)
5. Open a Pull Request

## 📄 License

This project is under the MIT license. See the `LICENSE` file for more details.




import AcademicDepartment from "../pages/admin/academicManagement/academic-department/AcademicDepartment";
import CreateAcademicDepartment from "../pages/admin/academicManagement/academic-department/CreateAcademicDepartment";
import AcademicFaculty from "../pages/admin/academicManagement/academic-faculty/AcademicFaculty";
import CreateAcademicFaculty from "../pages/admin/academicManagement/academic-faculty/CreateAcademicFaculty";
import AcademicSemester from "../pages/admin/academicManagement/academic-semester/AcademicSemester";
import CreateAcademicSemester from "../pages/admin/academicManagement/academic-semester/CreateAcademicSemester";
import AdminDashboard from "../pages/admin/AdminDashboard";
import RegisteredSemester from "../pages/admin/courseManagement/RegisteredSemester";
import SemesterRegistration from "../pages/admin/courseManagement/SemesterRegistration";
import AdminData from "../pages/admin/userManagement/admin-data/AdminData";
import AdminDetails from "../pages/admin/userManagement/admin-data/AdminDetails";
import CreateAdmin from "../pages/admin/userManagement/admin-data/CreateAdmin";
import UpdateAdmin from "../pages/admin/userManagement/admin-data/UpdateAdmin";
import CreateFaculty from "../pages/admin/userManagement/faculty-data/CreateFaculty";
import FacultyData from "../pages/admin/userManagement/faculty-data/FacultyData";
import FacultyDetails from "../pages/admin/userManagement/faculty-data/FacultyDetails";
import UpdateFaculty from "../pages/admin/userManagement/faculty-data/UpdateFaculty";
import CreateStudent from "../pages/admin/userManagement/student-data/CreateStudent";
import StudentData from "../pages/admin/userManagement/student-data/StudentData";
import StudentDetails from "../pages/admin/userManagement/student-data/StudentDetails";
import UpdateStudent from "../pages/admin/userManagement/student-data/UpdateStudent";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Create A. Semester",
        path: "create-academic-semester",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },
      {
        name: "Create A. Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Create A. Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "Students",
        path: "students-data",
        element: <StudentData />,
      },
      {
        path: "students-data/:studentId",
        element: <StudentDetails />,
      },
      {
        path: "students-data/:studentId/update",
        element: <UpdateStudent />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Faculties",
        path: "faculties-data",
        element: <FacultyData />,
      },
      {
        path: "faculties-data/:facultyId",
        element: <FacultyDetails />,
      },
      {
        path: "faculties-data/:facultyId/update",
        element: <UpdateFaculty />,
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Admins",
        path: "admins-data",
        element: <AdminData />,
      },
      {
        path: "admins-data/:adminId",
        element: <AdminDetails />,
      },
      {
        path: "admins-data/:adminId/update",
        element: <UpdateAdmin />,
      },
    ],
  },
  {
    name: "Course Management",
    children: [
      {
        name: "Semester Registration",
        path: "semester-registration",
        element: <SemesterRegistration />,
      },
      {
        name: "Registered Semester",
        path: "registered-semester",
        element: <RegisteredSemester />,
      },
    ],
  },
];

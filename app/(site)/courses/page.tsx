import { getAllCourse } from "@/src/services/course";
import CoursesPageClient from "./modules/Coursespageclient";

 
export default async function Page() {
  const courses = (await getAllCourse()) ?? [];
 
  return <CoursesPageClient courses={courses} />;
}
 
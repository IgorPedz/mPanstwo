import { useParams } from "react-router-dom";

import CourseMapHeader from "../../components/Courses/SubPages/CourseMap/CourseMapHeader";
import CourseMapContainer from "../../components/Courses/SubPages/CourseMap/CourseMapContainer";

import useCourseMap from "../../hooks/useCourseMap";

export default function CourseMapPage() {
  const { id } = useParams();

  const { course, loading, error } = useCourseMap(id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-slate-500 dark:text-slate-400">
          Generowanie ścieżki kursu...
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Nie udało się pobrać kursu</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        <CourseMapHeader course={course} />

        <CourseMapContainer course={course} />
      </div>
    </div>
  );
}

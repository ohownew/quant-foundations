import { CourseShell } from "@/components/CourseShell";

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return <CourseShell>{children}</CourseShell>;
}

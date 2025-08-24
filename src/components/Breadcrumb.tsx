import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <section className="py-4 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="neu-flat p-4 rounded-lg">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            {items.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                {item.href ? (
                  <Link 
                    href={item.href} 
                    className="hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">{item.label}</span>
                )}
                {index < items.length - 1 && (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

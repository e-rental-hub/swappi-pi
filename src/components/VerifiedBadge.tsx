
import { CheckCircle } from "lucide-react";

export function VerifiedBadge() {
  return (
    <span className="verified-badge ml-1">
      <CheckCircle size={14} className="fill-pi text-background" />
    </span>
  );
}

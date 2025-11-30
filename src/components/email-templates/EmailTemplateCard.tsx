"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, ArrowRight } from "lucide-react";
import type { EmailTemplate } from "@/lib/email-templates";

interface EmailTemplateCardProps {
  template: EmailTemplate;
  onClick?: () => void;
}

export function EmailTemplateCard({
  template,
  onClick,
}: EmailTemplateCardProps) {
  return (
    <Card
      className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-4 w-4 text-blue-600" />
            <h3 className="font-semibold text-gray-900">{template.name}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">{template.description}</p>
          <div className="flex flex-wrap gap-1">
            {template.variables.slice(0, 3).map((variable) => (
              <Badge
                key={variable}
                variant="outline"
                className="text-xs"
              >
                {variable.replace(/_/g, " ")}
              </Badge>
            ))}
            {template.variables.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{template.variables.length - 3} more
              </Badge>
            )}
          </div>
        </div>
        <ArrowRight className="h-5 w-5 text-gray-400 ml-2" />
      </div>
    </Card>
  );
}

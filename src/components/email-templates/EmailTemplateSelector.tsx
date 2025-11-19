"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Send,
  Copy,
  Edit,
  Eye,
  X,
  CheckCircle2,
} from "lucide-react";
import {
  emailTemplates,
  type EmailTemplateType,
  type EmailTemplate,
  replaceVariables,
} from "@/lib/email-templates";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface EmailTemplateSelectorProps {
  onSend?: (template: EmailTemplate, subject: string, body: string) => void;
  defaultRecipient?: string;
}

export function EmailTemplateSelector({
  onSend,
  defaultRecipient = "",
}: EmailTemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] =
    useState<EmailTemplateType | null>(null);
  const [recipient, setRecipient] = useState(defaultRecipient);
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [previewMode, setPreviewMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const template = selectedTemplate
    ? emailTemplates[selectedTemplate]
    : null;

  const handleTemplateSelect = (type: EmailTemplateType) => {
    setSelectedTemplate(type);
    setPreviewMode(false);
    // Initialize default variables
    const defaultVars: Record<string, string> = {
      tenant_name: "",
      property_address: "",
      landlord_name: "Kamp Property Management",
      company_name: "Kamp Property",
      contact_email: "support@kamp.com",
      contact_phone: "(555) 123-4567",
    };
    setVariables(defaultVars);
  };

  const handleVariableChange = (key: string, value: string) => {
    setVariables((prev) => ({ ...prev, [key]: value }));
  };

  const handleSend = () => {
    if (!template || !recipient) return;

    const { subject, body } = replaceVariables(template, variables);
    onSend?.(template, subject, body);
    setDialogOpen(false);
    // Reset form
    setSelectedTemplate(null);
    setRecipient("");
    setVariables({});
  };

  const handleCopy = () => {
    if (!template) return;

    const { subject, body } = replaceVariables(template, variables);
    const fullEmail = `Subject: ${subject}\n\n${body}`;
    navigator.clipboard.writeText(fullEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const preview = template
    ? replaceVariables(template, variables)
    : { subject: "", body: "" };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <Mail className="mr-2 h-4 w-4" />
          Send Email Template
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Email Template</DialogTitle>
          <DialogDescription>
            Select a template and fill in the details to send an email
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Template Selection */}
          <div>
            <Label>Select Template</Label>
            <Select
              value={selectedTemplate || ""}
              onValueChange={(value) =>
                handleTemplateSelect(value as EmailTemplateType)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose an email template..." />
              </SelectTrigger>
              <SelectContent>
                {Object.values(emailTemplates).map((tpl) => (
                  <SelectItem key={tpl.id} value={tpl.id}>
                    <div className="flex flex-col">
                      <span>{tpl.name}</span>
                      <span className="text-xs text-gray-500">
                        {tpl.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {template && (
            <>
              {/* Recipient */}
              <div>
                <Label htmlFor="recipient">Recipient Email</Label>
                <Input
                  id="recipient"
                  type="email"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="tenant@example.com"
                  className="mt-1"
                />
              </div>

              {/* Template Variables */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Template Variables</Label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewMode(!previewMode)}
                    >
                      {previewMode ? (
                        <>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </>
                      ) : (
                        <>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                      {copied ? (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {previewMode ? (
                  <Card className="p-4 space-y-3">
                    <div>
                      <Label className="text-xs text-gray-500">Subject</Label>
                      <p className="mt-1 font-semibold">{preview.subject}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Body</Label>
                      <div className="mt-1 whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded border">
                        {preview.body}
                      </div>
                    </div>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto p-2 border rounded">
                    {template.variables.map((variable) => (
                      <div key={variable}>
                        <Label
                          htmlFor={variable}
                          className="text-xs capitalize"
                        >
                          {variable.replace(/_/g, " ")}
                        </Label>
                        <Input
                          id={variable}
                          value={variables[variable] || ""}
                          onChange={(e) =>
                            handleVariableChange(variable, e.target.value)
                          }
                          placeholder={`Enter ${variable.replace(/_/g, " ")}`}
                          className="mt-1 text-sm"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button
                  onClick={handleSend}
                  disabled={!recipient}
                  className="flex-1"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

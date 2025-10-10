export type TTemplatePlaceholder = {
  id: number;
  isActive: boolean;
  isDeleted: boolean;
  createdBy: string;
  createdAt: number;
  code: string;
  label: string;
};

export function wrapTemplateVariables(input: string, variables: TTemplatePlaceholder[]): string {
  let result = input;
  for (const { code, label } of variables) {
    const escapedCode = code.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(escapedCode, 'g');
    result = result.replace(regex, `<span class="chip">${label}</span>`);
  }
  return result;
}

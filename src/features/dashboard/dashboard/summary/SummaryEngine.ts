export function generatePlanSummary(folders: any[], parentId: string | null = null, depth: number = 0): string {
  const currentFolders = folders.filter(f => f.parentId === parentId);
  let summary = "";

  currentFolders.forEach(folder => {
    const indent = "  ".repeat(depth);
    summary += `${indent}📍 ${folder.name.toUpperCase()}\n`;
    if (folder.description) {
      summary += `${indent}   📝 ${folder.description}\n`;
    }
    
    summary += generatePlanSummary(folders, folder.id, depth + 1);
  });

  return summary;
}
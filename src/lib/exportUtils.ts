export const exportUtils = {
  downloadAsFile: (content: string, filename: string) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element); 
    element.click();
    document.body.removeChild(element);
  },

  shareContent: async (title: string, text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: window.location.href });
      } catch (err) {
        console.log("Share cancelled or failed");
      }
    } else {
      await navigator.clipboard.writeText(`${title}\n\n${text}`);
      alert("Roadmap copied to clipboard!"); 
    }
  }
};
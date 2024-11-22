import { v4 as uuidv4 } from "uuid";
import html2canvas from "html2canvas"

export const INITIAL_THEME_COLOR="#22C55E"

export const generateDocUUID = (): string => {
  const uuid = uuidv4().replace(/-/g, "");
  return `doc-${uuid.substring(0, 16)}`;
};

export const generateThumbnail = async () => {
  const resumeElement = document.getElementById("resume-preview-id") as HTMLElement

  if(!resumeElement) {
    console.error("Resume element not found");
    return;
  }

  try {
    const canvas = await html2canvas(resumeElement, { scale: 0.} )
    const thumbnailImage = canvas.toDataURL("image/png")
    return thumbnailImage
  } catch (error) {
    console.error("Error generating thumbnail:", error)
  }
}
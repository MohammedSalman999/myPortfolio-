import fs from "fs";
import path from "path";

export const loader = async () => {
  const filePath = path.resolve("public/Mohammed Salman Resume.pdf");
  const fileStream = fs.createReadStream(filePath);

  return new Response(fileStream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="Mohammed Salman Resume.pdf"',
    },
  });
};
